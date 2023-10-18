jQuery(document).ready(function($) {
    function combo_refresh_fragments( response ){
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

    $('.combo-btn-add-to-cart').click(function(e) {
        e.preventDefault();

        var mainProductId = $(this).data('main-product-id');
        var comboProductId = $(this).data('combo-product-id');
        var mainProductPrice =$(this).data('main-product-price');
        var comboDiscount = $(this).data('combo-discount');
        var Discount = $(this).data('discount');


        $.ajax({
			type: "POST",
			async: false,
			url: woo_bundles.ajax_url,
			data: { 
				
				action: 'add_to_cart',
                main_product_id: mainProductId,
                combo_product_id: comboProductId,
				combo_discount: comboDiscount,
				discount: Discount
			},
			success: function(response) {
                combo_refresh_fragments( response );
                var combos_alert_msg = woo_bundles.success;
                $( '.custom-wc-message' ).html(combos_alert_msg);
            }
        });
    });
});
