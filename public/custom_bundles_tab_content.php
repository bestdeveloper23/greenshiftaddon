<?php
global $product, $post;

//wc_set_loop_prop( 'columns', 3 );

$bundles = get_post_meta( $post->ID, '_custom_bundle_ids', true );

$main_product_id = $product->get_id();

$meta_query = WC()->query->get_meta_query();
$bundles = array_diff($bundles, array($post->ID));


$args = array(
	'post_type' 			=> 'product',
	'ignore_sticky_posts' 	=> 1,
	'no_found_rows' 		=> 1,
	'posts_per_page' 		=> -1,
	'orderby' 				=> 'post__in',
	'post__in' 				=> $bundles,
	'meta_query' 			=> $meta_query
);

unset( $args['meta_query'] );

$products = new WP_Query( $args );
$add_to_cart_checkbox = '';
$total_price = 0;
$count = 0;
$child_total_price = 0;
if ( $products->have_posts() ) : ?>
	<div class="bundles">
		<?php 
		$title = WC_Admin_Settings::get_option('rhwct_bundle_title');
		if(!$title) $title = esc_html__('Bundles', 'greenshiftwoo');
		echo '<div class="rh-woo-section-title"><h2 class="rh-heading-icon">'.esc_attr($title).'</span></h2></div>';?>
		<div class="custom-wc-message">
			<?php // AJAX output var woo_bundles ?>
		</div>
		<div class="bundles-row">
			<div class="bundles-column-left">
			
				<div class="col_wrap_three columns-3 products rh-flex-eq-height mt0 greenshift-woo-pro">
				
				<?php include RHWCT_DIRPATH .'/public/partials/custom-bundle-product.php'; ?>
				<?php
					$count++;
					$price_html = '';
					$display_price = wc_get_price_to_display( $product );
                    $bundle_discount_percentage = get_post_meta( $main_product_id, '_bundle_discount', true );
					$discount_price = $display_price - ( $display_price * ( $bundle_discount_percentage / 100 ) );
					
					if ( $price_html = $product->get_price_html() ) {
						$price_html = '<span class="bundle-price"><del>' . wc_price( $display_price ) . $product->get_price_suffix() . '</del><ins>' . wc_price( $discount_price ) . $product->get_price_suffix() . '</ins></span>';
					}

					$total_price += $display_price;
					
					$add_to_cart_checkbox = '<div class="checkbox bundle-checkbox"><label><input checked disabled type="checkbox" class="product-check" data-discount="'. $bundle_discount_percentage .'" data-price="'. $discount_price .'" data-product-id="'. $product->get_id() .'" data-product-type="'. $product->get_type() .'" /> <strong>'. esc_html__( 'This product: ', 'greenshiftwoo' ) .'</strong><span class="product-title">'. get_the_title() .'</span> - '. $price_html .'</label></div>';
				?>
				<?php //wc_set_loop_prop( 'loop', 1 ); ?>
				
				<?php while ( $products->have_posts() ) : $products->the_post(); ?>
					<?php global $product, $post; ?>
					<?php include RHWCT_DIRPATH .'/public/partials/custom-bundle-product.php'; ?>
					<?php 
						$price_html = '';
						if ( $product->get_type() == 'grouped' ) {
							$children = $product->get_children(); // Get child product IDs
							foreach ( $children as $child_id ) {
								$child_product = wc_get_product( $child_id );
								$child_display_price = $child_product->get_price();
								$child_total_price += $child_display_price; // Add child product price to total price
								$display_price = $child_total_price;
							}
						}
						else{
							$display_price = wc_get_price_to_display( $product );
						}
						$discount_price = $display_price - ( $display_price * ($bundle_discount_percentage / 100 ) );
						
						if ( $price_html = $product->get_price_html() ) {
							$price_html = '<span class="bundle-price"><del>' . wc_price( $display_price ) . $product->get_price_suffix() .  '</del><ins>' . wc_price( $discount_price ) . $product->get_price_suffix() . '</ins></span>';
						}
						
						$total_price += $display_price;
						$prefix = '';
						
						if( $display_price != 0 || $display_price != '' ){
							$count++;
							$add_to_cart_checkbox .= '<div class="checkbox bundle-checkbox"><label><input checked disabled type="checkbox" 
							class="product-check" data-sub-product="yes" data-discount="'. $bundle_discount_percentage .'" data-price="'. $discount_price .'" 
							data-product-id="'. $product->get_id() .'" data-product-type="'. $product->get_type() .'" /> <span 
							class="product-title">'. $prefix . get_the_title() .'</span> - ' . $price_html . '</label></div>';
						}
					?>
				<?php endwhile; ?>
				
				</div>
				
				<div class="check-products mb25">
					<?php echo $add_to_cart_checkbox; ?>
				</div>
			</div>
		
			<div class="bundles-column-right">
				<div class="total-price">
					<?php
						$total_price_html = '<span class="total-price-html blockstyle font120 redbrightcolor">' . wc_price( $total_price ) . $product->get_price_suffix() . '</span>';
						$total_products_html = '<span class="total-products font90">' . $count . '</span>';
						$total_price = sprintf( __( '%s for %s item(s)', 'greenshiftwoo' ), $total_price_html, $total_products_html );
						echo wp_kses_post( $total_price );
					?>
				</div>
				<div class="bundles-add-all-to-cart">
					<button type="button" class="button add-all-to-cart"><?php echo esc_html__( 'Add '. $title .' to cart', 'greenshiftwoo' ); ?></button>
				</div>
				<strong class="font120 redbrightcolor">Save <?php echo $bundle_discount_percentage . ' % with this ' . $title ?></strong>
			</div>
			<?php
				// wp_enqueue_style( 'greenshift_woocommerce_bundle' );
				// wp_enqueue_script( ' greenshift_woocommerce_bundle' );
				// wp_localize_script( ' greenshift_woocommerce_bundle', 'woo_bundles', array(
				// 	'ajax_url' 		=> admin_url( 'admin-ajax.php' ),
				// 	'loader_icon' 	=> get_template_directory_uri() . '/images/ajax-loader.gif',
				// 	'success' 		=> sprintf( '<div class="woocommerce-message">%s <a class="button wc-forward" href="%s">%s</a></div>', esc_html__( 'Products was successfully added to your cart.', 'greenshiftwoo' ), wc_get_cart_url(), esc_html__( 'View Cart', 'greenshiftwoo' ) ),
				// 	'empty' 		=> sprintf( '<div class="woocommerce-error">%s</div>', esc_html__( 'No Products selected.', 'greenshiftwoo' ) ),
				// 	'no_variation'	=> sprintf( '<div class="woocommerce-error">%s</div>', esc_html__( 'Product Variation does not selected.', 'greenshiftwoo' ) ),
				// 	'not_available'	=> sprintf( '<div class="woocommerce-error">%s</div>', esc_html__( 'Sorry, this product is unavailable.', 'greenshiftwoo' ) ),
				// ));
			?>
		</div>
	</div>
<?php endif;
wp_reset_postdata();