/**
 * Animation Container Block
 */

// Import Styles
import './editor.scss';

// Import wp dependencies
const { __ } = wp.i18n;
const { registerBlockType, createBlock } = wp.blocks;
import {
	InnerBlocks
} from '@wordpress/block-editor';
const { select } = wp.data;
import { useEffect, useRef, useCallback } from '@wordpress/element';
import { planeicon } from './components/icons.js'

import attributes from './components/attributes';
import AnimationContainer from './components/AnimationContainer';
import Inspector from './components/inspector';


// Import gspb depenedencies
const { gspb_setBlockId } = gspblib.utilities;
const { ExtraToolBar } = gspblib.editor;
const { BlockToolBar } = gspblib.components;

// Register Block
registerBlockType('greenshift-blocks/animation-container2', {
    title: __('Animation Container2'),
    description: __('Adds Animation Wrapper to your blocks'),
    category: 'greenShiftAddondev',
    keywords: [__('contaner'), __('animation'), __('effects')],
    icon: planeicon,
    supports: {
        reusable: true,
        anchor: true,
        align: ['wide', 'full'],
    },

    providesContext: {
		'container/flexbox': 'flexbox',
	},

	transforms: {
		from: [
			{
				type: 'block',
				isMultiBlock: true,
				blocks: [ '*' ],
				__experimentalConvert( blocks ) {

					// Clone the Blocks to be Grouped
					// Failing to create new block references causes the original blocks
					// to be replaced in the switchToBlockType call thereby meaning they
					// are removed both from their original location and within the
					// new group block.
					const groupInnerBlocks = blocks.map( ( block ) => {
						return createBlock(
							block.name,
							block.attributes,
							block.innerBlocks
						);
					} );

					return createBlock(
						'greenshift-blocks/animation-container',
						{
							
						},
						groupInnerBlocks
					);
				},
			},
		],
	},

    // Define attributes
    attributes: attributes,

    edit(props) {

        // Set Unique Block ID
        useEffect(() => {
            gspb_setBlockId(props);
        }, []);

        const {
            clientId,
            attributes: {
                id,
                animation_type,
                x,
                y,
                z,
                xo,
                yo,
                r,
                rx,
                ry,
                s,
                sx,
                sy,
                o,
                width,
                height,
                background,
                origin,
                custom_origin,
                text,
                stagger,
                stdelay,
                path,
                path_align,
                path_orient,
                path_align_x,
                path_align_y,
                path_start,
                path_end,
                morphend,
                morphstart,
                morphorigin, 
                mouse_move_enabled, 
                prlx_tilt, 
                prlx_xy, 
                prlx_cur, 
                prlx_reset, 
                multiple_animation, 
                multikeyframes,
                reveal_enabled,
                reveal_dir,
                reveal_speed,
                reveal_delay,
                reveal_bg, scroll_parallax_enabled,
                parallax_speedX,
                parallax_speedY,
                parallax_start,
                parallax_end,
                ease,
                delay,
                duration,
                yoyo,
                loop,
                repeatdelay,
                set_from,
                strandom,
                stchild,
                triggertype,
                customtrigger,
                customobject,
                triggerstart,
                triggerend,
                triggerscrub,
                pinned,
                pinspace,
                triggeraction,
                triggersnap,
                batchint,
                batchrandom,
                batchonce,
                batchchild,
                textmask,
                skewX, skewY,
                varwidth,
                varheight,
                blockWidth,
                durationfollow,
                videoplay,
                easecustom,
                maxX,
                variable1,
                variable2,
                variable3,
                variable4,
                variable1value,
                variable2value,
                variable3value,
                variable4value,
                reveal_clip,
                reveal_ease,
                model_url
            },
        } = props;

        let hasChildBlocks = select('core/block-editor').getBlockOrder(clientId).length > 0;

        const AnimationRef = useRef();
        const isInitialMount = useRef(true);
        const isStillMounted = useRef();
        let ctx = '';
        const debounce = useCallback(
            _.debounce((_atts) => {
                isStillMounted.current = true;
                if (isStillMounted.current && AnimationRef.current) {
                    let ownerDocument = AnimationRef.current.ownerDocument;
                    const gsapquick = AnimationRef.current.querySelector('.gs-gsap-wrap');
                    if(ctx) ctx.revert();
                    ctx = gsap.context(() => {
                        if (gsapquick) {
                            let stgsap = ScrollTrigger.getById('gsinit'+id);
                            if(stgsap) stgsap.kill();
                            gsap.killTweensOf(gsapquick);
                            gsapquick.style = '';
                            if (typeof gsapsplitTextinit != 'undefined' && gsapsplitTextinit) {
                                gsapsplitTextinit.revert();
                            }
                            if(ownerDocument.body.classList.contains('gspb-bodyadmin')){
                                GSinit(gsapquick, false, true, ownerDocument, id);
                            }else{
                                GSinit(gsapquick, true, false, ownerDocument, id);
                            }
                        }
                        const revealtransform = AnimationRef.current.querySelector('.gs-reveal-wrap');
                        if (revealtransform) {
                            let revealobj = revealtransform.querySelector('.gs-reveal-block');
                            let streveal = ScrollTrigger.getById('gsreveal'+id);
                            if(streveal) streveal.kill();
                            gsap.killTweensOf(revealobj);
                            if(ownerDocument.body.classList.contains('gspb-bodyadmin')){
                                GSrevealinit(revealtransform, false, true, id);
                            }else{
                                GSrevealinit(revealtransform, true, true, id);
                            }
                            
                        }
                        const parallaxobj = AnimationRef.current.querySelector('.gs-gsap-parallax');
                        if (parallaxobj) {
                            let stparallax = ScrollTrigger.getById('gsparallax'+id);
                            if(stparallax) stparallax.kill();
                            gsap.killTweensOf(parallaxobj);
                            if(ownerDocument.body.classList.contains('gspb-bodyadmin')){
                                GSparallaxinit(parallaxobj, true, id);
                            }
                        }
                        const mousetransform = AnimationRef.current.querySelector('.gs-prlx-mouse');
                        if (mousetransform) {
                            gsap.killTweensOf(mousetransform);
                            GSmousemoveinit(mousetransform);
                        }
                    });
                }
                return () => { isStillMounted.current = false; };
            }, 600),
            []
        );
        useEffect(() => {
            if (isInitialMount.current) {
                isInitialMount.current = false;
                if (AnimationRef.current) {
                    const gsapquick = AnimationRef.current.querySelector('.gs-gsap-wrap');
                    let ownerDocument = AnimationRef.current.ownerDocument;
                    if (gsapquick) {
                        if(ownerDocument.body.classList.contains('gspb-bodyadmin')){
                            GSinit(gsapquick, false, true, ownerDocument, id);
                        }else{
                            GSinit(gsapquick, true, false, ownerDocument, id);
                        }
                    }
                    const revealtransform = AnimationRef.current.querySelector('.gs-reveal-wrap');
                    if (revealtransform) {
                        if(ownerDocument.body.classList.contains('gspb-bodyadmin')){
                            GSrevealinit(revealtransform, false, true, id);
                        }else{
                            GSrevealinit(revealtransform, true, true, id);
                        }
                    }
                    const parallaxobj = AnimationRef.current.querySelector('.gs-gsap-parallax');
                    if (parallaxobj) {
                        if(ownerDocument.body.classList.contains('gspb-bodyadmin')){
                            GSparallaxinit(parallaxobj, true, id);
                        }
                    }
                    const mousetransform = AnimationRef.current.querySelector('.gs-prlx-mouse');
                    if (mousetransform) {
                        GSmousemoveinit(mousetransform);
                    }
                }
            } else {
                debounce(attributes);
            }
        }, [animation_type,
            x,
            y,
            z,
            xo,
            yo,
            r,
            rx,
            ry,
            s,
            sx,
            sy,
            o,
            width,
            height,
            background,
            origin,
            custom_origin,
            text,
            stagger,
            stdelay,
            path,
            path_align,
            path_orient,
            path_align_x,
            path_align_y,
            path_start,
            path_end,
            morphend,
            morphstart,
            morphorigin, 
            mouse_move_enabled, 
            prlx_tilt, 
            prlx_xy, 
            prlx_cur, 
            prlx_reset, 
            multiple_animation, 
            reveal_enabled,
            reveal_dir,
            reveal_speed,
            reveal_delay,
            reveal_bg, scroll_parallax_enabled,
            parallax_speedX,
            parallax_speedY,
            parallax_start,
            parallax_end,
            ease,
			delay,
			duration,
			yoyo,
			loop,
			repeatdelay,
			set_from,
            strandom,
            stchild,
			triggertype,
			customtrigger,
			customobject,
			triggerstart,
			triggerend,
			triggerscrub,
			pinned,
			pinspace,
			triggeraction,
			triggersnap,
			batchint,
            batchrandom,
            batchonce,
            batchchild,
            textmask,
            multikeyframes,skewX, skewY, 
            varwidth,
            variable1,
			variable2,
			variable3,
			variable4,
			variable1value,
			variable2value,
			variable3value,
			variable4value,
            blockWidth,
            durationfollow,
            varheight,videoplay,easecustom,maxX, 
            reveal_clip,
            reveal_ease,
            model_url]);

        return (
            <>
				{hasChildBlocks &&
					<ExtraToolBar
						editOnly={true}
						inner={true}
						gray={true}
						{...props}
					/>
				}
                <Inspector animationref={AnimationRef.current} {...props} />
                <BlockToolBar {...props} />
                <div className="gs-animation" ref={AnimationRef}>
                    <AnimationContainer editor={true} {...props}>
                    <InnerBlocks
                            renderAppender={ () => hasChildBlocks ? <InnerBlocks.DefaultBlockAppender /> : <InnerBlocks.ButtonBlockAppender /> }
                        />
                    </AnimationContainer>
                </div>
            </>
        );
    },

    save(props) {
        return (
            <AnimationContainer editor={false} {...props}>
                <InnerBlocks.Content />
            </AnimationContainer>
        );
    },
});
