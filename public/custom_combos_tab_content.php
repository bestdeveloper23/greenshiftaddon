<?php
	global $product, $post;

	//wc_set_loop_prop( 'columns', 3 );


	$combos_data = get_post_meta( $post->ID, '_combo_data', true);

	
	$main_product_id = $product->get_id();
	?>
	<?php 
		$title = WC_Admin_Settings::get_option('rhwct_combo_title');
		if(!$title) $title = esc_html__('Combos', 'greenshiftwoo');
		echo '<div class="rh-woo-section-title"><h2 class="rh-heading-icon">'.esc_attr($title).'</span></h2></div>';?>
	<div class="custom-wc-message">
	<?php // AJAX output var woo_combos ?>
	</div>
	<div class="cross-sell-list-section ga-product">
	 <?php
	 foreach ($combos_data as $combo) {
		if ($combo['productId'] !== "") {

			$main_product = wc_get_product($main_product_id);
			$combo_product = wc_get_product($combo['productId']);
			$combo_product_title = $combo_product->get_title();
			$main_product_title = $main_product->get_title();
			$url = get_permalink( $combo['productId'] );
			$main_url = get_permalink( $main_product_id );
			$thumbnail_id = get_post_thumbnail_id($main_product_id);
			if ($thumbnail_id) {
				// If a featured image exists, retrieve and display it
				$main_image = wp_get_attachment_image($thumbnail_id, array(96, 96)); // Replace 96 with your desired height and width
			} else {
				// If no featured image exists, display the WooCommerce dummy image
				$main_image = '<img src="' . wc_placeholder_img_src('woocommerce_thumbnail') . '" alt="' . esc_attr(get_the_title($main_product_id)) . '" width="96" height="96" />';
			}
			$combo_thumbnail_id = get_post_thumbnail_id( $combo['productId']);
			if ($combo_thumbnail_id) {
				// If a featured image exists, retrieve and display it
				$combo_image = wp_get_attachment_image($combo_thumbnail_id, array(96, 96)); // Replace 96 with your desired height and width
			} else {
				// If no featured image exists, display the WooCommerce dummy image
				$combo_image = '<img src="' . wc_placeholder_img_src('woocommerce_thumbnail') . '" alt="' . esc_attr(get_the_title($main_product_id)) . '" width="96" height="96" />';
			}
			$combo_product_price= $combo_product->get_price();
			$main_product_price= $main_product->get_price();
			$combo_discount = $combo['discount'];
			$combo_discount_amount = $combo_product_price * ( $combo_discount / 100 ) ;
			$combo_discounted_amount = $combo_product_price - $combo_discount_amount;
			$total_amount = $main_product_price + $combo_discounted_amount;
			?>
			<div class="greenshift_woo_row">
				<div class="greenshift_woo_col-xs-24">
					<div class="combo-title-box">
						<span class="combo-title-box-text"><?php echo $title; ?> offer: <span class="combo-title-box-price">Save <?php echo wc_price($combo_discount_amount)?></span></span>
					</div>
				</div>
				<div class="greenshift_woo_col-xs-24">
					<div class="cross-sell-list">
						<div class="greenshift_woo_row">
							<div class="combo-offer-image-container">
								<div class="combo-offer-images">
									<div class="combo-offer-image">
										<a href="<?php echo $main_url ?>" class="product-image-link">
										<?php echo $main_image; ?>
										</a>
									</div>
									<span class="text-center icon-plus-wrapper">
										<i class="icon-plus"> + </i>
									</span>
									<div class="combo-offer-image">
										<a href="<?php echo $url ?>" class="product-image-link">
										<?php echo $combo_image; ?>
										</a>
									</div>
								</div>
							</div>                       
							<div class="greenshift_woo_col-xs-24">
								<div>
									<strong><?php echo $title ; ?> With:</strong>
								</div>
								<div class="title">
									<a class="product-link" href="<?php echo $url ?>">
										<?php echo $combo_product_title;?>
									</a>
								</div>
							</div>
							<div class="greenshift_woo_col-xs-24 text-center">
								<div class="discount-price-text">Only <strong class="price"><?php echo wc_price($total_amount)?></strong></div>
							</div>
						</div>
						<div class="greenshift_woo_row">
							<div class="greenshift_woo_col-xs-24">
								<div class="add-both-to-cart-button">
									<div id="form-add-both-to-cart">
										<button id="btn-add-both-to-cart" class="btn btn-primary btn-block combo-btn-add-to-cart" name="buy2"
										data-main-product-id="<?php echo $main_product_id; ?>"
										data-combo-product-id="<?php echo $combo['productId']; ?>"
										data-main-product-price="<?php echo $main_product_price; ?>"
										data-combo-discount="<?php echo $combo_discounted_amount; ?>"
										data-discount="<?php echo $combo_discount; ?>">
											Add <?php echo $title; ?> to cart
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		<?php
		}
	}
	?>
</div>

