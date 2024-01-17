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
    flexbox: {
		type: 'object',
		default: collectionsObjects.flexbox,
	},
    dynamicGClass: {
        type: "string",
    },
    animation_type: {
        type: 'string',
        default: 'regular'
    },
    additive: {
        type: 'boolean',
    },
    shadow: {
        type: 'object',
        default: collectionsObjects.shadow
    },
    x: {
        type: 'string',
        default: null
    },
    y: {
        type: 'string',
        default: null
    },
    z: {
        type: 'string',
        default: null
    },
    xo: {
        type: 'number',
        default: null
    },

    yo: {
        type: 'number',
        default: null
    },

    r: {
        type: 'number',
        default: null
    },

    rx: {
        type: 'number',
        default: null
    },

    ry: {
        type: 'number',
        default: null
    },
    rz: {
        type: 'number',
        default: null
    },

    s: {
        type: 'number',
        default: null
    },

    sx: {
        type: 'number',
        default: null
    },

    sy: {
        type: 'number',
        default: null
    },
    sz: {
        type: 'number',
        default: null
    },
    skewX: {
        type: 'number',
        default: null
    },

    skewY: {
        type: 'number',
        default: null
    },

    width: {
        type: 'string',
    },

    height: {
        type: 'string',
    },

    o: {
        type: 'number',
        default: null
    },

    background: {
        type: 'string',
    },
    blockWidth: {
		type: 'object',
		default: collectionsObjects.blockWidth
	},

    origin: {
        type: 'string',
    },

    custom_origin: {
        type: 'boolean',
        default: false
    },

    ease: {
        type: 'string',
    },

    delay: {
        type: 'number',
        default: null
    },

    duration: {
        type: 'number',
        default: 1
    },
    durationfollow: {
        type: 'number',
    },

    yoyo: {
        type: 'boolean',
        default: false
    },

    loop: {
        type: 'boolean',
        default: false
    },

    repeatdelay: {
        type: 'boolean',
        default: false
    },

    strandom: {
        type: 'boolean',
        default: false
    },
    stchild: {
        type: 'boolean',
        default: true
    },
    batchchild: {
        type: 'boolean',
        default: true
    },
    batchrandom: {
        type: 'boolean',
    },
    batchonce: {
        type: 'boolean',
    },

    // break type for text
    text: { 
        type: 'string',
        default: null
    },
    textmask: {
        type: 'boolean',
    },

    // stagger class
    stagger: {
        type: 'string',
        default: null
    },

    triggertype: {
        type: 'string',
        default: 'scroll'
    },

	// Css ID of custom trigger or custom class for Batch scroll.
    customtrigger: {
        type: 'string',
        default: null
    },

    // Css ID or class where to add animation.
    customobject: {
        type: 'string',
        default: null
    },

    triggerstart: {
        type: 'string',
        default: null
    },

    triggerend: {
        type: 'string',
        default: null
    },

    triggerstartM: {
        type: 'string',
        default: null
    },

    triggerendM: {
        type: 'string',
        default: null
    },

    // Interpolate animation by Scroll
    triggerscrub: {
        type: 'number',
        default: null
    },
    stdelay: {
        type: 'number',
        default: null
    },

    // Pin while scroll
    pinned: {
        type: 'boolean',
        default: false
    },
    pinReparent: {
        type: 'boolean'
    },

    //Enable overflow on pinned item
    pinspace: {
        type: 'boolean',
        default: false
    },

    triggeraction: {
        type: 'string',
        default: null
    },

    triggersnap: {
        type: 'number',
        default: null
    },

    morphstart: {
        type: 'string',

    },
    morphend: {
        type: 'string',
    },
    morphorigin: {
        type: 'string',
    },

    path: {
        type: 'string',
        default: null
    },

    path_block: {
        type: 'string',
        default: null
    },
    path_align: {
        type: 'string',
    },

    path_orient: {
        type: 'boolean',
        default: false
    },

    path_align_x: {
        type: 'number',
        default: null
    },

    path_align_y: {
        type: 'number',
        default: null
    },
    path_start: {
        type: 'number',
        default: null
    },

    path_end: {
        type: 'number',
        default: null
    },

    // Interval between items
    batchint: {
        type: 'number',
        default: null
    },

    reveal_enabled: {
        type: 'boolean',
        default: false
    },
    reveal_clip: {
        type: 'boolean',
    },
    reveal_ease: {
        type: 'string',
    },

    reveal_dir: {
        type: 'string',
        default: 'lr'
    },
    
    reveal_speed: {
        type: 'number',
        default: 1
    },

    reveal_delay: {
        type: 'number',
        default: null
    },

    reveal_bg: {
        type: 'string',
        default: null
    },

    scroll_parallax_enabled: {
        type: 'boolean',
        default: false
    },

    parallax_speedX: {
        type: 'number',
        default: null
    },
    parallax_speedY: {
        type: 'number',
        default: null
    },
    parallax_start: {
        type: 'string'
    },
    parallax_end: {
        type: 'string',
    },

    parallax_reverse_direction: {
        type: 'boolean',
        default: false
    },

    mouse_move_enabled: {
        type: 'boolean',
        default: false
    },

    prlx_xy: {
        type: 'number',
        default: null
    },

    prlx_tilt: {
        type: 'number',
        default: null
    },

    prlx_cur: {
        type: 'boolean',
        default: false
    },

    prlx_reset: {
        type: 'boolean',
        default: false
    },

    multiple_animation: {
        type: 'string',
        default: '[]'
    },

    set_from: {
        type: 'boolean',
        default: true
    },
    multikeyframes: {
        type: 'boolean',
    },
    responsive: {
		type: 'object',
		default: collectionsObjects.responsive
	},
    spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},
    position: {
		type: 'object',
		default: collectionsObjects.position,
	},
	csstransform: {
		type: 'object',
		default: collectionsObjects.csstransform,
	},
	backgroundBlock: {
		type: 'object',
		default: collectionsObjects.background,
	},
	backgroundReveal: {
		type: 'object',
		default: collectionsObjects.background,
	},
    prehide: {
        type: 'boolean',
    },
    useMobile: {
        type: 'boolean',
    },
    variable1: {
        type: 'string',
    },
    variable2: {
        type: 'string',
    },
    variable3: {
        type: 'string',
    },
    variable4: {
        type: 'string',
    },
    variable1value: {
        type: 'string',
    },
    variable2value: {
        type: 'string',
    },
    variable3value: {
        type: 'string',
    },
    variable4value: {
        type: 'string',
    },
    xM: {
        type: 'string',
        default: null
    },
    yM: {
        type: 'string',
        default: null
    },
    zM: {
        type: 'string',
        default: null
    },
    xoM: {
        type: 'number',
        default: null
    },

    yoM: {
        type: 'number',
        default: null
    },

    rM: {
        type: 'number',
        default: null
    },

    rxM: {
        type: 'number',
        default: null
    },

    ryM: {
        type: 'number',
        default: null
    },
    rzM: {
        type: 'number',
        default: null
    },

    sM: {
        type: 'number',
        default: null
    },

    sxM: {
        type: 'number',
        default: null
    },

    syM: {
        type: 'number',
        default: null
    },
    szM: {
        type: 'number',
        default: null
    },
    oM: {
        type: 'number',
        default: null
    },
    skewXM: {
        type: 'number',
        default: null
    },

    skewYM: {
        type: 'number',
        default: null
    },
    scroller: {
        type: 'string',
    },
    varwidth: {
        type: 'string',
    },
    varheight: {
        type: 'string',
    },
    winwidth: {
        type: 'string',
    },
    winheight: {
        type: 'string',
    },
    observetype: {
        type: 'string',
    },
    tolerance: {
        type: 'number',
        default: null
    },
    addspeedX: {
        type: 'number',
        default: null
    },
    addspeedY: {
        type: 'number',
        default: null
    },
    flexAlign: {
        type: 'string',
    },
    videoplay: {
        type: 'boolean',
    },
    scrollcontainer: {
        type: 'boolean',
    },
    scrollernav: {
        type: 'boolean',
    },
    easecustom: {
        type: 'string',
    },
    maxX: {
        type: 'string',
    },
    color: {
        type: 'string',
    },
    clipInit: {
        type: 'string',
    },
    clipFinal: {
        type: 'string',
    },
    customProps: {
        type: 'array',
    },
    customPropsM: {
        type: 'array',
    },
    model_url: {
        type:'string',
    },
    td_objects: {
        type: 'array',
    },
    selected_object: {
        type:'string',
    },
    model_animations: {
        type: 'string',
        default: '[]',
    },
    variables: {
        type: 'array',
        default: null,
    },
    splineApp: {
        type: 'string',
    },
    splinezoom: {
        type: 'number',
        default: 1,
    },
    zoomIn: {
        type: 'number',
        default: 1,
    },
    zoomInM: {
        type: 'number',
        default: 1,
    },
    zoomTF: {
        type: 'boolean',
        default: false,
    }
}