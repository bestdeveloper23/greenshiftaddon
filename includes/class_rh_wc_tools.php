<?php

if ( !defined( 'WPINC' ) ) die;

class RH_WC_Tools {
	
	function __construct(){
		$this->includes();
		//$this->init_hooks();
	}
	
		/* Include required core files */
	public function includes(){
		require RHWCT_DIRPATH .'includes/class_rh_wc_settings_bundle_tab.php';
		$rh_wc_settings = new RH_WC_Settings_Bundle_Tab_Tools();
		$rh_wc_settings->init();

		require RHWCT_DIRPATH .'includes/class_rh_wc_settings_combo_tab.php';
		$rh_wc_combo_settings = new RH_WC_Settings_Combo_Tab_Tools();
		$rh_wc_combo_settings->init();
		
		if(get_option('rhwct_show_bundles') === 'yes'){
			require RHWCT_DIRPATH .'includes/class_rh_wc_bundle.php';
			new RH_WC_Custom_Bundles();
		}
		if(get_option('rhwct_show_combos') === 'yes'){
			require RHWCT_DIRPATH .'includes/class_rh_wc_combo.php';
			new RH_WC_Custom_Combos();
		}

		// if(WC_Admin_Settings::get_option('rhwct_show_combos') === 'yes'){
		// 	require RHWCT_DIRPATH .'includes/class_rh_wc_combo.php';
		// 	new RH_WC_Custom_Combos();
		// }
	}
	
	
}