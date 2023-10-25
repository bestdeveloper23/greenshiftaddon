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
import { Application } from '@splinetool/runtime';

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
                td_objects,
                model_animations
            },
            setAttributes,
        } = props;

        function GSmodelinit(t, e = !1, a = !1, obj = "", s = "", g = "", i = {}) {
            const oldCanvas = AnimationRef.current.querySelector('.animationmodel');
            let o = s || document;
            var r = {};
            let l;
            if (gs_get_dataset(t, "triggertype"))
                var d = gs_get_dataset(t, "triggertype");
            else var d = "scroll";
            t.getAttribute("data-prehidden") && t.removeAttribute("data-prehidden");
            var n = {};
            canvasRef.current._scene.traverse((child) => {
                console.log("I am here", child, obj)
                if (child.uuid === obj && child.type === "Mesh") {
                    l = child;
                    console.log("I selected: ", l)
                }
            });
            var B = gsap.timeline();
            let O = gs_get_dataset(t, "modelanimations") && JSON.parse(gs_get_dataset(t, "modelanimations")).slice().filter(item => item._objectkey === obj), j = gs_get_dataset(t, "multikeyframes"), L = [];


            if (O) for (let X = 0; X < O.length; X++) {
                let Y = O[X].rx ? O[X].rx : l.rotation.x, E = O[X].ry ? O[X].ry : l.rotation.y, T = O[X].rz ? O[X].rz : l.rotation.z,
                    V = O[X].x ? O[X].x : l.position.x, W = O[X].y ? O[X].y : l.position.y, D = O[X].z ? O[X].z : l.position.z,
                    I = O[X].sz ? O[X].sz : l.scale.z, R = O[X].sx ? O[X].sx : l.scale.x, H = O[X].sy ? O[X].sy : l.scale.y,
                    F = O[X].o ? O[X] : l.material.opacity, Q = O[X].delay,
                    Z = O[X].ease, tt = O[X].duration, te = O[X].time, ta = O[X].from, ti = {};

                let modified_material = l.material;
                modified_material.opacity = (parseFloat(F) / 100);

                // ti.rotation = { x: parseFloat(Y), y: parseFloat(E), z: parseFloat(T) };
                // ti.position = { x: parseFloat(V), y: parseFloat(W), z: parseFloat(D) };
                // ti.scale = { x: parseFloat(R), y: parseFloat(H), z: parseFloat(I) };
                ti.material = modified_material;
                ti.delay = Q;
                ti.duration = tt;
                ti.customtime = te;
                ti.from = ta;
                // if ((Y || 0 == Y) && (ti.rotation = parseFloat(Y)), (E || 0 == E) && (ti.rotation.y = parseFloat(E)), (T || 0 == T) && (ti.rotation = parseFloat(T)), (V || 0 == V) && (ti.position.x = parseFloat(V)), (W || 0 == W) && (ti.position.y = parseFloat(W)), (D || 0 == D) && (ti.position.z = parseFloat(D)), (z || 0 == z), I && (ti.scale.x = parseFloat(I)), R && (ti.scale.y = parseFloat(R)), H && (ti.scale.z = parseFloat(H)), (F || 0 === F) && (ti.autoAlpha = parseInt(F) / 100), Q && (ti.delay = parseFloat(Q)), (U || 0 == U) && (ti.width = U), (N || 0 == N) && (ti.height = N), K && (ti.transformOrigin = K), tt && "yes" != j && (ti.duration = parseFloat(tt)), te && "yes" != j ? ti.customtime = te : te || "yes" == j || (ti.customtime = ">"), ta && "yes" != j && (ti.from = ta), tg && "yes" != j && (ti.customobj = tg), Z) {
                if (ti.rotation, ti.position, ti.scale, ti.delay, ti.duration, ti.opacity, Z) {
                    if ("none" == Z) ti.ease = "none";
                    else if ("power1-out" == Z && "yes" == j);
                    else if (Z) {
                        let to = Z.split("-");
                        ti.ease = to[0] + "." + to[1]
                    }
                }
                // if ("yes" === ts) for (let tr in ti) ("x" == tr || "y" == tr || "z" == tr || "rotationX" == tr || "rotationY" == tr || "rotation" == tr || "scale" == tr || "scaleX" == tr || "scaleY" == tr || "height" == tr || "width" == tr || "xPercent" == tr || "yPercent" == tr) && (ti[tr] = "+=" + ti[tr]);

                L.push(ti)
            }
            if ("yes" == j && L.length > 0 && (n.keyframes = L), "yes" == gs_get_dataset(t, "from") ? B.from(l, n) : B.to(l, n), gs_get_dataset(t, "delay") && B.delay(parseFloat(gs_get_dataset(t, "delay"))), "yes" == gs_get_dataset(t, "loop") && ("yes" == gs_get_dataset(t, "yoyo") && B.yoyo(!0), B.repeat(-1), gs_get_dataset(t, "delay") && "yes" == gs_get_dataset(t, "repeatdelay") && B.repeatDelay(parseFloat(gs_get_dataset(t, "delay")))), "yes" != j && L.length > 0)
                for (let tl = 0; tl < L.length; tl++) {
                    L[tl].customobj && (0 == L[tl].customobj.indexOf(".") || 0 == L[tl].customobj.indexOf("#") ? (0 == L[tl].customobj.indexOf(".") && (l = o.querySelectorAll(L[tl].customobj)), 0 == L[tl].customobj.indexOf("#") && (l = o.querySelector(L[tl].customobj))) : l = o.querySelectorAll("." + L[tl].customobj));
                    let { from: td, customtime: tn, ...tc } = L[tl];
                    (L[tl].z || L[tl].rx || L[tl].ry) && gsap.set(l, { transformPerspective: 1e3 }),
                        "yes" == L[tl].from ? B.from(l, tc, L[tl].customtime) : B.to(l, tc, L[tl].customtime)
                }
            let tu = "";
            if (tu = t.getAttribute("data-customtrigger") ? 0 == t.getAttribute("data-customtrigger").indexOf("#") || 0 == t.getAttribute("data-customtrigger").indexOf(".") ? o.querySelector(t.getAttribute("data-customtrigger")) : "window" == t.getAttribute("data-customtrigger") ? window : t.querySelector(t.getAttribute("data-customtrigger")) : t, "load" == d || e) B.play();
            else if ("hover" == d)
                B.pause(),
                    B.reverse(),
                    tu.addEventListener("mouseenter", function (e) { B.play() }),
                    tu.addEventListener("mouseleave", function (e) { B.reverse() });
            else if ("click" == d)
                B.pause(),
                    B.reverse(),
                    tu.addEventListener("click", function (e) { B.play() });
            else {
                gsapscrolledfind = !0, r.trigger = tu;
                let tL = void 0 !== i.conditions && i.conditions.isMobile, tX = "yes" == gs_get_dataset(t, "useMobile"), tY = tX && tL ? gs_get_dataset(t, "triggerstartM") : gs_get_dataset(t, "triggerstart"), tE = tX && tL ? gs_get_dataset(t, "triggerendM") : gs_get_dataset(t, "triggerend");
                if (tY ? r.start = isNaN(tY) ? tY : parseInt(tY) : "yes" == gs_get_dataset(t, "scrollcontainer") ? r.start = "left 92%" : r.start = "clamp(top 92%)", tE && (r.end = isNaN(tE) ? tE : parseInt(tE)), gs_get_dataset(t, "triggerscrub") && (r.scrub = parseFloat(gs_get_dataset(t, "triggerscrub"))), gs_get_dataset(t, "triggersnap") && (r.snap = parseFloat(gs_get_dataset(t, "triggersnap"))), gs_get_dataset(t, "pinned") && (r.pin = !0, gs_get_dataset(t, "pinreparent") && (r.pinReparent = !0), gs_get_dataset(t, "anticipatepin") && (r.anticipatePin = !0), gs_get_dataset(t, "pinspace") && (r.pinSpacing = !1), "yes" == gs_get_dataset(t, "pinfade") && (B.from(l, { autoAlpha: 0, duration: .2 }, 0), B.to(l, { autoAlpha: 0, duration: .2 }, .8))), gs_get_dataset(t, "triggeraction") ? r.toggleActions = gs_get_dataset(t, "triggeraction") : r.toggleActions = "play pause resume reverse", r.animation = B, "yes" == gs_get_dataset(t, "videoplay") && (r.onToggle = t => t.isActive ? GSPBplayVideo(l) : GSPBplayVideo(l, "pause")), r.fastScrollEnd = !0, a) gs_get_dataset(t, "pinpreview") && (r.pinType = "fixed"), r.scroller = "boolean" == typeof a ? ".interface-interface-skeleton__content" : a;
                else if ("yes" == gs_get_dataset(t, "scrollcontainer")) {
                    let tT = t.closest(".gs-gsap-scrollx");
                    if (tT) {
                        let tV = ScrollTrigger.getById("gspagescrollx" + tT.getAttribute("id"));
                        if (tV) {
                            let tW = tV.animation.getById(tT.getAttribute("id"));
                            tW && (r.containerAnimation = tW)
                        }
                    }
                } "yes" == gs_get_dataset(t, "scrollernav") && (r.scroller = t.closest(".gspb_pagenav")), gs_get_dataset(t, "scroller") && (r.scroller = gs_get_dataset(t, "scroller")), g && (r.id = "gsinit" + g), ScrollTrigger.create(r)
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
                            let stgsap = ScrollTrigger.getById('gsinit' + id);
                            if (stgsap) stgsap.kill();
                            gsap.killTweensOf(gsapquick);
                            gsapquick.style = '';
                            if (typeof gsapsplitTextinit != 'undefined' && gsapsplitTextinit) {
                                gsapsplitTextinit.revert();
                            }
                            if (ownerDocument.body.classList.contains('gspb-bodyadmin')) {
                                GSinit(gsapquick, false, true, ownerDocument, id);
                            } else {
                                GSinit(gsapquick, true, false, ownerDocument, id);
                            }
                        }
                        const revealtransform = AnimationRef.current.querySelector('.gs-reveal-wrap');
                        if (revealtransform) {
                            let revealobj = revealtransform.querySelector('.gs-reveal-block');
                            let streveal = ScrollTrigger.getById('gsreveal' + id);
                            if (streveal) streveal.kill();
                            gsap.killTweensOf(revealobj);
                            if (ownerDocument.body.classList.contains('gspb-bodyadmin')) {
                                GSrevealinit(revealtransform, false, true, id);
                            } else {
                                GSrevealinit(revealtransform, true, true, id);
                            }

                        }
                        const parallaxobj = AnimationRef.current.querySelector('.gs-gsap-parallax');
                        if (parallaxobj) {
                            let stparallax = ScrollTrigger.getById('gsparallax' + id);
                            if (stparallax) stparallax.kill();
                            gsap.killTweensOf(parallaxobj);
                            if (ownerDocument.body.classList.contains('gspb-bodyadmin')) {
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
            if (AnimationRef.current) {
                const gsapquick = AnimationRef.current.querySelector('.gs-gsap-wrap');
                let ownerDocument = AnimationRef.current.ownerDocument;

                if (gsapquick && canvasRef.current && model_animations) {
                    if (ownerDocument.body.classList.contains('gspb-bodyadmin')) {
                        GSmodelinit(gsapquick, false, true, selected_object, ownerDocument, id);
                    } else {
                        GSmodelinit(gsapquick, true, false, selected_object, ownerDocument, id);
                    }
                }
            }
            if (isInitialMount.current) {
                isInitialMount.current = false;

                if (AnimationRef.current) {
                    const gsapquick = AnimationRef.current.querySelector('.gs-gsap-wrap');
                    let ownerDocument = AnimationRef.current.ownerDocument;

                    if (gsapquick) {
                        if (ownerDocument.body.classList.contains('gspb-bodyadmin')) {
                            GSinit(gsapquick, false, true, ownerDocument, id);
                        } else {
                            GSinit(gsapquick, true, false, ownerDocument, id);
                        }
                    }
                    const revealtransform = AnimationRef.current.querySelector('.gs-reveal-wrap');
                    if (revealtransform) {
                        if (ownerDocument.body.classList.contains('gspb-bodyadmin')) {
                            GSrevealinit(revealtransform, false, true, id);
                        } else {
                            GSrevealinit(revealtransform, true, true, id);
                        }
                    }
                    const parallaxobj = AnimationRef.current.querySelector('.gs-gsap-parallax');
                    if (parallaxobj) {
                        if (ownerDocument.body.classList.contains('gspb-bodyadmin')) {
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
            model_animations]
        );


        useEffect(() => {

            (() => {
                const oldCanvas = AnimationRef.current.querySelector('.animationmodel');

                console.log("MODEL URL", model_url, model_animations)
                if (oldCanvas && oldCanvas.getAttribute("url")) {
                    let test_objects = [];
                    const model_url2 = oldCanvas.getAttribute("url");
                    console.log("second call", model_url2)
                    if (oldCanvas.children.length > 0) {
                        const gl = oldCanvas.children[0].getContext('webgl2');

                        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                    } else {
                        const newCanvas = document.createElement('canvas');
                        const contextWebGL = newCanvas.getContext('webgl2');
                        oldCanvas.appendChild(newCanvas);
                    }

                    const app = new Application(oldCanvas.children[0]);
                    canvasRef.current = app;

                    app.load(model_url2).then(() => {
                        console.log(app);
                        getobjects(app._scene);
                        setAttributes({ td_objects: test_objects });
                        console.log(td_objects)
                        app._scene.traverse((child) => {
                        })
                    });

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
                                childrens.push({ id: child.uuid, name: child.name, children: childrens2 });
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
                    <AnimationContainer editor={true} {...props}>
                        <InnerBlocks
                            renderAppender={() => hasChildBlocks ? <InnerBlocks.DefaultBlockAppender /> : <InnerBlocks.ButtonBlockAppender />}
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
