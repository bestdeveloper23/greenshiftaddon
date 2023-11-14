<?php
/**
	* Plugin Name: Greenshift Boilerplate Addon
	* Description: Extend your blocks with Greenshift high quality library and perfomance
	* Author: Wpsoul
	* Author URI: https://wpsoul.com
	* Version: 0.1
	*/

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

// Define Dir URL
define('GREENSHIFTADDONDEV_DIR_URL', plugin_dir_url(__FILE__));
define('GREENSHIFTADDONDEV_DIR_PATH', plugin_dir_path(__FILE__));

/* Costants */
if (!defined('GREENSHIFTADDONDEV_PLUGIN_VER')) {
	define('GREENSHIFTADDONDEV_PLUGIN_VER', '0.1');
}

if (defined('GREENSHIFT_DIR_URL')) {
	add_action('enqueue_block_editor_assets', 'greenShiftAddondev_editor_assets');
} else {
	add_action('admin_notices', 'gspb_boilerplatedev_admin_notice_warning');
}
//////////////////////////////////////////////////////////////////
// Show if parent is not loaded
//////////////////////////////////////////////////////////////////
function gspb_boilerplatedev_admin_notice_warning()
{
	?>
	<div class="notice notice-warning">
		<p>
			<?php printf(__('Please, activate %s plugin to use Boilerplate Addon'), '<a href="https://wordpress.org/plugins/greenshift-animation-and-page-builder-blocks" target="_blank">Greenshift</a>'); ?>
		</p>
	</div>
	<?php
}

/**
	* GreenShift Blocks Category
	*/
if (!function_exists('gspb_greenShiftAddondev_category')) {
	function gspb_greenShiftAddondev_category($categories, $post)
	{
		return array_merge(
			array(
				array(
					'slug' => 'greenShiftAddondev',
					'title' => __('GreenShift Addon Dev'),
				),
			),
			$categories
		);
	}
}
add_filter('block_categories_all', 'gspb_greenShiftAddondev_category', 1, 2);

//////////////////////////////////////////////////////////////////
// Register server side
//////////////////////////////////////////////////////////////////
require_once GREENSHIFTADDONDEV_DIR_PATH . 'blockrender/example/block.php';

//////////////////////////////////////////////////////////////////
// Functions to render conditional scripts
//////////////////////////////////////////////////////////////////

// Hook: Frontend assets.

add_action('init', 'greenShiftAddondev_register_init');

if (!function_exists('greenShiftAddondev_register_init')) {
	function greenShiftAddondev_register_init()
	{

		wp_enqueue_script(
			'gspbaddondev-gsap',
			GREENSHIFTGSAP_DIR_URL . 'libs/gsap/gsap.min.js',
			array(),
			'3.12.2',
			true
		);

		wp_enqueue_script(
			'gsap-scrolltrigger',
			GREENSHIFTGSAP_DIR_URL . 'libs/gsap/ScrollTrigger.min.js',
			array('gsap-animation'),
			'3.12.2',
			true
		);

		wp_enqueue_script(
			'gspbaddondev-init',
			GREENSHIFTADDONDEV_DIR_URL . 'libs/gsap/gsap-init3.js',
			array(),
			'1.1',
			true,
		);

		add_filter('script_loader_tag', 'add_type_to_script', 10, 3);
		function add_type_to_script($tag, $handle, $source) {
						if ('gspbaddondev-init' === $handle) {
										$tag = '<script src="' . $source . '" type="module" ></script>';
						}
						return $tag;
		}

		wp_enqueue_script(
			'gspbaddondevscript',
			GREENSHIFTADDONDEV_DIR_URL . 'libs/example/index.js',
			array(),
			'1.0',
			true
		);

		wp_enqueue_style(
			'gspbaddondevstyle',
			GREENSHIFTADDONDEV_DIR_URL . 'libs/example/index.css',
			array(),
			'1.1',
		);

	
		wp_enqueue_script(
			'advancedtable',
			GREENSHIFTADDONDEV_DIR_URL . 'assets/js/table.js',
			array(),
			'1.0',
			true
		);
		wp_register_style(
			'advancedtable',
			GREENSHIFTADDONDEV_DIR_URL . 'assets/css/table.css',
			array(),
			'1.0',
		);

		wp_register_script(
			'advancedtable-sort',
			GREENSHIFTADDONDEV_DIR_URL . 'assets/js/table-sort.js',
			array(),
			'1.2',
			true
		);
	}
}

