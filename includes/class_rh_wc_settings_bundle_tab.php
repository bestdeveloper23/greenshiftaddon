<?php
/**
 * Adds Greenshift Bundle settings tab
 */
 
if ( !defined( 'WPINC' ) ) die;

class RH_WC_Settings_Bundle_Tab_Tools {

    /**
     * Bootstraps the class and hooks required actions & filters.
     */
    public function init() {
        add_filter( 'woocommerce_settings_tabs_array', __CLASS__ . '::add_settings_tab', 50 );
        add_action( 'woocommerce_settings_tabs_bundles', __CLASS__ . '::settings_tab' );
        add_action( 'woocommerce_update_options_bundles', __CLASS__ . '::update_settings' );
    }

    /**
     * Add a new settings tab to the WooCommerce settings tabs array.
     */
    public static function add_settings_tab( $settings_tabs ) {
        $settings_tabs['bundles'] = __( 'Greenshift Bundles', 'greenshiftwoo' );
        return $settings_tabs;
    }

    /**
     * Uses the WooCommerce admin fields API to output settings via the @see woocommerce_admin_fields() function.
     */
    public static function settings_tab() {
        woocommerce_admin_fields( self::get_settings() );
    }

    /**
     * Uses the WooCommerce options API to save settings via the @see woocommerce_update_options() function.
     */
    public static function update_settings() {
        woocommerce_update_options( self::get_settings() );
    }

    /**
     * Get all the settings for this plugin for @see woocommerce_admin_fields() function.
     */
    public static function get_settings() {

		$settings = array();
		
		//Product Bundles settings
		$settings[] = array(
			'title' => __( 'Product Bundles', 'greenshiftwoo' ),
			'type' => 'title',
			'id' => 'rhwct_options',
		);
		$settings[] = array(
			'title' => __( 'Enable Bundles', 'greenshiftwoo' ),
			'id' => 'rhwct_show_bundles',
			'desc'     => __( 'The option enables Bundles tab on Product page', 'greenshiftwoo' ),
			'default' => 'no',
			'type' => 'checkbox',
		);
		$settings[] = array(
			'title' => __( 'Order of the bundle tab', 'greenshiftwoo' ),
			'id' => 'rhwct_tab_product_order_bundle',
			'type' => 'number',
			'placeholder' => __( '10', 'greenshiftwoo' ),
		);
		$settings[] = array(
			'title' => __( 'Title of bundle Tab', 'greenshiftwoo' ),
			'desc' => __( 'Place title here', 'greenshiftwoo' ),
			'id' => 'rhwct_bundle_title',
			'default' => 'Bundles',
			'type' => 'text',
		);
		$settings[] = array(
			'type' => 'sectionend',
			'id' => 'rhwct_tools',
		);
		
        return apply_filters( 'wc_settings_bundles', $settings );
    }
}