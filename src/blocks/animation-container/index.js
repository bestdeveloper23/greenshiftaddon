/**
 * Animation Container Block
 */

// Import Styles
import "./editor.scss";

// Import wp dependencies
const { __ } = wp.i18n;
const { registerBlockType, createBlock } = wp.blocks;
import { InnerBlocks } from "@wordpress/block-editor";
const { select } = wp.data;
import { useEffect, useRef, useCallback, useState } from "@wordpress/element";
import { planeicon } from "./components/icons.js";

import attributes from "./components/attributes";
import attributesold from "./components/attributesold";
import AnimationContainer from "./components/AnimationContainer";
import Inspector from "./components/inspector";
import GSmodelinit from "../../../libs/gsap/gsap-init3.js";

// Import gspb depenedencies
const { gspb_setBlockId } = gspblib.utilities;
const { ExtraToolBar } = gspblib.editor;
const { BlockToolBar } = gspblib.components;

// Register Block
registerBlockType("greenshift-blocks/animation-container2", {
  title: __("3D Animation Container"),
  description: __("Adds 3D Animation Wrapper to your blocks"),
  category: "Greenshiftpro",
  keywords: [__("contaner"), __("animation"), __("effects"), __("3d")],
  icon: planeicon,
  supports: {
    reusable: true,
    anchor: true,
    align: ["wide", "full"],
  },

  providesContext: {
    "container/flexbox": "flexbox",
  },

  transforms: {
    from: [
      {
        type: "block",
        isMultiBlock: true,
        blocks: ["*"],
        __experimentalConvert(blocks) {
          // Clone the Blocks to be Grouped
          // Failing to create new block references causes the original blocks
          // to be replaced in the switchToBlockType call thereby meaning they
          // are removed both from their original location and within the
          // new group block.
          const groupInnerBlocks = blocks.map((block) => {
            return createBlock(block.name, block.attributes, block.innerBlocks);
          });

          return createBlock(
            "greenshift-blocks/3d-animation-container",
            {},
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
        rz,
        s,
        sx,
        sy,
        sz,
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
        reveal_bg,
        scroll_parallax_enabled,
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
        skewX,
        skewY,
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
        color,
        clipInit,
        clipFinal,
        customProps,
        model_url,
        selected_object,
        model_animations,
        variables,
        splineApp,
        splinezoom,
        zoomIn,
      },
      setAttributes,
    } = props;

    let hasChildBlocks =
      select("core/block-editor").getBlockOrder(clientId).length > 0;

    const AnimationRef = useRef();
    const isInitialMount = useRef(true);
    const isStillMounted = useRef();
    const canvasRef = useRef(null);
    const splineAppRef = useRef(null);
    const [isSplineLoaded, setSplineLoaded] = useState(false);
    let ctx = "";

    useEffect(() => {
      // const url = splineRuntime.url + 'libs/splinetool/runtime.js';
      // console.log(url)
      gspb_setBlockId(props);
      const loadSpline = async () => {
        if (!splineAppRef.current) {
          const splineModule = await import(
            `../../../libs/splinetool/runtime.js`
          );

          // const splineModule = await import(url);

          splineAppRef.current = splineModule.Application;
          setSplineLoaded(true);
        }
      };

      loadSpline();

    }, []);
    // function gs_get_dataset(elem, attribute) {
    //   return elem.getAttribute("data-" + attribute);
    // }

    // function GSinit2(
    //   current,
    //   immediateLoad = false,
    //   inEditor = false,
    //   currentdocument = "",
    //   id = "",
    //   context = {}
    // ) {
    //   let gsapscrolledfind = true;
    //   let documentsearch = !currentdocument ? document : currentdocument;
    //   var scrollargs = {};
    //   let $anobj;

    //   if (!canvasRef.current) return;
    //   if (!canvasRef.current._scene) return;

    //   if (gs_get_dataset(current, "triggertype")) {
    //     var triggertype = gs_get_dataset(current, "triggertype");
    //   } else {
    //     var triggertype = "scroll";
    //   }
    //   if (current.getAttribute("data-prehidden")) {
    //     current.removeAttribute("data-prehidden");
    //   }
    //   //Set basic tween

    //   //  Animation configure

    //   var anargs = {};
    //   let $duration = gs_get_dataset(current, "duration");
    //   $duration = parseFloat($duration);
    //   if (!$duration) {
    //     $duration = 1;
    //   }
    //   anargs.duration = $duration;

    //   if (gs_get_dataset(current, "delay")) {
    //     anargs.delay = parseFloat(gs_get_dataset(current, "delay"));
    //   } else {
    //     anargs.delay = 0;
    //   }

    //   let threelayer = false;

    //   let isMobile =
    //     typeof context.conditions != "undefined"
    //       ? context.conditions.isMobile
    //       : false;
    //   let useMobile =
    //     gs_get_dataset(current, "useMobile") == "yes" ? true : false;

    //   if (isMobile && useMobile) {
    //     if (gs_get_dataset(current, "xM")) {
    //       anargs.x = parseFloat(gs_get_dataset(current, "xM"));
    //     }

    //     if (gs_get_dataset(current, "yM")) {
    //       anargs.y = parseFloat(gs_get_dataset(current, "yM"));
    //     }

    //     if (gs_get_dataset(current, "zM")) {
    //       anargs.z = parseFloat(gs_get_dataset(current, "zM"));
    //     }

    //     if (gs_get_dataset(current, "rxM")) {
    //       anargs.rx = parseFloat(gs_get_dataset(current, "rxM"));
    //     }

    //     if (gs_get_dataset(current, "ryM")) {
    //       anargs.ry = parseFloat(gs_get_dataset(current, "ryM"));
    //     }

    //     if (gs_get_dataset(current, "rzM")) {
    //       anargs.rz = parseFloat(gs_get_dataset(current, "rzM"));
    //     }

    //     if (gs_get_dataset(current, "sxM")) {
    //       anargs.sx = parseFloat(gs_get_dataset(current, "sxM"));
    //     }

    //     if (gs_get_dataset(current, "syM")) {
    //       anargs.sy = parseFloat(gs_get_dataset(current, "syM"));
    //     }

    //     if (gs_get_dataset(current, "szM")) {
    //       anargs.sz = parseFloat(gs_get_dataset(current, "szM"));
    //     }
    //   } else {
    //     if (gs_get_dataset(current, "x")) {
    //       anargs.x = parseFloat(gs_get_dataset(current, "x"));
    //     }

    //     if (gs_get_dataset(current, "y")) {
    //       anargs.y = parseFloat(gs_get_dataset(current, "y"));
    //     }

    //     if (gs_get_dataset(current, "z")) {
    //       anargs.z = parseFloat(gs_get_dataset(current, "z"));
    //     }

    //     if (gs_get_dataset(current, "rx")) {
    //       anargs.rx = parseFloat(gs_get_dataset(current, "rx"));
    //     }

    //     if (gs_get_dataset(current, "ry")) {
    //       anargs.ry = parseFloat(gs_get_dataset(current, "ry"));
    //     }

    //     if (gs_get_dataset(current, "rz")) {
    //       anargs.rz = parseFloat(gs_get_dataset(current, "rz"));
    //     }

    //     if (gs_get_dataset(current, "sx")) {
    //       anargs.sx = parseFloat(gs_get_dataset(current, "sx"));
    //     }

    //     if (gs_get_dataset(current, "sy")) {
    //       anargs.sy = parseFloat(gs_get_dataset(current, "sy"));
    //     }

    //     if (gs_get_dataset(current, "sz")) {
    //       anargs.sz = parseFloat(gs_get_dataset(current, "sz"));
    //     }
    //   }
    //   let easeobj = gs_get_dataset(current, "ease");
    //   if (easeobj) {
    //     if (easeobj == "none") {
    //       anargs.ease = "none";
    //     } else if (
    //       easeobj == "custom" &&
    //       gs_get_dataset(current, "easecustom")
    //     ) {
    //       let easerand = "ease" + Math.floor(Math.random() * 100);
    //       CustomEase.create(easerand, gs_get_dataset(current, "easecustom"));
    //       anargs.ease = easerand;
    //     } else {
    //       let $ease = gs_get_dataset(current, "ease").split("-");
    //       anargs.ease = $ease[0] + "." + $ease[1];
    //     }
    //   }

    //   var animation = gsap.timeline();
    //   // Set object
    //   let object, camera;
    //   let selected_camera = false;
    //   const variables = JSON.parse(gs_get_dataset(current, "variables"));
    //   if (variables && variables.length > 0) {
    //     variables.map((item, index) => {
    //       canvasRef.current.setVariable(item.name, item.value);
    //     });
    //   }
    //   canvasRef.current._scene.traverse((children) => {
    //     if (children.type && children.type === "Scene") {
    //       gsap.killTweensOf(canvasRef.current.findObjectById(children.uuid));
    //     }
    //     if (children.type === "Scene") {
    //       object = canvasRef.current.findObjectById(children.uuid);
    //     }
    //     if (children.type == "Camera" && !selected_camera) {
    //       camera = canvasRef.current.findObjectById(children.uuid);
    //       selected_camera = true;
    //     }
    //   });

    //   let values = {};
    //   values.position = {
    //     x: anargs.x ? anargs.x + object.position.x : object.position.x,
    //     y: anargs.y ? anargs.y + object.position.y : object.position.y,
    //     z: anargs.z ? anargs.z + object.position.z : object.position.z,
    //   };

    //   values.rotation = {
    //     x: anargs.rx
    //       ? (anargs.rx / 180) * Math.PI + object.rotation.x
    //       : object.rotation.x,
    //     y: anargs.ry
    //       ? (anargs.ry / 180) * Math.PI + object.rotation.y
    //       : object.rotation.y,
    //     z: anargs.rz
    //       ? (anargs.rz / 180) * Math.PI + object.rotation.z
    //       : object.rotation.z,
    //   };

    //   values.scale = {
    //     x: anargs.sx ? anargs.sx * object.scale.x : object.scale.x,
    //     y: anargs.sy ? anargs.sy * object.scale.y : object.scale.y,
    //     z: anargs.sz ? anargs.sz * object.scale.y : object.scale.z,
    //   };

    //   values.duration = anargs.duration;
    //   values.delay = anargs.delay;
    //   values.ease = anargs.ease;

    //   //Set animation global properties

    //   if (gs_get_dataset(current, "from") === "yes") {
    //     animation
    //       .from(object.rotation, {
    //         x: values.rotation.x,
    //         y: values.rotation.y,
    //         z: values.rotation.z,
    //         ease: values.ease,
    //         delay: values.delay,
    //         duration: values.duration,
    //       })
    //       .from(
    //         object.position,
    //         {
    //           x: values.position.x,
    //           y: values.position.y,
    //           z: values.position.z,
    //           ease: values.ease,
    //           delay: values.delay,
    //           duration: values.duration,
    //         },
    //         "<"
    //       )
    //       .from(
    //         object.scale,
    //         {
    //           x: values.scale.x,
    //           y: values.scale.y,
    //           z: values.scale.z,
    //           ease: values.ease,
    //           delay: values.delay,
    //           duration: values.duration,
    //         },
    //         "<"
    //       );
    //   } else {
    //     animation
    //       .to(object.rotation, {
    //         x: values.rotation.x,
    //         y: values.rotation.y,
    //         z: values.rotation.z,
    //         ease: values.ease,
    //         delay: values.delay,
    //         duration: values.duration,
    //       })
    //       .to(
    //         object.position,
    //         {
    //           x: values.position.x,
    //           y: values.position.y,
    //           z: values.position.z,
    //           ease: values.ease,
    //           delay: values.delay,
    //           duration: values.duration,
    //         },
    //         "<"
    //       )
    //       .to(
    //         object.scale,
    //         {
    //           x: values.scale.x,
    //           y: values.scale.y,
    //           z: values.scale.z,
    //           ease: values.ease,
    //           delay: values.delay,
    //           duration: values.duration,
    //         },
    //         "<"
    //       );
    //   }

    //   if (gs_get_dataset(current, "loop") == "yes") {
    //     if (gs_get_dataset(current, "yoyo") == "yes") {
    //       animation.yoyo(true);
    //     }
    //     animation.repeat(-1);
    //     if (
    //       gs_get_dataset(current, "delay") &&
    //       gs_get_dataset(current, "repeatdelay") == "yes"
    //     ) {
    //       animation.repeatDelay(parseFloat(gs_get_dataset(current, "delay")));
    //     }
    //   }

    //   //Set trigger for animation
    //   let curantrigger = "";
    //   if (current.getAttribute("data-customtrigger")) {
    //     if (
    //       current.getAttribute("data-customtrigger").indexOf("#") == 0 ||
    //       current.getAttribute("data-customtrigger").indexOf(".") == 0
    //     ) {
    //       curantrigger = documentsearch.querySelector(
    //         current.getAttribute("data-customtrigger")
    //       );
    //     } else {
    //       curantrigger =
    //         current.getAttribute("data-customtrigger") == "window"
    //           ? window
    //           : current.querySelector(
    //               current.getAttribute("data-customtrigger")
    //             );
    //     }
    //   } else {
    //     curantrigger = current;
    //   }
    //   if (triggertype == "load" || immediateLoad) {
    //     animation.play();
    //   } else if (triggertype == "hover") {
    //     animation.pause();
    //     animation.reverse();
    //     curantrigger.addEventListener("mouseenter", function (event) {
    //       animation.play();
    //     });
    //     curantrigger.addEventListener("mouseleave", function (event) {
    //       animation.reverse();
    //     });
    //   } else if (triggertype == "click") {
    //     animation.pause();
    //     animation.reverse();
    //     curantrigger.addEventListener("click", function (event) {
    //       animation.play();
    //     });
    //   } else {
    //     gsapscrolledfind = true;
    //     scrollargs.trigger = curantrigger;
    //     let isMobile =
    //       typeof context.conditions != "undefined"
    //         ? context.conditions.isMobile
    //         : false;
    //     let useMobile =
    //       gs_get_dataset(current, "useMobile") == "yes" ? true : false;
    //     let triggerstart =
    //       useMobile && isMobile
    //         ? gs_get_dataset(current, "triggerstartM")
    //         : gs_get_dataset(current, "triggerstart");
    //     let triggerend =
    //       useMobile && isMobile
    //         ? gs_get_dataset(current, "triggerendM")
    //         : gs_get_dataset(current, "triggerend");

    //     if (triggerstart) {
    //       scrollargs.start = !isNaN(triggerstart)
    //         ? parseInt(triggerstart)
    //         : triggerstart;
    //     } else {
    //       if (gs_get_dataset(current, "scrollcontainer") == "yes") {
    //         scrollargs.start = "left 92%";
    //       } else {
    //         scrollargs.start = "clamp(top 92%)";
    //       }
    //     }
    //     if (triggerend) {
    //       scrollargs.end = !isNaN(triggerend)
    //         ? parseInt(triggerend)
    //         : triggerend;
    //     }

    //     if (gs_get_dataset(current, "triggerscrub")) {
    //       scrollargs.scrub = parseFloat(
    //         gs_get_dataset(current, "triggerscrub")
    //       );
    //     }
    //     if (gs_get_dataset(current, "triggersnap")) {
    //       scrollargs.snap = parseFloat(gs_get_dataset(current, "triggersnap"));
    //     }
    //     if (gs_get_dataset(current, "pinned")) {
    //       scrollargs.pin = true;
    //       if (gs_get_dataset(current, "pinreparent")) {
    //         scrollargs.pinReparent = true;
    //       }
    //       if (gs_get_dataset(current, "anticipatepin")) {
    //         scrollargs.anticipatePin = true;
    //       }
    //       if (gs_get_dataset(current, "pinspace")) {
    //         scrollargs.pinSpacing = false;
    //       }
    //       if (gs_get_dataset(current, "pinfade") == "yes") {
    //         animation.from($anobj, { autoAlpha: 0, duration: 0.2 }, 0);
    //         animation.to($anobj, { autoAlpha: 0, duration: 0.2 }, 0.8);
    //       }
    //     }
    //     if (gs_get_dataset(current, "triggeraction")) {
    //       scrollargs.toggleActions = gs_get_dataset(current, "triggeraction");
    //     } else {
    //       scrollargs.toggleActions = "play pause resume reverse";
    //     }
    //     scrollargs.animation = animation;
    //     scrollargs.fastScrollEnd = true;
    //     if (inEditor) {
    //       //scrollargs.markers = true;
    //       if (gs_get_dataset(current, "pinpreview")) {
    //         scrollargs.pinType = "fixed";
    //       }
    //       let scrollerfind =
    //         typeof inEditor == "boolean"
    //           ? ".interface-interface-skeleton__content"
    //           : inEditor;
    //       scrollargs.scroller = scrollerfind;
    //     } else {
    //       if (gs_get_dataset(current, "scrollcontainer") == "yes") {
    //         let closeX = current.closest(".gs-gsap-scrollx");
    //         if (closeX) {
    //           let scrollXid = ScrollTrigger.getById(
    //             "gspagescrollx" + closeX.getAttribute("id")
    //           );
    //           if (scrollXid) {
    //             let anX = scrollXid.animation.getById(
    //               closeX.getAttribute("id")
    //             );
    //             if (anX) {
    //               scrollargs.containerAnimation = anX;
    //             }
    //           }
    //         }
    //       }
    //     }
    //     if (gs_get_dataset(current, "scrollernav") == "yes") {
    //       scrollargs.scroller = current.closest(".gspb_pagenav");
    //     }
    //     if (gs_get_dataset(current, "scroller")) {
    //       scrollargs.scroller = gs_get_dataset(current, "scroller");
    //     }
    //     if (id) {
    //       scrollargs.id = "gsinit" + id;
    //     }
    //     ScrollTrigger.create(scrollargs);
    //   }
    // }

    // function GSmodelinit(current, obj = "Scene", context = {}) {
    //   let documentsearch = document;
    //   var scrollargs = {};

    //   if (!canvasRef.current) return;
    //   if (!canvasRef.current._scene) return;
    //   if (gs_get_dataset(current, "triggertype"))
    //     var triggertype = gs_get_dataset(current, "triggertype");
    //   else var triggertype = "onload";
    //   current.getAttribute("data-prehidden") &&
    //     current.removeAttribute("data-prehidden");
    //   var anargs = {};
    //   var camera = {};
    //   canvasRef.current._scene.traverse((children) => {
    //     if (children.type && children.type !== "HemisphereLight") {
    //       gsap.killTweensOf(canvasRef.current.findObjectById(children.uuid));
    //     }
    //   });

    //   var object = canvasRef.current.findObjectById(obj);
    //   const variables = JSON.parse(gs_get_dataset(current, "variables"));
    //   if (variables && variables.length > 0) {
    //     variables.map((item, index) => {
    //       canvasRef.current.setVariable(item.name, item.value);
    //     });
    //   }

    //   canvasRef.current._scene.traverse((child) => {
    //     if (child.type !== "HemisphereLight") {
    //       var animation = gsap.timeline();
    //       let multianimations =
    //         JSON.parse(gs_get_dataset(current, "modelanimations")) &&
    //         JSON.parse(gs_get_dataset(current, "modelanimations"))
    //           .slice()
    //           .filter((item) => item._objectkey === child.uuid);
    //       let multikeyframesenable = gs_get_dataset(current, "multikeyframes");
    //       let keyframesarray = [];

    //       if (multianimations && multianimations.length > 0) {
    //         var children = canvasRef.current.findObjectById(child.uuid);
    //         for (let curr = 0; curr < multianimations.length; curr++) {
    //           let rx = multianimations[curr].rx
    //             ? (multianimations[curr].rx / 180) * Math.PI +
    //               children.rotation.x
    //             : children.rotation.x;
    //           let ry = multianimations[curr].ry
    //             ? (multianimations[curr].ry / 180) * Math.PI +
    //               children.rotation.y
    //             : children.rotation.y;
    //           let rz = multianimations[curr].rz
    //             ? (multianimations[curr].rz / 180) * Math.PI +
    //               children.rotation.z
    //             : children.rotation.z;
    //           let px = multianimations[curr].x
    //             ? multianimations[curr].x + children.position.x
    //             : children.position.x;
    //           let py = multianimations[curr].y
    //             ? multianimations[curr].y + children.position.y
    //             : children.position.y;
    //           let pz = multianimations[curr].z
    //             ? multianimations[curr].z + children.position.z
    //             : children.position.z;
    //           let scx = multianimations[curr].sx
    //             ? multianimations[curr].sx + children.scale.x
    //             : children.scale.x;
    //           let scy = multianimations[curr].sy
    //             ? multianimations[curr].sy + children.scale.y
    //             : children.scale.y;
    //           let scz = multianimations[curr].sz
    //             ? multianimations[curr].sz + children.scale.z
    //             : children.scale.z;
    //           let de = multianimations[curr].delay;
    //           let ea = multianimations[curr].ease;
    //           let du = multianimations[curr].duration
    //             ? multianimations[curr].duration
    //             : 1.0;
    //           let customtime = multianimations[curr].time;
    //           let from = multianimations[curr].from;
    //           let customobj = multianimations[curr].obj;

    //           let multiargs = {};

    //           multiargs.rotation = {
    //             x: parseFloat(rx),
    //             y: parseFloat(ry),
    //             z: parseFloat(rz),
    //           };
    //           multiargs.position = {
    //             x: parseFloat(px),
    //             y: parseFloat(py),
    //             z: parseFloat(pz),
    //           };
    //           multiargs.scale = {
    //             x: parseFloat(scx),
    //             y: parseFloat(scy),
    //             z: parseFloat(scz),
    //           };

    //           multiargs.delay = parseFloat(de);
    //           multiargs.duration = parseFloat(du);
    //           multiargs.customtime = customtime;

    //           multiargs.from = from;
    //           multiargs.customobj = customobj;

    //           if (ea) {
    //             if (ea == "none") {
    //               multiargs.ease = "none";
    //             } else if (
    //               ea == "power1-out" &&
    //               multikeyframesenable == "yes"
    //             ) {
    //             } else if (ea) {
    //               let $ease = ea.split("-");
    //               multiargs.ease = $ease[0] + "." + $ease[1];
    //             }
    //           }

    //           keyframesarray.push(multiargs);
    //         }

    //         if (multikeyframesenable == "yes" && keyframesarray.length > 0) {
    //           anargs.keyframes = keyframesarray;
    //         }
    //         //Set animation global properties
    //         if (gs_get_dataset(current, "from") == "yes") {
    //           animation.from(children, anargs);
    //         } else {
    //           animation.to(children, anargs);
    //         }
    //         if (gs_get_dataset(current, "delay")) {
    //           animation.delay(parseFloat(gs_get_dataset(current, "delay")));
    //         }
    //         if (gs_get_dataset(current, "loop") == "yes") {
    //           if (gs_get_dataset(current, "yoyo") == "yes") {
    //             animation.yoyo(true);
    //           }
    //           animation.repeat(-1);
    //           if (
    //             gs_get_dataset(current, "delay") &&
    //             gs_get_dataset(current, "repeatdelay") == "yes"
    //           ) {
    //             animation.repeatDelay(
    //               parseFloat(gs_get_dataset(current, "delay"))
    //             );
    //           }
    //         }
    //         if (multikeyframesenable != "yes" && keyframesarray.length > 0) {
    //           for (let curr = 0; curr < keyframesarray.length; curr++) {
    //             if (keyframesarray[curr].customobj) {
    //               if (
    //                 keyframesarray[curr].customobj.indexOf(".") == 0 ||
    //                 keyframesarray[curr].customobj.indexOf("#") == 0
    //               ) {
    //                 if (keyframesarray[curr].customobj.indexOf(".") == 0) {
    //                   children = documentsearch.querySelectorAll(
    //                     keyframesarray[curr].customobj
    //                   );
    //                 }
    //                 if (keyframesarray[curr].customobj.indexOf("#") == 0) {
    //                   children = documentsearch.querySelector(
    //                     keyframesarray[curr].customobj
    //                   );
    //                 }
    //               } else {
    //                 children = documentsearch.querySelectorAll(
    //                   "." + keyframesarray[curr].customobj
    //                 );
    //               }
    //             }

    //             const { from, customtime, customobj, ...currentanimation } =
    //               keyframesarray[curr];
    //             let values = keyframesarray[curr];
    //             if (keyframesarray[curr].from == "yes") {
    //               animation
    //                 .from(children.rotation, {
    //                   x: values.rotation.x,
    //                   y: values.rotation.y,
    //                   z: values.rotation.z,
    //                   delay: values.delay,
    //                   duration: values.duration,
    //                 })
    //                 .from(
    //                   children.position,
    //                   {
    //                     x: values.position.x,
    //                     y: values.position.y,
    //                     z: values.position.z,
    //                     delay: values.delay,
    //                     duration: values.duration,
    //                   },
    //                   "<"
    //                 )
    //                 .from(
    //                   children.scale,
    //                   {
    //                     x: values.scale.x,
    //                     y: values.scale.y,
    //                     z: values.scale.z,
    //                     delay: values.delay,
    //                     duration: values.duration,
    //                   },
    //                   "<"
    //                 );
    //             } else {
    //               animation
    //                 .to(children.rotation, {
    //                   x: values.rotation.x,
    //                   y: values.rotation.y,
    //                   z: values.rotation.z,
    //                   delay: values.delay,
    //                   duration: values.duration,
    //                 })
    //                 .to(
    //                   children.position,
    //                   {
    //                     x: values.position.x,
    //                     y: values.position.y,
    //                     z: values.position.z,
    //                     delay: values.delay,
    //                     duration: values.duration,
    //                   },
    //                   "<"
    //                 )
    //                 .to(
    //                   children.scale,
    //                   {
    //                     x: values.scale.x,
    //                     y: values.scale.y,
    //                     z: values.scale.z,
    //                     delay: values.delay,
    //                     duration: values.duration,
    //                   },
    //                   "<"
    //                 );
    //             }
    //           }
    //         }
    //         //Set trigger for animation
    //         let curantrigger = "";
    //         if (current.getAttribute("data-customtrigger")) {
    //           if (
    //             current.getAttribute("data-customtrigger").indexOf("#") == 0 ||
    //             current.getAttribute("data-customtrigger").indexOf(".") == 0
    //           ) {
    //             curantrigger = documentsearch.querySelector(
    //               current.getAttribute("data-customtrigger")
    //             );
    //           } else {
    //             curantrigger =
    //               current.getAttribute("data-customtrigger") == "window"
    //                 ? window
    //                 : current.querySelector(
    //                     current.getAttribute("data-customtrigger")
    //                   );
    //           }
    //         } else {
    //           curantrigger = current;
    //         }
    //         if (triggertype == "load") {
    //           animation.play();
    //         } else if (triggertype == "hover") {
    //           animation.pause();
    //           animation.reverse();
    //           curantrigger.addEventListener("mouseenter", function (event) {
    //             animation.play();
    //           });
    //           curantrigger.addEventListener("mouseleave", function (event) {
    //             animation.reverse();
    //           });
    //         } else if (triggertype == "click") {
    //           animation.pause();
    //           animation.reverse();
    //           curantrigger.addEventListener("click", function (event) {
    //             animation.play();
    //           });
    //         } else {
    //           animation.play();
    //         }
    //       }
    //     }
    //   });
    // }

    const debounce = useCallback(
      _.debounce((_atts) => {
        isStillMounted.current = true;
        if (isStillMounted.current && AnimationRef.current) {
          let ownerDocument = AnimationRef.current.ownerDocument;
          const gsapquick = AnimationRef.current.querySelector(".gs-gsap-wrap-3d");
          if (ctx) ctx.revert();
          const animationType =  gs_get_dataset(gsapquick, "animationType");
          ctx = gsap.context(() => {
            if (gsapquick) {
              if (
                canvasRef.current.findObjectById(
                  gs_get_dataset(gsapquick, "target")
                ) &&
                canvasRef.current.findObjectById(
                  gs_get_dataset(gsapquick, "target")
                ).type !== "HemisphereLight"
              ) {
                gsap.killTweensOf(
                  canvasRef.current.findObjectById(
                    gs_get_dataset(gsapquick, "target")
                  )
                );
              }
              // if (gsapquick.children.length) {
              //   gsapquick.children[0].remove();
              //   const newCanvas = document.createElement("canvas");
              //   const contextWebGL = newCanvas.getContext("webgl2");
              //   gsapquick.appendChild(newCanvas);
              // } else {
              //   const newCanvas = document.createElement("canvas");
              //   const contextWebGL = newCanvas.getContext("webgl2");
              //   gsapquick.appendChild(newCanvas);
              // }

              // const app = new splineAppRef.current(gsapquick.children[0]);
              GSmodelinit(canvasRef.current, gsapquick);
            }
            // const revealtransform = AnimationRef.current.querySelector(".gs-reveal-wrap");
            // if (revealtransform) {
            //   let revealobj = revealtransform.querySelector(".gs-reveal-block");
            //   let streveal = ScrollTrigger.getById("gsreveal" + id);
            //   if (streveal) streveal.kill();
            //   gsap.killTweensOf(revealobj);
            //   if (ownerDocument.body.classList.contains("gspb-bodyadmin")) {
            //     GSrevealinit(revealtransform, false, true, id);
            //   } else {
            //     GSrevealinit(revealtransform, true, true, id);
            //   }
            // }
            // const parallaxobj =
            //   AnimationRef.current.querySelector(".gs-gsap-parallax");
            // if (parallaxobj) {
            //   let stparallax = ScrollTrigger.getById("gsparallax" + id);
            //   if (stparallax) stparallax.kill();
            //   gsap.killTweensOf(parallaxobj);
            //   if (ownerDocument.body.classList.contains("gspb-bodyadmin")) {
            //     GSparallaxinit(parallaxobj, true, id);
            //   }
            // }
            // const mousetransform =
            //   AnimationRef.current.querySelector(".gs-prlx-mouse");
            // if (mousetransform) {
            //   gsap.killTweensOf(mousetransform);
            //   GSmousemoveinit(mousetransform);
            // }
          });
        }
        return () => {
          isStillMounted.current = false;
        };
      }, 600),
      []
    );

    useEffect(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
        if (AnimationRef.current) {
          const gsapquick = AnimationRef.current.querySelector(".gs-gsap-wrap-3d");
          console.log(gsapquick);
          let ownerDocument = AnimationRef.current.ownerDocument;
          if (gsapquick.children.length) {
            gsapquick.children[0].remove();
            const newCanvas = document.createElement("canvas");
            const contextWebGL = newCanvas.getContext("webgl2");
            gsapquick.appendChild(newCanvas);
          } else {
            const newCanvas = document.createElement("canvas");
            const contextWebGL = newCanvas.getContext("webgl2");
            gsapquick.appendChild(newCanvas);
          }
        
          if(splineAppRef.current){
            const app = new splineAppRef.current(gsapquick.children[0]);
            GSmodelinit(app, gsapquick);  
          }
        
        }
      } else {
        debounce(attributes);
      }
    }, [
      animation_type,
      x,
      y,
      z,
      xo,
      yo,
      r,
      rx,
      ry,
      rz,
      s,
      sx,
      sy,
      sz,
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
      reveal_bg,
      scroll_parallax_enabled,
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
      multikeyframes,
      skewX,
      skewY,
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
      varheight,
      videoplay,
      easecustom,
      maxX,
      reveal_clip,
      reveal_ease,
      clipInit,
      clipFinal,
      color,
      customProps,
      model_animations,
      selected_object,
      variables,
      splinezoom,
      zoomIn
    ]);
    useEffect(() => {
      (() => {
        if (isSplineLoaded) {
          const oldCanvas = AnimationRef.current.querySelector(".gs-gsap-wrap-3d");

          if (oldCanvas && oldCanvas.getAttribute("url")) {
            let test_objects = [];
            const model_url2 = oldCanvas.getAttribute("url");

            if (oldCanvas.children.length) {
              oldCanvas.children[0].remove();
              const newCanvas = document.createElement("canvas");
              const contextWebGL = newCanvas.getContext("webgl2");
              oldCanvas.appendChild(newCanvas);
            } else {
              const newCanvas = document.createElement("canvas");
              const contextWebGL = newCanvas.getContext("webgl2");
              oldCanvas.appendChild(newCanvas);
            }

            const app = new splineAppRef.current(oldCanvas.children[0]);
            canvasRef.current = app;
            canvasRef.current.stop();
            app
              .load(model_url2)
              .then(() => {
                const marker = `gsap_id-${id}`;
                window[marker] = app;
                const variablesObject = app.getVariables();
                console.log(variablesObject);
                const variablesArray = [];
                if (
                  variablesObject !== "undefined" &&
                  variablesObject !== null
                ) {
                  Object.keys(variablesObject).map((key) => {
                    variablesArray.push({
                      name: key,
                      value: variablesObject[key],
                    });
                  });
                }
                setAttributes({ variables: variablesArray });
                setAttributes({ splineApp: marker });

                getobjects(app._scene);
                setAttributes({ td_objects: test_objects });

                let gsapscrolledfind = true;
                let mobilecheck = gsap.matchMedia();
                mobilecheck.add(
                  {
                    isDesktop: "(min-width: 768px)",
                    isMobile: "(max-width: 767px)",
                  },
                  (context) => {
                    let gs_wrappers =
                      document.getElementsByClassName("gs-gsap-wrap-3d");
                    if (gs_wrappers.length > 0) {
                      for (let i = 0; i < gs_wrappers.length; i++) {
                        let current = gs_wrappers[i];
                        // GSinit(current, false, false, "", "", context);
                        GSmodelinit(app, current, true, context);
                      }

                      if (gsapscrolledfind) {
                        //Compatibility with lazy load script
                        document.addEventListener("lazyloaded", function (e) {
                          ScrollTrigger.refresh();
                        });
                      }
                    }
                  }
                );
              })
              .catch((error) => {
                // Handle the error state
                console.error("Error occurred while loading the model:", error);
                setAttributes({ model_url: "" });
                oldCanvas.children[0].remove();
                // Set the error state or perform any necessary actions
              });
            // treeselect contructor----------------------------------------------//
            function getobjects(object) {
              if (object.children.length === 0) {
                return {
                  id: object.uuid,
                  name: object.name ? object.name : "invisible",
                };
              } else if (object.children.length === 1) {
                return getobjects(object.children[0]);
              } else if (object.children.length > 1) {
                const childrens = [];
                object.children.map((child) => {
                  const childrens2 = [];
                  let children;
                  children = getobjects(child);
                  childrens2.push(children);
                  if (child.children.length <= 1) childrens.push(children);
                  else
                    childrens.push({
                      id: child.uuid,
                      name: child.name,
                      children: childrens2,
                    });

                  // }
                });
                test_objects[0] = {
                  id: object.uuid,
                  name: object.name,
                  children: childrens,
                };

                return {
                  id: object.uuid,
                  name: object.name,
                  children: childrens,
                };
              }
            }
          }
        }
      })();
    }, [model_url, isSplineLoaded]);
    return (
      <>
        {hasChildBlocks && (
          <ExtraToolBar editOnly={true} inner={true} gray={true} {...props} />
        )}
        <Inspector animationref={AnimationRef.current} {...props} />
        <BlockToolBar {...props} />
        <div className="gs-animation" ref={AnimationRef}>
          <AnimationContainer editor={true} {...props}>
            <InnerBlocks
              renderAppender={() =>
                hasChildBlocks ? (
                  <InnerBlocks.DefaultBlockAppender />
                ) : (
                  <InnerBlocks.ButtonBlockAppender />
                )
              }
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
  deprecated: [
    {
      attributes: attributes,
      supports: {
        reusable: true,
        anchor: true,
        align: ["wide", "full"],
      },
      save(props) {
        return (
          <AnimationContainer editor={false} {...props}>
            <InnerBlocks.Content />
          </AnimationContainer>
        );
      },
    },
  ],
});
