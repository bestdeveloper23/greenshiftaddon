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
import { Application } from '../../../libs/splinetool/runtime.js';

import { useBlockProps } from '@wordpress/block-editor';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
                blocks: ['*'],
                __experimentalConvert(blocks) {

                    // Clone the Blocks to be Grouped
                    // Failing to create new block references causes the original blocks
                    // to be replaced in the switchToBlockType call thereby meaning they
                    // are removed both from their original location and within the
                    // new group block.
                    const groupInnerBlocks = blocks.map((block) => {
                        return createBlock(
                            block.name,
                            block.attributes,
                            block.innerBlocks
                        );
                    });

                    return createBlock(
                        'greenshift-blocks/animation-container2',
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

        const blockProps = useBlockProps();
        // ScrollTrigger.create({});
        gsap.registerPlugin(ScrollTrigger);
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
                model_url,
                selected_object,
                model_animations
            },
            setAttributes,
        } = props;

        useEffect(() => {
            let gsapscrolledfind = true;
            let mobilecheck = gsap.matchMedia();
            mobilecheck.add({
                isDesktop: '(min-width: 768px)',
                isMobile: '(max-width: 767px)',
            }, (context) => {
                let gs_wrappers = document.getElementsByClassName('gs-gsap-wrap');
                if (gs_wrappers.length > 0) {
                    for (let i = 0; i < gs_wrappers.length; i++) {
                        let current = gs_wrappers[i];
                        GSmodelinit(current, 'Scene', context);
                    };

                    if (gsapscrolledfind) { //Compatibility with lazy load script
                        document.addEventListener('lazyloaded', function (e) {
                            ScrollTrigger.refresh();
                        });
                    }
                }
                let gs_wrappersdata = document.querySelectorAll('[data-gsapinit]');
                if (gs_wrappersdata.length > 0) {
                    for (let i = 0; i < gs_wrappersdata.length; i++) {
                        let current = gs_wrappersdata[i];
                        GSmodelinit(current, 'Scene', context);
                    };
                }
            })

        }, [])

        function gs_get_dataset(elem, attribute) {
            return elem.getAttribute('data-' + attribute);
        };

        function GSmodelinit(current, obj = "Scene", context = {}) {
            let documentsearch = document;
            var scrollargs = {};
            if (!canvasRef.current) return;
            if (!canvasRef.current._scene) return;
            if (gs_get_dataset(current, "triggertype"))
                var triggertype = gs_get_dataset(current, "triggertype");
            else var triggertype = "scroll";
            current.getAttribute("data-prehidden") && current.removeAttribute("data-prehidden");
            var anargs = {};
            var camera = {};
            var selected_camera = false;
            canvasRef.current._scene.traverse((children) => {
                if (children.type && children.type !== 'HemisphereLight') {
                    gsap.killTweensOf(canvasRef.current.findObjectById(children.uuid));
                }
                if (children.name === "Scene" && obj === "Scene") {
                    obj = children.uuid;
                }
                if (children.type == "Camera" && !selected_camera) {
                    camera = children;
                    selected_camera = true;
                }

            })

            var object = canvasRef.current.findObjectById(obj);

            if (object && object.name === "Scene") {
                canvasRef.current._scene.traverse((child) => {
                    if (child.type !== 'HemisphereLight') {

                        var animation = gsap.timeline();
                        let multianimations = JSON.parse(gs_get_dataset(current, "modelanimations")) && JSON.parse(gs_get_dataset(current, "modelanimations")).slice().filter(item => item._objectkey === child.uuid);
                        let multikeyframesenable = gs_get_dataset(current, 'multikeyframes');
                        let keyframesarray = [];
                        if (multianimations && multianimations.length) {

                            if (child.name == 'Scene') {
                                var children1 = camera;
                                var children = canvasRef.current.findObjectById(child.uuid);
                            } else {
                                var children = canvasRef.current.findObjectById(child.uuid);
                            }
                            for (let curr = 0; curr < multianimations.length; curr++) {
                                let rx = multianimations[curr].rx ? multianimations[curr].rx : children.rotation.x;
                                let ry = multianimations[curr].ry ? multianimations[curr].ry : children.rotation.y;
                                let rz = multianimations[curr].rz ? multianimations[curr].rz : children.rotation.z;
                                let px = multianimations[curr].x ? multianimations[curr].x : children.position.x;
                                let py = multianimations[curr].y ? multianimations[curr].y : children.position.y;
                                let pz = multianimations[curr].z ? multianimations[curr].z : children.position.z;
                                let scx = multianimations[curr].sx ? multianimations[curr].sx : children.scale.x;
                                let scy = multianimations[curr].sy ? multianimations[curr].sy : children.scale.y;
                                let scz = multianimations[curr].sz ? multianimations[curr].sz : children.scale.z;
                                let de = multianimations[curr].delay;
                                let ea = multianimations[curr].ease;
                                let du = multianimations[curr].duration ? multianimations[curr].duration : 1.0;
                                let customtime = multianimations[curr].time;
                                let from = multianimations[curr].from;
                                let customobj = multianimations[curr].obj;

                                let multiargs = {};
                                multiargs.rotation = { x: parseFloat(rx), y: parseFloat(ry), z: parseFloat(rz) };
                                multiargs.position = { x: parseFloat(px), y: parseFloat(py), z: parseFloat(pz) };
                                multiargs.scale = { x: parseFloat(scx), y: parseFloat(scy), z: parseFloat(scz) };

                                multiargs.delay = parseFloat(de);
                                multiargs.duration = parseFloat(du);
                                multiargs.customtime = customtime;

                                multiargs.from = from;
                                multiargs.customobj = customobj;

                                if (ea) {
                                    if (ea == 'none') {
                                        multiargs.ease = "none";
                                    }
                                    else if (ea == 'power1-out' && multikeyframesenable == 'yes') {

                                    }
                                    else if (ea) {
                                        let $ease = ea.split("-");
                                        multiargs.ease = $ease[0] + "." + $ease[1];
                                    }
                                }

                                keyframesarray.push(multiargs);

                            }


                            if (multikeyframesenable == 'yes' && keyframesarray.length > 0) {
                                anargs.keyframes = keyframesarray;
                            }
                            //Set animation global properties
                            if (gs_get_dataset(current, 'from') == 'yes') {
                                animation.from(children, anargs);
                            } else {
                                animation.to(children, anargs);
                            }
                            if (gs_get_dataset(current, 'delay')) {
                                animation.delay(parseFloat(gs_get_dataset(current, 'delay')));
                            }
                            if (gs_get_dataset(current, 'loop') == 'yes') {
                                if (gs_get_dataset(current, 'yoyo') == 'yes') {
                                    animation.yoyo(true);
                                }
                                animation.repeat(-1);
                                if (gs_get_dataset(current, 'delay') && gs_get_dataset(current, 'repeatdelay') == 'yes') {
                                    animation.repeatDelay(parseFloat(gs_get_dataset(current, 'delay')));
                                }
                            }
                            if (multikeyframesenable != 'yes' && keyframesarray.length > 0) {

                                for (let curr = 0; curr < keyframesarray.length; curr++) {

                                    if (keyframesarray[curr].customobj) {
                                        if (keyframesarray[curr].customobj.indexOf(".") == 0 || keyframesarray[curr].customobj.indexOf("#") == 0) {
                                            if (keyframesarray[curr].customobj.indexOf(".") == 0) {
                                                children = documentsearch.querySelectorAll(keyframesarray[curr].customobj);
                                            }
                                            if (keyframesarray[curr].customobj.indexOf("#") == 0) {
                                                children = documentsearch.querySelector(keyframesarray[curr].customobj);
                                            }
                                        } else {
                                            children = documentsearch.querySelectorAll('.' + keyframesarray[curr].customobj);
                                        }
                                    }

                                    const { from, customtime, customobj, ...currentanimation } = keyframesarray[curr];
                                    let values = keyframesarray[curr];
                                    if (keyframesarray[curr].from == "yes") {
                                        animation.from(children.rotation, { x: values.rotation.x, y: values.rotation.y, z: values.rotation.z, delay: values.delay, duration: values.duration }).from(children.position, { x: values.position.x, y: values.position.y, z: values.position.z, delay: values.delay, duration: values.duration }, "<").from(children.scale, { x: values.scale.x, y: values.scale.y, z: values.scale.z, delay: values.delay, duration: values.duration }, "<")
                                    } else {
                                        animation.to(children.rotation, { x: values.rotation.x, y: values.rotation.y, z: values.rotation.z, delay: values.delay, duration: values.duration }).to(children.position, { x: values.position.x, y: values.position.y, z: values.position.z, delay: values.delay, duration: values.duration }, "<").to(children.scale, { x: values.scale.x, y: values.scale.y, z: values.scale.z, delay: values.delay, duration: values.duration }, "<")
                                    }
                                }
                            }
                            //Set trigger for animation
                            let curantrigger = '';
                            if (current.getAttribute('data-customtrigger')) {
                                if (current.getAttribute('data-customtrigger').indexOf("#") == 0 || current.getAttribute('data-customtrigger').indexOf(".") == 0) {
                                    curantrigger = documentsearch.querySelector(current.getAttribute('data-customtrigger'));
                                } else {
                                    curantrigger = (current.getAttribute('data-customtrigger') == 'window') ? window : current.querySelector(current.getAttribute('data-customtrigger'));
                                }
                            } else {
                                curantrigger = current;
                            }
                            if (triggertype == 'load') {
                                animation.play();
                            }
                            else if (triggertype == 'hover') {
                                animation.pause();
                                animation.reverse();
                                curantrigger.addEventListener("mouseenter", function (event) {
                                    animation.play();
                                });
                                curantrigger.addEventListener("mouseleave", function (event) {
                                    animation.reverse();
                                });
                            }
                            else if (triggertype == 'click') {
                                animation.pause();
                                animation.reverse();
                                curantrigger.addEventListener('click',
                                    function (event) {
                                        animation.play();
                                    }
                                );
                            }
                            else {
                                animation.play();
                                scrollargs.trigger = curantrigger;
                                let isMobile = (typeof context.conditions != 'undefined') ? context.conditions.isMobile : false;
                                let useMobile = (gs_get_dataset(current, 'useMobile') == 'yes') ? true : false;
                                let triggerstart = (useMobile && isMobile) ? gs_get_dataset(current, 'triggerstartM') : gs_get_dataset(current, 'triggerstart');
                                let triggerend = (useMobile && isMobile) ? gs_get_dataset(current, 'triggerendM') : gs_get_dataset(current, 'triggerend');

                                if (triggerstart) {
                                    scrollargs.start = (!isNaN(triggerstart)) ? parseInt(triggerstart) : triggerstart;
                                } else {
                                    if (gs_get_dataset(current, 'scrollcontainer') == 'yes') {
                                        scrollargs.start = "left 92%";
                                    } else {
                                        scrollargs.start = "clamp(top 92%)";
                                    }
                                }
                                if (triggerend) {
                                    scrollargs.end = (!isNaN(triggerend)) ? parseInt(triggerend) : triggerend;
                                }

                                if (gs_get_dataset(current, 'triggerscrub')) {
                                    scrollargs.scrub = parseFloat(gs_get_dataset(current, 'triggerscrub'));
                                }
                                if (gs_get_dataset(current, 'triggersnap')) {
                                    scrollargs.snap = parseFloat(gs_get_dataset(current, 'triggersnap'));
                                }
                                if (gs_get_dataset(current, 'pinned')) {
                                    scrollargs.pin = true;
                                    if (gs_get_dataset(current, 'pinreparent')) {
                                        scrollargs.pinReparent = true;
                                    }
                                    if (gs_get_dataset(current, 'anticipatepin')) {
                                        scrollargs.anticipatePin = true;
                                    }
                                    if (gs_get_dataset(current, 'pinspace')) {
                                        scrollargs.pinSpacing = false;
                                    }
                                    // if (gs_get_dataset(current, 'pinfade') == 'yes') {
                                    //     animation.from(children, { autoAlpha: 0, duration: 0.2 }, 0);
                                    //     animation.to(children, { autoAlpha: 0, duration: 0.2 }, 0.8);
                                    // }
                                }
                                if (gs_get_dataset(current, 'triggeraction')) {
                                    scrollargs.toggleActions = gs_get_dataset(current, 'triggeraction');
                                } else {
                                    scrollargs.toggleActions = 'play pause resume reverse';
                                }
                                scrollargs.animation = animation;
                                scrollargs.fastScrollEnd = true;

                                if (gs_get_dataset(current, 'pinpreview')) {
                                    scrollargs.pinType = "fixed";
                                }
                                let inEditor = true;
                                let scrollerfind = (typeof inEditor == 'boolean') ? ".interface-interface-skeleton__content" : inEditor;
                                scrollargs.scroller = scrollerfind;

                                if (gs_get_dataset(current, 'scrollernav') == 'yes') {
                                    scrollargs.scroller = current.closest('.gspb_pagenav');
                                }
                                if (gs_get_dataset(current, 'scroller')) {
                                    scrollargs.scroller = gs_get_dataset(current, 'scroller');
                                }
                                ScrollTrigger.create(scrollargs);
                            }
                        }
                    }
                })
            } else if (object) {
                var animation = gsap.timeline();
                let multianimations = JSON.parse(gs_get_dataset(current, "modelanimations")) && JSON.parse(gs_get_dataset(current, "modelanimations")).slice().filter(item => item._objectkey === object.uuid);
                let multikeyframesenable = gs_get_dataset(current, 'multikeyframes');
                let keyframesarray = [];

                if (multianimations && multianimations.length) {

                    for (let curr = 0; curr < multianimations.length; curr++) {
                        let rx = multianimations[curr].rx ? multianimations[curr].rx : object.rotation.x;
                        let ry = multianimations[curr].ry ? multianimations[curr].ry : object.rotation.y;
                        let rz = multianimations[curr].rz ? multianimations[curr].rz : object.rotation.z;
                        let px = multianimations[curr].x ? multianimations[curr].x : object.position.x;
                        let py = multianimations[curr].y ? multianimations[curr].y : object.position.y;
                        let pz = multianimations[curr].z ? multianimations[curr].z : object.position.z;
                        let scx = multianimations[curr].sx ? multianimations[curr].sx : object.scale.x;
                        let scy = multianimations[curr].sy ? multianimations[curr].sy : object.scale.y;
                        let scz = multianimations[curr].sz ? multianimations[curr].sz : object.scale.z;
                        let de = multianimations[curr].delay;
                        let ea = multianimations[curr].ease;
                        let du = multianimations[curr].duration ? multianimations[curr].duration : 1.0;
                        let customtime = multianimations[curr].time;
                        let from = multianimations[curr].from;
                        let customobj = multianimations[curr].obj;

                        let multiargs = {};
                        multiargs.rotation = { x: parseFloat(rx), y: parseFloat(ry), z: parseFloat(rz) };
                        multiargs.position = { x: parseFloat(px), y: parseFloat(py), z: parseFloat(pz) };
                        multiargs.scale = { x: parseFloat(scx), y: parseFloat(scy), z: parseFloat(scz) };

                        multiargs.delay = parseFloat(de);
                        multiargs.duration = parseFloat(du);
                        multiargs.customtime = customtime;

                        multiargs.from = from;
                        multiargs.customobj = customobj;

                        if (ea) {
                            if (ea == 'none') {
                                multiargs.ease = "none";
                            }
                            else if (ea == 'power1-out' && multikeyframesenable == 'yes') {

                            }
                            else if (ea) {
                                let $ease = ea.split("-");
                                multiargs.ease = $ease[0] + "." + $ease[1];
                            }
                        }

                        keyframesarray.push(multiargs);

                    }


                    if (multikeyframesenable == 'yes' && keyframesarray.length > 0) {
                        anargs.keyframes = keyframesarray;
                    }
                    //Set animation global properties
                    if (gs_get_dataset(current, 'from') == 'yes') {
                        animation.from(object, anargs);
                    } else {
                        animation.to(object, anargs);
                    }
                    if (gs_get_dataset(current, 'delay')) {
                        animation.delay(parseFloat(gs_get_dataset(current, 'delay')));
                    }
                    if (gs_get_dataset(current, 'loop') == 'yes') {
                        if (gs_get_dataset(current, 'yoyo') == 'yes') {
                            animation.yoyo(true);
                        }
                        animation.repeat(-1);
                        if (gs_get_dataset(current, 'delay') && gs_get_dataset(current, 'repeatdelay') == 'yes') {
                            animation.repeatDelay(parseFloat(gs_get_dataset(current, 'delay')));
                        }
                    }
                    if (multikeyframesenable != 'yes' && keyframesarray.length > 0) {

                        for (let curr = 0; curr < keyframesarray.length; curr++) {

                            if (keyframesarray[curr].customobj) {
                                if (keyframesarray[curr].customobj.indexOf(".") == 0 || keyframesarray[curr].customobj.indexOf("#") == 0) {
                                    if (keyframesarray[curr].customobj.indexOf(".") == 0) {
                                        object = documentsearch.querySelectorAll(keyframesarray[curr].customobj);
                                    }
                                    if (keyframesarray[curr].customobj.indexOf("#") == 0) {
                                        object = documentsearch.querySelector(keyframesarray[curr].customobj);
                                    }
                                } else {
                                    object = documentsearch.querySelectorAll('.' + keyframesarray[curr].customobj);
                                }
                            }

                            const { from, customtime, customobj, ...currentanimation } = keyframesarray[curr];
                            let values = keyframesarray[curr];
                            if (keyframesarray[curr].from == "yes") {
                                animation.from(object.rotation, { x: values.rotation.x, y: values.rotation.y, z: values.rotation.z, delay: values.delay, duration: values.duration }).from(object.position, { x: values.position.x, y: values.position.y, z: values.position.z, delay: values.delay, duration: values.duration }, "<").from(object.scale, { x: values.scale.x, y: values.scale.y, z: values.scale.z, delay: values.delay, duration: values.duration }, "<")
                            } else {
                                animation.to(object.rotation, { x: values.rotation.x, y: values.rotation.y, z: values.rotation.z, delay: values.delay, duration: values.duration }).to(object.position, { x: values.position.x, y: values.position.y, z: values.position.z, delay: values.delay, duration: values.duration }, "<").to(object.scale, { x: values.scale.x, y: values.scale.y, z: values.scale.z, delay: values.delay, duration: values.duration }, "<")
                            }
                        }
                    }
                    //Set trigger for animation
                    animation.play()
                    let curantrigger = '';
                    if (current.getAttribute('data-customtrigger')) {
                        if (current.getAttribute('data-customtrigger').indexOf("#") == 0 || current.getAttribute('data-customtrigger').indexOf(".") == 0) {
                            curantrigger = documentsearch.querySelector(current.getAttribute('data-customtrigger'));
                        } else {
                            curantrigger = (current.getAttribute('data-customtrigger') == 'window') ? window : current.querySelector(current.getAttribute('data-customtrigger'));
                        }
                    } else {
                        curantrigger = current;
                    }
                    if (triggertype == 'load') {
                        animation.play();
                    }
                    else if (triggertype == 'hover') {
                        animation.pause();
                        animation.reverse();
                        curantrigger.addEventListener("mouseenter", function (event) {
                            animation.play();
                        });
                        curantrigger.addEventListener("mouseleave", function (event) {
                            animation.reverse();
                        });
                    }
                    else if (triggertype == 'click') {
                        animation.pause();
                        animation.reverse();
                        curantrigger.addEventListener('click',
                            function (event) {
                                animation.play();
                            }
                        );
                    }
                    else {
                        animation.play();

                        scrollargs.trigger = curantrigger;
                        let isMobile = (typeof context.conditions != 'undefined') ? context.conditions.isMobile : false;
                        let useMobile = (gs_get_dataset(current, 'useMobile') == 'yes') ? true : false;
                        let triggerstart = (useMobile && isMobile) ? gs_get_dataset(current, 'triggerstartM') : gs_get_dataset(current, 'triggerstart');
                        let triggerend = (useMobile && isMobile) ? gs_get_dataset(current, 'triggerendM') : gs_get_dataset(current, 'triggerend');

                        if (triggerstart) {
                            scrollargs.start = (!isNaN(triggerstart)) ? parseInt(triggerstart) : triggerstart;
                        } else {
                            if (gs_get_dataset(current, 'scrollcontainer') == 'yes') {
                                scrollargs.start = "left 92%";
                            } else {
                                scrollargs.start = "clamp(top 92%)";
                            }
                        }
                        if (triggerend) {
                            scrollargs.end = (!isNaN(triggerend)) ? parseInt(triggerend) : triggerend;
                        }

                        if (gs_get_dataset(current, 'triggerscrub')) {
                            scrollargs.scrub = parseFloat(gs_get_dataset(current, 'triggerscrub'));
                        }
                        if (gs_get_dataset(current, 'triggersnap')) {
                            scrollargs.snap = parseFloat(gs_get_dataset(current, 'triggersnap'));
                        }
                        if (gs_get_dataset(current, 'pinned')) {
                            scrollargs.pin = true;
                            if (gs_get_dataset(current, 'pinreparent')) {
                                scrollargs.pinReparent = true;
                            }
                            if (gs_get_dataset(current, 'anticipatepin')) {
                                scrollargs.anticipatePin = true;
                            }
                            if (gs_get_dataset(current, 'pinspace')) {
                                scrollargs.pinSpacing = false;
                            }
                            if (gs_get_dataset(current, 'pinfade') == 'yes') {
                                animation.from(object, { autoAlpha: 0, duration: 0.2 }, 0);
                                animation.to(object, { autoAlpha: 0, duration: 0.2 }, 0.8);
                            }
                        }
                        if (gs_get_dataset(current, 'triggeraction')) {
                            scrollargs.toggleActions = gs_get_dataset(current, 'triggeraction');
                        } else {
                            scrollargs.toggleActions = 'play pause resume reverse';
                        }
                        scrollargs.animation = animation;
                        scrollargs.fastScrollEnd = true;

                        if (gs_get_dataset(current, 'pinpreview')) {
                            scrollargs.pinType = "fixed";
                        }
                        let inEditor = true;
                        let scrollerfind = (typeof inEditor == 'boolean') ? ".interface-interface-skeleton__content" : inEditor;
                        scrollargs.scroller = scrollerfind;

                        if (gs_get_dataset(current, 'scrollernav') == 'yes') {
                            scrollargs.scroller = current.closest('.gspb_pagenav');
                        }
                        if (gs_get_dataset(current, 'scroller')) {
                            scrollargs.scroller = gs_get_dataset(current, 'scroller');
                        }
                        ScrollTrigger.create(scrollargs);
                    }
                }
            }

        }


        let hasChildBlocks = select('core/block-editor').getBlockOrder(clientId).length > 0;

        const AnimationRef = useRef();
        const isInitialMount = useRef(true);
        const isStillMounted = useRef();
        const canvasRef = useRef(null);
        let ctx = '';
        const debounce = useCallback(
            _.debounce((_atts) => {
                isStillMounted.current = true;

                if (isStillMounted.current && AnimationRef.current) {
                    let ownerDocument = AnimationRef.current.ownerDocument;
                    const gsapquick = AnimationRef.current.querySelector('.gs-gsap-wrap');

                    if (ctx) ctx.revert();
                    ctx = gsap.context(() => {
                        if (gsapquick) {

                            if (gsapquick && canvasRef.current && model_animations) {
                                if (ownerDocument.body.classList.contains('gspb-bodyadmin')) {
                                    if (canvasRef.current.findObjectById(gs_get_dataset(gsapquick, 'target')) && canvasRef.current.findObjectById(gs_get_dataset(gsapquick, "target")).type !== "HemisphereLight") {
                                        gsap.killTweensOf(canvasRef.current.findObjectById(gs_get_dataset(gsapquick, "target")));
                                    }
                                    GSmodelinit(gsapquick, gs_get_dataset(gsapquick, "target"));
                                } else {
                                    if (canvasRef.current.findObjectById(gs_get_dataset(gsapquick, "target")).type !== "HemisphereLight") {
                                        gsap.killTweensOf(canvasRef.current.findObjectById(gs_get_dataset(gsapquick, "target")));
                                    }
                                    GSmodelinit(gsapquick, gs_get_dataset(gsapquick, "target"));
                                }
                            }
                            // let stgsap = ScrollTrigger.getById('gsinit' + id);
                            // if (stgsap) stgsap.kill();
                            // gsap.killTweensOf(gsapquick);
                            // gsapquick.style = '';
                            // if (typeof gsapsplitTextinit != 'undefined' && gsapsplitTextinit) {
                            //     gsapsplitTextinit.revert();
                            // }
                            // if (ownerDocument.body.classList.contains('gspb-bodyadmin')) {
                            //     GSinit(gsapquick, false, true, ownerDocument, id);
                            // } else {
                            //     GSinit(gsapquick, true, false, ownerDocument, id);
                            // }
                        }
                        // const revealtransform = AnimationRef.current.querySelector('.gs-reveal-wrap');
                        // if (revealtransform) {
                        //     let revealobj = revealtransform.querySelector('.gs-reveal-block');
                        //     let streveal = ScrollTrigger.getById('gsreveal' + id);
                        //     if (streveal) streveal.kill();
                        //     gsap.killTweensOf(revealobj);
                        //     if (ownerDocument.body.classList.contains('gspb-bodyadmin')) {
                        //         gsap.killTweensOf(canvasRef.current.findObjectById(gs_get_dataset(gsapquick, "target")));
                        //         GSrevealinit(revealtransform, false, true, id);
                        //     } else {
                        //         gsap.killTweensOf(canvasRef.current.findObjectById(gs_get_dataset(gsapquick, "target")));
                        //         GSrevealinit(revealtransform, true, true, id);
                        //     }

                        // }
                        // const parallaxobj = AnimationRef.current.querySelector('.gs-gsap-parallax');
                        // if (parallaxobj) {
                        //     let stparallax = ScrollTrigger.getById('gsparallax' + id);
                        //     if (stparallax) stparallax.kill();
                        //     gsap.killTweensOf(parallaxobj);
                        //     if (ownerDocument.body.classList.contains('gspb-bodyadmin')) {
                        //         GSparallaxinit(parallaxobj, true, id);
                        //     }
                        // }
                        // const mousetransform = AnimationRef.current.querySelector('.gs-prlx-mouse');
                        // if (mousetransform) {
                        //     gsap.killTweensOf(mousetransform);
                        //     GSmousemoveinit(mousetransform);
                        // }
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


                    if (gsapquick && canvasRef.current && model_animations) {
                        if (ownerDocument.body.classList.contains('gspb-bodyadmin')) {
                            GSmodelinit(gsapquick, gs_get_dataset(gsapquick, 'target'), id);
                        } else {
                            GSmodelinit(gsapquick, gs_get_dataset(gsapquick, 'target'), id);
                        }
                    }
                    // if (gsapquick) {
                    //     if (ownerDocument.body.classList.contains('gspb-bodyadmin')) {
                    //         GSinit(gsapquick, false, true, ownerDocument, id);
                    //     } else {
                    //         GSinit(gsapquick, true, false, ownerDocument, id);
                    //     }
                    // }
                    // const revealtransform = AnimationRef.current.querySelector('.gs-reveal-wrap');
                    // if (revealtransform) {
                    //     if (ownerDocument.body.classList.contains('gspb-bodyadmin')) {
                    //         GSrevealinit(revealtransform, false, true, id);
                    //     } else {
                    //         GSrevealinit(revealtransform, true, true, id);
                    //     }
                    // }
                    // const parallaxobj = AnimationRef.current.querySelector('.gs-gsap-parallax');
                    // if (parallaxobj) {
                    //     if (ownerDocument.body.classList.contains('gspb-bodyadmin')) {
                    //         GSparallaxinit(parallaxobj, true, id);
                    //     }
                    // }
                    // const mousetransform = AnimationRef.current.querySelector('.gs-prlx-mouse');
                    // if (mousetransform) {
                    //     GSmousemoveinit(mousetransform);
                    // }
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
            multikeyframes, skewX, skewY,
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
            varheight, videoplay, easecustom, maxX,
            reveal_clip,
            reveal_ease,
            model_animations,
            selected_object]
        );


        useEffect(() => {

            (() => {
                const oldCanvas = AnimationRef.current.querySelector('.gs-gsap-wrap');

                if (oldCanvas && oldCanvas.getAttribute("url")) {
                    let test_objects = [];
                    const model_url2 = oldCanvas.getAttribute("url");

                    if (oldCanvas.children.length) {
                        oldCanvas.children[0].remove();
                        const newCanvas = document.createElement('canvas');
                        const contextWebGL = newCanvas.getContext('webgl2');
                        oldCanvas.appendChild(newCanvas);
                    } else {
                        const newCanvas = document.createElement('canvas');
                        const contextWebGL = newCanvas.getContext('webgl2');
                        oldCanvas.appendChild(newCanvas);
                    }

                    const app = new Application(oldCanvas.children[0]);
                    canvasRef.current = app;
                    canvasRef.current.stop();

                    app.load(model_url2).then(() => {
                        getobjects(app._scene);
                        setAttributes({ td_objects: test_objects });
                    }).catch((error) => {
                        // Handle the error state
                        console.error("Error occurred while loading the model:", error);
                        setAttributes({ model_url: '' });
                        oldCanvas.children[0].remove();
                        // Set the error state or perform any necessary actions
                    });;

                    // treeselect contructor----------------------------------------------//
                    function getobjects(object) {

                        if (object.children.length === 0) {
                            return ({ id: object.uuid, name: object.name ? object.name : 'invisible' });
                        } else if (object.children.length === 1) {
                            return getobjects(object.children[0])
                        } else if (object.children.length > 1) {
                            const childrens = [];
                            object.children.map((child) => {
                                const childrens2 = [];
                                let children;
                                children = getobjects(child);
                                childrens2.push(children);
                                if (child.children.length <= 1)
                                    childrens.push(children);
                                else childrens.push({ id: child.uuid, name: child.name, children: childrens2 });

                                // }

                            });
                            test_objects[0] = ({ id: object.uuid, name: object.name, children: childrens });

                            return ({ id: object.uuid, name: object.name, children: childrens });
                        }
                    }

                }
            })();

        }, [model_url])

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
                    <AnimationContainer editor={true} {...props} {...blockProps}>
                        {animation_type != '3d_model' && !model_url &&

                            <InnerBlocks
                                renderAppender={() => hasChildBlocks ? <InnerBlocks.DefaultBlockAppender /> : <InnerBlocks.ButtonBlockAppender />}
                            />
                        }
                    </AnimationContainer>
                </div>
            </>
        );
    },

    save(props) {
        return (
            <>
                < AnimationContainer editor={false} {...props} >

                    <InnerBlocks.Content />
                </AnimationContainer >
            </>

        );
    },
});
