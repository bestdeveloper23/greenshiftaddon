/**
	* Set the block attributes
	* @type {Object}
	*/
const { collectionsObjects } = gspblib.helpers;
export default {
	id: {
		type: 'string',
		default: null,
	},
	inlineCssStyles: {
		type: 'string',
	},
	dynamicGClass: {
		type: "string",
	},
	dynamicGClasses: {
		type: "array",
	},
	stylebook_class: {
		type: "string",
	},
	stylebook_attrs: {
		type: "object",
	},
	td_url: {
		type: 'string',
	},
	imageurl: {
		type: 'string',
	},
	imageid: {
		type: 'number',
	},
	td_load_iter: {
		type: 'boolean',
	},
	td_ar: {
		type: 'boolean',
		default: true,
	},
	td_ar_scale: {
		type: 'boolean',
	},
	td_rotate: {
		type: 'boolean',
		default: true,
	},
	td_camera: {
		type: 'boolean',
		default: true,
	},
	td_ar_wall: {
		type: 'boolean',
	},
	td_zoom_disable: {
		type: 'boolean',
	},
	td_neutral: {
		type: 'boolean',
	},
	td_play: {
		type: 'boolean',
	},
	td_variants: {
		type: 'boolean',
	},
	usdz_url: {
		type: 'string',
	},
	td_cam_orbit: {
		type: 'string',
	},
	td_sky: {
		type: 'string',
	},
	td_env: {
		type: 'string',
	},
	td_an_choose: {
		type: 'string',
	},
	threecanvwidth: {
		type: 'array',
		default: [100, null, null, null]
	},
	threecanvheight: {
		type: 'array',
		default: [250, null, null, null]
	},
	threecanvwidthUnit: {
		type: 'array',
		default: ['%', '%', '%', '%']
	},
	threecanvheightUnit: {
		type: 'array',
		default: ['px', 'px', 'px', 'px']
	},
	td_scale: {
		type: 'number',
	},
	td_shadow_opacity: {
		type: 'number',
	},
	td_shadow_soft: {
		type: 'number',
	},
	td_rx: {
		type: 'number',
	},
	td_ry: {
		type: 'number',
	},
	td_rz: {
		type: 'number',
	},
	td_mmove: {
		type: 'number',
	},
	align: {
		type: 'string'
	},
	background: {
		type: 'object',
		default: collectionsObjects.background,
	},
	spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},
	animation: {
		type: 'object',
		default: collectionsObjects.animation,
	},
	responsive: {
		type: 'object',
		default: collectionsObjects.responsive
	},
	position: {
		type: 'object',
		default: collectionsObjects.position,
	},
	csstransform: {
		type: 'object',
		default: collectionsObjects.csstransform,
	},
	dynamicEnable: {
		"type": "boolean",
	},
	dynamicMetas: {
		"type": "object",
	},
	dynamicPostType: {
		"type": "string",
	},
	dynamicType: {
		"type": "string",
	},

	multiple_animation: {
		type: 'string',
		default: '[]'
	},

	multikeyframes: {
		type: 'boolean',
	},

	td_objects: {
		type: 'array'
	}
};
