/* 
 * RH WooCommerce Tools plugin
 * @package REHub/WooCommerce bundles styles
 */
 
jQuery(document).ready(function($) {
	/**
	 * Check if a node is blocked for processing.
	 *
	 * @param {JQuery Object} $node
	 * @return {bool} True if the DOM Element is UI Blocked, false if not.
	 */
	var is_blocked = function( $node ) {
		return $node.is( '.processing' ) || $node.parents( '.processing' ).length;
	};
	/**
	 * Block a node visually for processing.
	 *
	 * @param {JQuery Object} $node
	 */
	var block = function( $node ) {
		if ( ! is_blocked( $node ) ) {
			$node.addClass( 'processing' ).block( {
				message: null,
				overlayCSS: {
					background: '#fff url('+ woo_bundles.loader_icon +') no-repeat center',
					opacity: 0.6
				}
			} );
		}
	};
	/**
	 * Unblock a node after processing is complete.
	 *
	 * @param {JQuery Object} $node
	 */
	var unblock = function( $node ) {
		$node.removeClass( 'processing' ).unblock();
	};
	
	function bundle_checked_count(){
		var product_count = 0;
		$('.bundle-checkbox .product-check').each(function() {
			if( $(this).is(':checked') ) {
				if( $(this).attr( 'data-price' ) !== '' ) {
					product_count++;
				}
			}
		});
		return product_count;
	}
	
	var bundle_checked_total_price = function (){
		var total_price = 0;
        var total_amount = 0;
		$('.bundle-checkbox .product-check').each(function() {
			if( $(this).is(':checked') ) {
				if( $(this).attr( 'data-price' ) !== '' ) {
					total_price += parseFloat( $(this).attr( 'data-price' ) );
				}
			}
		});
		return total_price;
	};
	
	function bundle_checked_product_ids(){
		var product_ids = [];
		$('.bundle-checkbox .product-check').each(function() {
			if( $(this).is(':checked') ) {
				product_ids.push( $(this).attr( 'data-product-id' ) );
			}
		});
		return product_ids;
	}
	
	function bundle_unchecked_product_ids(){
		var product_ids = [];
		$('.bundle-checkbox .product-check').each(function() {
			if( ! $(this).is(':checked') ) {
				product_ids.push( $(this).attr( 'data-product-id' ) );
			}
		});
		return product_ids;
	}
	
	function bundle_checked_variable_product_ids(){
		var variable_product_ids = [];
		$('.bundle-checkbox .product-check').each(function() {
			if( $(this).is(':checked') && ($(this).attr( 'data-product-type' ) == 'variable' || $(this).attr( 'data-product-type' ) == 'grouped') ) {
				variable_product_ids.push( $(this).attr( 'data-product-id' ) );
			}
		});
		return variable_product_ids;
	}
	
	function bundle_is_variation_selected(){
		if( $(".single_add_to_cart_button").is(":disabled") ||
		$('.test select[name^="attribute_pa"]').val()  == '') {
			return false;
		}
		return true;
	}
	
	function bundle_is_variation_available(){
		if( $(".single_add_to_cart_button").length === 0 || $(".single_add_to_cart_button").hasClass("disabled") || $(".single_add_to_cart_button").hasClass("wc-variation-is-unavailable") ||
		$('.test select[name^="attribute_pa"]').val()  == '' ) {
			return false;
		}
		return true;
	}
	
	function bundle_is_product_available(){
		if( $(".single_add_to_cart_button").length === 0 || $(".single_add_to_cart_button").hasClass("disabled") ||
		$('.test select[name^="attribute_pa"]').val()  == '' ) {
			return false;
		}
		return true;
	}
	
	function bundle_refresh_fragments( response ){
		var this_page = window.location.toString();
		var fragments = response.fragments;
		var cart_hash = response.cart_hash;

		if ( fragments ) {
			$.each( fragments, function( key ) {
				$( key ).addClass( 'updating' );
			});
		}

		if ( fragments ) {
			$.each( fragments, function( key, value ) {
				$( key ).replaceWith( value );
			});
		}

		$( '.shop_table.cart' ).load( this_page + ' .shop_table.cart:eq(0) > *', function() {
			$( '.shop_table.cart' ).stop( true ).css( 'opacity', '1' ).unblock();
			$( document.body ).trigger( 'cart_page_refreshed' );
		});
		$( '.cart_totals' ).load( this_page + ' .cart_totals:eq(0) > *', function() {
			$( '.cart_totals' ).stop( true ).css( 'opacity', '1' ).unblock();
		});
	}
	
	$( 'body' ).on( 'found_variation', function( event, variation ) {	
		$('.bundle-checkbox .product-check').each(function() {
			if( $(this).attr( 'data-product-type' ) == 'variable' || $(this).attr( 'data-product-type' ) == 'grouped' ) {
				
				if( $(this).attr('data-product-id') === event.target.dataset.product_id ) {
					$(this).attr( 'data-price', variation.display_price );
					$(this).attr( 'data-variable-id', variation.variation_id );
					$(this).siblings( 'span.bundle-price' ).html( $(variation.price_html).html() );
				}
			}
		});
	});
	
	$( 'body' ).on( 'found_variation', function( event ) {
		block( $( 'div.bundles' ) );
		var total_price = bundle_checked_total_price();
		$.ajax({
			type: 'POST',
			url: woo_bundles.ajax_url,
			data: { 'action': 'bundle_checked_custom_price',
					 'price': total_price,
					},
			success: function(response) {
				$('span.total-price-html .amount').html(response);
				$('span.total-products').html(bundle_checked_count());
			},
			error: function(jqXHR, textStatus, errorThrown) {
				unblock( $( 'div.bundles' ) );
					console.log("AJAX Error:", textStatus, errorThrown);
					console.log("jqXHR:", jqXHR);
			},
			complete: function() {
				unblock($('div.bundles'));
			}
		});
	}).trigger( 'found_variation' );
	
	// New added for sync dropdown orginal product
	$('.test select[name^="attribute_pa"]').each(function(i) {
		$(this).change(function(){
			var selectedCountry = $(this).children("option:selected").val();
			$('.summary .variations select[name^="attribute_pa"]').eq( i ).val(selectedCountry).trigger('change');
		});
	});
	
	$( '.bundle-checkbox .product-check' ).on( "click", function() {
		block( $( 'div.bundles' ) );
		var total_price = bundle_checked_total_price();
        console.log(total_price);
		$.ajax({
			type: "POST",
			async: false,
			url: woo_bundles.ajax_url,
			data: { 'action': "bundle_checked_custom_price", 'price': total_price  },
			success : function( response ) {
				$( 'span.total-price-html .amount' ).html( response );
				$( 'span.total-products' ).html( bundle_checked_count() );
				var unchecked_product_ids = bundle_unchecked_product_ids();
				$( '.bundles .products .product' ).each(function() {
				$(this).removeClass('rh-expired-class');
					for (var i = 0; i < unchecked_product_ids.length; i++ ) {
						if( $(this).hasClass( 'post-'+unchecked_product_ids[i] ) ) {
							$(this).addClass('rh-expired-class');
						}
					}
				});
			},
			complete: function() {
				unblock( $( 'div.bundles' ) );
			}
		})
	});
	
	$('.bundles-add-all-to-cart .add-all-to-cart').click(function() {
		var bundles_all_product_ids = bundle_checked_product_ids();
		console.log(bundles_all_product_ids);
		var bundles_variable_product_ids = bundle_checked_variable_product_ids();
		if( bundles_all_product_ids.length === 0 ) {
			var bundles_alert_msg = woo_bundles.empty;
		} else if( bundles_variable_product_ids.length > 0 && bundle_is_variation_selected() === false ) {
			var bundles_alert_msg = woo_bundles.no_variation;
		} else if( bundles_variable_product_ids.length > 0 && bundle_is_variation_available() === false ) {
			var bundles_alert_msg = woo_bundles.not_available;
		} else if( bundles_variable_product_ids.length === 0 && bundle_is_product_available() === false ) {
			var bundles_alert_msg = woo_bundles.not_available;
		} else {
			for (var i = 0; i < bundles_all_product_ids.length; i++ ) {
				var variation_id  = $('input[data-product-id="'+ bundles_all_product_ids[i] +'"]').attr("data-variable-id");
				var customPrice = $('input[data-product-id="'+ bundles_all_product_ids[i] +'"]').attr("data-price");
				var subProduct = $('input[data-product-id="'+ bundles_all_product_ids[i] +'"]').attr("data-sub-product");
				var customDiscount = $('input[data-product-id="'+ bundles_all_product_ids[i] +'"]').attr("data-discount");
				var variation = {};
				$.ajax({
					type: "POST",
					async: false,
					url: woo_bundles.ajax_url,
					data: { 
						'action': "custom_bundles_add_to_cart", 
						'product_id': bundles_all_product_ids[i], 
						'variation_id': variation_id, 
						'variation': variation, 
						'custom_price': customPrice, 
						'sub_product': subProduct,
						'custom_discount': customDiscount,
						'bundle_product_ids' : bundles_all_product_ids
					},
					success : function( response ) {
						bundle_refresh_fragments( response );
					}
				});
			}
			var bundles_alert_msg = woo_bundles.success;
		}
		$( '.custom-wc-message' ).html(bundles_alert_msg);
	});
});