//////////////////////////////////////////////////////////////////
// Enqueue Gutenberg block assets for backend editor.
//////////////////////////////////////////////////////////////////

if (!function_exists('greenShiftAddondev_editor_assets')) {
	function greenShiftAddondev_editor_assets()
	{
		// phpcs:ignor

		$index_asset_file = include(GREENSHIFTADDONDEV_DIR_PATH . 'build/index.asset.php');


		// Blocks Assets Scripts
		wp_enqueue_script(
			'greenShiftAddondev-block-js',
			// Handle.
			GREENSHIFTADDONDEV_DIR_URL . 'build/index.js',
			array('greenShift-editor-js', 'greenShift-library-script', 'wp-block-editor', 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-data'),
			rand(1, 9999),
			true
		);
		// Styles.
		wp_enqueue_style(
			'greenShiftAddondev-block-css',
			// Handle.
			GREENSHIFTADDONDEV_DIR_URL . 'build/index.css',
			// Block editor CSS.
			array('greenShift-library-editor', 'wp-edit-blocks'),
			$index_asset_file['version']
		);

	}
}

//////////////////////////////////////////////////////////////////
// REST routes to save and get settings
//////////////////////////////////////////////////////////////////

add_action('rest_api_init', 'gspb_boilerplatedev_register_route');
function gspb_boilerplatedev_register_route()
{

}

//////////////////////////////////////////////////////////////////
// Frontend Scripts
//////////////////////////////////////////////////////////////////

add_filter('render_block', 'greenShiftAddondev_block_script_assets', 10, 2);
if (!function_exists('greenShiftAddondev_block_script_assets')) {
	function greenShiftAddondev_block_script_assets($html, $block)
	{
		// phpcs:ignore

		//Main styles for blocks are loaded via Redux in main plugin. Can be found in src/customJS/editor/store/index.js

		if (!is_admin()) {

			if ($block['blockName'] == 'greenshift-blocks/animation-container2') {
				wp_enqueue_script('gspbaddondevscript');
				wp_enqueue_style('gspbaddondevstyle');
				// wp_enqueue_script('gspbaddondev-3d');
				// wp_enqueue_script('gspbaddondev-init');
			}

			if ($block['blockName'] == 'greenshift-blocks/advanced-table') {
				wp_enqueue_style('advancedtable');
				wp_enqueue_script('advancedtable');
				wp_enqueue_script('advancedtable-sort');
			}
			
		}

		return $html;
	}
}


// bUNDLE PLUGIN CODE 
if (!defined('WPINC'))
	die;

define('RHWCT_VERSION', '1.5');
define('RHWCT_DIRPATH', plugin_dir_path(__FILE__));
define('RHWCT_URIPATH', plugin_dir_url(__FILE__));

require RHWCT_DIRPATH . 'includes/class_rh_wc_tools.php';
new RH_WC_Tools();
// require_once RHWCT_DIRPATH .'includes/class_rh_wc_bundle.php';

// if ( class_exists( 'RH_WC_Custom_Bundles' ) ) {
//     new RH_WC_Custom_Bundles();
// }
// require_once RHWCT_DIRPATH .'includes/class_rh_wc_combo.php';

// if ( class_exists( 'RH_WC_Custom_Combos' ) ) {
//     new RH_WC_Custom_Combos();
// }