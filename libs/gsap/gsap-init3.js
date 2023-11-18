import { Application } from "../splinetool/runtime.js";

var gsapscrolledfind = false;
var gsapsplitTextinit = '';

function GSmodelinit(current, context = {}) {
    let documentsearch = document;
    var scrollargs = {};

    if (gs_get_dataset(current, 'triggertype')) {
        var triggertype = gs_get_dataset(current, 'triggertype');
    } else {
        var triggertype = 'scroll';
    }
    if (current.getAttribute('data-prehidden')) {
        current.removeAttribute('data-prehidden');
    }

    var anargs = {};
    let object, camera;
    if (current && current.getAttribute('url')) {
        const model_url = current.getAttribute('url');

        if (current.children.length > 0) {
            current.children[0].remove();
        }
        const newCanvas = document.createElement('canvas');
        const contextWebGL = newCanvas.getContext('webgl2');
        current.appendChild(newCanvas);

        const app = new Application(current.children[0]);
        let selected_camera = false;
        app.load(model_url).then(() => {
            app._scene.traverse((child) => {
                if (child.type !== 'HemisphereLight') {

                    if (child.name === "Scene") {
                        object = app.findObjectById(child.uuid);
                    }
                    if (child.type == "Camera" && !selected_camera) {
                        camera = app.findObjectById(child.uuid);
                        selected_camera = true;
                    }
                    var animation = gsap.timeline();
                    let multianimations = JSON.parse(gs_get_dataset(current, "modelanimations")) ? JSON.parse(gs_get_dataset(current, "modelanimations")).slice().filter(item => item._objectkey === child.uuid) : '';
                    let multikeyframesenable = gs_get_dataset(current, 'multikeyframes');
                    let keyframesarray = [];

                    if (multianimations && multianimations.length) {
                        let children = app.findObjectById(child.uuid);

                        for (let curr = 0; curr < multianimations.length; curr++) {
                            let rx = multianimations[curr].rx ? multianimations[curr].rx / 180 * Math.PI : children.rotation.x;
                            let ry = multianimations[curr].ry ? multianimations[curr].ry / 180 * Math.PI : children.rotation.y;
                            let rz = multianimations[curr].rz ? multianimations[curr].rz / 180 * Math.PI : children.rotation.z;
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
                            gsapscrolledfind = true;
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
                            }
                            if (gs_get_dataset(current, 'triggeraction')) {
                                scrollargs.toggleActions = gs_get_dataset(current, 'triggeraction');
                            } else {
                                scrollargs.toggleActions = 'play pause resume reverse';
                            }
                            scrollargs.animation = animation;
                            scrollargs.fastScrollEnd = true;

                            if (gs_get_dataset(current, 'scrollcontainer') == 'yes') {
                                let closeX = current.closest('.gs-gsap-scrollx');
                                if (closeX) {
                                    let scrollXid = ScrollTrigger.getById("gspagescrollx" + closeX.getAttribute('id'));
                                    if (scrollXid) {
                                        let anX = scrollXid.animation.getById(closeX.getAttribute('id'));
                                        if (anX) {
                                            scrollargs.containerAnimation = anX;
                                        }
                                    }
                                }
                            };
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


            var anargs1 = {};
            let $duration = gs_get_dataset(current, 'duration');
            $duration = parseFloat($duration);
            if (!$duration) {
                $duration = 1;
            }
            anargs1.duration = $duration;

            if (gs_get_dataset(current, 'delay')) {
                anargs1.delay = parseFloat(gs_get_dataset(current, 'delay'));
            } else {
                anargs1.delay = 0;
            }

            let threelayer = false;

            let isMobile = (typeof context.conditions != 'undefined') ? context.conditions.isMobile : false;
            let useMobile = (gs_get_dataset(current, 'useMobile') == 'yes') ? true : false;

            if (isMobile && useMobile) {
                if (gs_get_dataset(current, 'xM')) {
                    anargs1.x = parseFloat(gs_get_dataset(current, 'xM'));
                }

                if (gs_get_dataset(current, 'yM')) {
                    anargs1.y = parseFloat(gs_get_dataset(current, 'yM'));
                }

                if (gs_get_dataset(current, 'zM')) {
                    anargs1.z = parseFloat(gs_get_dataset(current, 'zM'));
                }

                if (gs_get_dataset(current, 'rxM')) {
                    anargs1.rx = parseFloat(gs_get_dataset(current, 'rxM'));
                }

                if (gs_get_dataset(current, 'ryM')) {
                    anargs1.ry = parseFloat(gs_get_dataset(current, 'ryM'));
                }

                if (gs_get_dataset(current, 'rzM')) {
                    anargs1.rz = parseFloat(gs_get_dataset(current, 'rzM'));
                }

                if (gs_get_dataset(current, 'sxM')) {
                    anargs1.sx = parseFloat(gs_get_dataset(current, 'sxM'));
                }

                if (gs_get_dataset(current, 'syM')) {
                    anargs1.sy = parseFloat(gs_get_dataset(current, 'syM'));
                }

                if (gs_get_dataset(current, 'szM')) {
                    anargs1.sz = parseFloat(gs_get_dataset(current, 'szM'));
                }

            } else {
                if (gs_get_dataset(current, 'x')) {
                    anargs1.x = parseFloat(gs_get_dataset(current, 'x'));
                }

                if (gs_get_dataset(current, 'y')) {
                    anargs1.y = parseFloat(gs_get_dataset(current, 'y'));
                }

                if (gs_get_dataset(current, 'z')) {
                    anargs1.z = parseFloat(gs_get_dataset(current, 'z'));
                }

                if (gs_get_dataset(current, 'rx')) {
                    anargs1.rx = parseFloat(gs_get_dataset(current, 'rx'));
                }

                if (gs_get_dataset(current, 'ry')) {
                    anargs1.ry = parseFloat(gs_get_dataset(current, 'ry'));
                }

                if (gs_get_dataset(current, 'rz')) {
                    anargs1.rz = parseFloat(gs_get_dataset(current, 'rz'));
                }

                if (gs_get_dataset(current, 'sx')) {
                    anargs1.sx = parseFloat(gs_get_dataset(current, 'sx'));
                }

                if (gs_get_dataset(current, 'sy')) {
                    anargs1.sy = parseFloat(gs_get_dataset(current, 'sy'));
                }

                if (gs_get_dataset(current, 'sz')) {
                    anargs1.sz = parseFloat(gs_get_dataset(current, 'sz'));
                }
            }
            let easeobj = gs_get_dataset(current, 'ease');
            if (easeobj) {
                if (easeobj == 'none') {
                    anargs1.ease = "none";
                } else if (easeobj == 'custom' && gs_get_dataset(current, 'easecustom')) {
                    let easerand = 'ease' + Math.floor(Math.random() * 100);
                    CustomEase.create(easerand, gs_get_dataset(current, 'easecustom'));
                    anargs1.ease = easerand;
                }
                else {
                    let $ease = gs_get_dataset(current, 'ease').split('-');
                    anargs1.ease = $ease[0] + '.' + $ease[1];
                }
            }


            var animation = gsap.timeline();

            let values = {};
            values.position = {
                x: anargs1.x ? anargs1.x + object.position.x : object.position.x,
                y: anargs1.y ? anargs1.y + object.position.y : object.position.y,
                z: anargs1.z ? anargs1.z + object.position.z : object.position.z
            };

            values.rotation = {
                x: anargs1.rx ? anargs1.rx / 180 * Math.PI + object.rotation.x : object.rotation.x,
                y: anargs1.ry ? anargs1.ry / 180 * Math.PI + object.rotation.y : object.rotation.y,
                z: anargs1.rz ? anargs1.rz / 180 * Math.PI + object.rotation.z : object.rotation.z
            };

            values.scale = {
                x: anargs1.sx ? anargs1.sx + object.scale.x : object.scale.x,
                y: anargs1.sy ? anargs1.sy + object.scale.y : object.scale.y,
                z: anargs1.sz ? anargs1.sz + object.scale.z : object.scale.z
            }

            values.duration = anargs1.duration;
            values.delay = anargs1.delay;
            values.ease = anargs1.ease;

            //Set animation global properties

            if (gs_get_dataset(current, 'from') === "yes") {
                animation.from(object.rotation, { x: values.rotation.x, y: values.rotation.y, z: values.rotation.z, ease: values.ease, delay: values.delay, duration: values.duration }).from(object.position, { x: values.position.x, y: values.position.y, z: values.position.z, ease: values.ease, delay: values.delay, duration: values.duration }, "<").from(object.scale, { x: values.scale.x, y: values.scale.y, z: values.scale.z, ease: values.ease, delay: values.delay, duration: values.duration }, "<")
            } else {
                animation.to(object.rotation, { x: values.rotation.x, y: values.rotation.y, z: values.rotation.z, ease: values.ease, delay: values.delay, duration: values.duration }).to(object.position, { x: values.position.x, y: values.position.y, z: values.position.z, ease: values.ease, delay: values.delay, duration: values.duration }, "<").to(object.scale, { x: values.scale.x, y: values.scale.y, z: values.scale.z, ease: values.ease, delay: values.delay, duration: values.duration }, "<")
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
                        if (gs_get_dataset(current, 'videoplay') == 'yes') {
                            GSPBplayVideo($anobj);
                        }
                        animation.play();
                    }
                );
            }

            else {
                gsapscrolledfind = true;
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
                        animation.from($anobj, { autoAlpha: 0, duration: 0.2 }, 0);
                        animation.to($anobj, { autoAlpha: 0, duration: 0.2 }, 0.8);
                    }
                }
                if (gs_get_dataset(current, 'triggeraction')) {
                    scrollargs.toggleActions = gs_get_dataset(current, 'triggeraction');
                } else {
                    scrollargs.toggleActions = 'play pause resume reverse';
                }
                scrollargs.animation = animation;
                scrollargs.fastScrollEnd = true;

                if (gs_get_dataset(current, 'scrollcontainer') == 'yes') {
                    let closeX = current.closest('.gs-gsap-scrollx');
                    if (closeX) {
                        let scrollXid = ScrollTrigger.getById("gspagescrollx" + closeX.getAttribute('id'));
                        if (scrollXid) {
                            let anX = scrollXid.animation.getById(closeX.getAttribute('id'));
                            if (anX) {
                                scrollargs.containerAnimation = anX;
                            }
                        }
                    }
                };

                if (gs_get_dataset(current, 'scrollernav') == 'yes') {
                    scrollargs.scroller = current.closest('.gspb_pagenav');
                }
                if (gs_get_dataset(current, 'scroller')) {
                    scrollargs.scroller = gs_get_dataset(current, 'scroller');
                }
                ScrollTrigger.create(scrollargs);
            }

        })

    }
}

function GSinit(current, immediateLoad = false, inEditor = false, currentdocument = '', id = '', context = {}) {
    let documentsearch = (!currentdocument) ? document : currentdocument;
    var scrollargs = {};
    let $anobj;
    if (gs_get_dataset(current, 'triggertype')) {
        var triggertype = gs_get_dataset(current, 'triggertype');
    } else {
        var triggertype = 'scroll';
    }
    if (current.getAttribute('data-prehidden')) {
        current.removeAttribute('data-prehidden');
    }
    //Set basic tween
    var anargs = GSGetBasicTween(current, context);
    //Set animation object
    if (gs_get_dataset(current, 'path')) {
        let path = gs_get_dataset(current, 'path');
        let pathobj = (path.indexOf("#") == 0) ? documentsearch.querySelector(path) : path;
        anargs.motionPath = {
            path: pathobj,
            immediateRender: true
        }
        let pathalign = gs_get_dataset(current, 'path-align');
        if (pathalign) {
            let pathalignobj = (pathalign.indexOf("#") == 0) ? documentsearch.querySelector(pathalign) : documentsearch.querySelector("#" + pathalign);
            anargs.motionPath.align = pathalignobj;
        }
        anargs.motionPath.alignOrigin = [];
        if (gs_get_dataset(current, 'path-alignx') !== null && gs_get_dataset(current, 'path-alignx') !== undefined) {
            anargs.motionPath.alignOrigin[0] = parseFloat(gs_get_dataset(current, 'path-alignx'));
        } else {
            anargs.motionPath.alignOrigin[0] = 0.5;
        }
        if (gs_get_dataset(current, 'path-aligny') !== null && gs_get_dataset(current, 'path-aligny') !== undefined) {
            anargs.motionPath.alignOrigin[1] = parseFloat(gs_get_dataset(current, 'path-aligny'));
        } else {
            anargs.motionPath.alignOrigin[1] = 0.5;
        }
        if (gs_get_dataset(current, 'path-start') !== null && gs_get_dataset(current, 'path-start') !== undefined) {
            anargs.motionPath.start = parseFloat(gs_get_dataset(current, 'path-start'));
        }
        if (gs_get_dataset(current, 'path-end') !== null && gs_get_dataset(current, 'path-end') !== undefined) {
            anargs.motionPath.end = parseFloat(gs_get_dataset(current, 'path-end'));
        }
        if (gs_get_dataset(current, 'path-orient')) {
            anargs.motionPath.autoRotate = true;
        }

    }
    if (gs_get_dataset(current, 'stagger')) {
        var stagerobj = gs_get_dataset(current, 'stagger');
        if (stagerobj.indexOf(".") == 0 || stagerobj.indexOf("#") == 0) {
            if (stagerobj.indexOf(".") == 0) {
                $anobj = documentsearch.querySelectorAll(stagerobj);
            }
            if (stagerobj.indexOf("#") == 0) {
                $anobj = documentsearch.querySelector(stagerobj);
            }
        } else {
            $anobj = documentsearch.querySelectorAll('.' + stagerobj);
        }
    } else if (gs_get_dataset(current, 'text')) {
        let $texttype = gs_get_dataset(current, 'text');

        // get id of currrent
        let splittextobj = current;
        if (current.querySelectorAll('.gspb_heading').length) {
            splittextobj = current.querySelectorAll('.gspb_heading');
        }
        if (current.querySelectorAll('.gspb_text').length) {
            splittextobj = current.querySelectorAll('.gspb_text');
        }
        let splitTextgsap = new SplitText(splittextobj, { type: "chars,words,lines", wordsClass: "gsap-g-word", charsClass: "gsap-g-char", linesClass: "gsap-g-line" });
        gsapsplitTextinit = splitTextgsap;
        if ($texttype == 'chars') {
            $anobj = splitTextgsap.chars;
        } else if ($texttype == 'words') {
            $anobj = splitTextgsap.words;
        } else {
            $anobj = splitTextgsap.lines;
        }
    } else if (gs_get_dataset(current, 'svgdraw')) {
        let currentshapeObj = current;
        let customobject = '';
        if (gs_get_dataset(current, 'customobject')) {
            if (gs_get_dataset(current, 'customobject').indexOf("#") == 0 || gs_get_dataset(current, 'customobject').indexOf(".") == 0) {
                customobject = gs_get_dataset(current, 'customobject');
            } else {
                customobject = '#' + gs_get_dataset(current, 'customobject');
            }
            currentshapeObj = documentsearch.querySelector(customobject);
        }
        let svgarray = [];
        let shapes = ['path', 'line', 'polyline', 'polygon', 'rect', 'ellipse', 'circle'];
        for (let shape in shapes) {
            if (currentshapeObj != null) {
                const getShapes = currentshapeObj.querySelectorAll(shapes[shape]);
                if (getShapes.length > 0) {
                    svgarray.push(getShapes);
                }
            }
        }
        $anobj = svgarray;

        if (gs_get_dataset(current, 'from') == 'yes') {
            anargs.drawSVG = "0%";
        } else {
            anargs.drawSVG = "100%";
        }
        if (gs_get_dataset(current, 'bg')) {
            anargs.stroke = gs_get_dataset(current, 'bg');
        }

    } else if (gs_get_dataset(current, 'morphend')) {
        let morphend = gs_get_dataset(current, 'morphend');
        if (document.getElementById('editor') == null) {
            MorphSVGPlugin.convertToPath("circle, rect, ellipse, line, polygon, polyline");
        }

        if (gs_get_dataset(current, 'morphstart')) {
            let morphstart = gs_get_dataset(current, 'morphstart');
            if (morphstart.indexOf("#") != 0) {
                morphstart = '#' + morphstart;
            }
            $anobj = morphstart;
        } else {

            let svgarray = [];
            let shapes = ['path'];
            for (let shape in shapes) {
                const getShapes = current.querySelectorAll(shapes[shape]);
                if (getShapes.length > 0) {
                    svgarray.push(getShapes);
                }
            }
            $anobj = svgarray;
        }

        anargs.morphSVG = {
            shape: morphend,
            origin: (gs_get_dataset(current, 'morphorigin')) ? gs_get_dataset(current, 'morphorigin') : '50% 50%',
            type: "rotational"
        }

    } else if (gs_get_dataset(current, 'stchild')) {
        if (current.querySelector('.block-editor-block-list__layout') !== null) {
            $anobj = current.querySelector('.block-editor-block-list__layout').children;
        } else {
            $anobj = current.children;
        }
    }
    else {
        if (gs_get_dataset(current, 'customobject')) {
            if (current.getAttribute('data-customobject').indexOf("#") == 0) {
                $anobj = documentsearch.querySelector(current.getAttribute('data-customobject'));
            } else if (current.getAttribute('data-customobject').indexOf(".") == 0) {
                $anobj = documentsearch.querySelectorAll(current.getAttribute('data-customobject'));
            } else {
                $anobj = current.querySelectorAll(current.getAttribute('data-customobject'));
            }
        } else {
            $anobj = current;
        }
    }
    //Set staggers
    if (gs_get_dataset(current, 'stagger') || gs_get_dataset(current, 'text') || gs_get_dataset(current, 'svgdraw') || gs_get_dataset(current, 'stchild')) {
        anargs.stagger = {};
        if (gs_get_dataset(current, 'stdelay')) {
            anargs.stagger.each = gs_get_dataset(current, 'stdelay');
        } else {
            anargs.stagger.each = 0.2;
        }
        if (gs_get_dataset(current, 'strandom') == 'yes') {
            anargs.stagger.from = "random";
        }
    }
    // Set multi animations
    var animation = gsap.timeline();
    let multianimations = JSON.parse(gs_get_dataset(current, 'multianimations'));
    let multikeyframesenable = gs_get_dataset(current, 'multikeyframes');
    let keyframesarray = [];

    if (multianimations) {

        for (let curr = 0; curr < multianimations.length; curr++) {
            let rx = multianimations[curr].rx;
            let ry = multianimations[curr].ry;
            let r = multianimations[curr].r;
            let px = multianimations[curr].x;
            let py = multianimations[curr].y;
            let pz = multianimations[curr].z;
            let pxo = multianimations[curr].xo;
            let pyo = multianimations[curr].yo;
            let sc = multianimations[curr].s;
            let scx = multianimations[curr].sx;
            let scy = multianimations[curr].sy;
            let width = multianimations[curr].width;
            let height = multianimations[curr].height;
            let autoAlpha = multianimations[curr].o;
            let bg = multianimations[curr].bg;
            let origin = multianimations[curr].origin;
            let de = multianimations[curr].delay;
            let ea = multianimations[curr].ease;
            let du = multianimations[curr].duration;
            let customtime = multianimations[curr].time;
            let from = multianimations[curr].from;
            let additive = multianimations[curr].additive;
            let customobj = multianimations[curr].obj;

            let multiargs = {};
            if (rx || rx == 0) multiargs.rotationX = parseFloat(rx);
            if (ry || ry == 0) multiargs.rotationY = parseFloat(ry);
            if (r || r == 0) multiargs.rotation = parseFloat(r);
            if (px || px == 0) multiargs.x = parseFloat(px);
            if (py || py == 0) multiargs.y = parseFloat(py);
            if (pz || pz == 0) multiargs.z = parseFloat(pz);
            if (pxo || pxo == 0) multiargs.xPercent = parseFloat(pxo);
            if (pyo || pyo == 0) multiargs.yPercent = parseFloat(pyo);
            if (sc) multiargs.scale = parseFloat(sc);
            if (scx) multiargs.scaleX = parseFloat(scx);
            if (scy) multiargs.scaleY = parseFloat(scy);
            if (autoAlpha || autoAlpha === 0) multiargs.autoAlpha = parseInt(autoAlpha) / 100;
            if (de) multiargs.delay = parseFloat(de);
            if (bg) multiargs.backgroundColor = bg;
            if (width || width == 0) multiargs.width = width;
            if (height || height == 0) multiargs.height = height;
            if (origin) multiargs.transformOrigin = origin;
            if (du && multikeyframesenable != 'yes') multiargs.duration = parseFloat(du);
            if (customtime && multikeyframesenable != 'yes') {
                multiargs.customtime = customtime;
            } else if (!customtime && multikeyframesenable != 'yes') {
                multiargs.customtime = ">";
            };
            if (from && multikeyframesenable != 'yes') multiargs.from = from;
            if (customobj && multikeyframesenable != 'yes') multiargs.customobj = customobj;
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
            if (additive === 'yes') {
                for (let item in multiargs) {
                    if (item == 'x' || item == 'y' || item == 'z' || item == 'rotationX' || item == 'rotationY' || item == 'rotation' || item == 'scale' || item == 'scaleX' || item == 'scaleY' || item == 'height' || item == 'width' || item == 'xPercent' || item == 'yPercent') {
                        multiargs[item] = '+=' + multiargs[item];
                    }
                }
            }
            keyframesarray.push(multiargs);

        }
    }

    if (multikeyframesenable == 'yes' && keyframesarray.length > 0) {
        anargs.keyframes = keyframesarray;
    }
    //Set animation global properties
    if (gs_get_dataset(current, 'from') == 'yes') {
        animation.from($anobj, anargs);
    } else {
        animation.to($anobj, anargs);
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
                        $anobj = documentsearch.querySelectorAll(keyframesarray[curr].customobj);
                    }
                    if (keyframesarray[curr].customobj.indexOf("#") == 0) {
                        $anobj = documentsearch.querySelector(keyframesarray[curr].customobj);
                    }
                } else {
                    $anobj = documentsearch.querySelectorAll('.' + keyframesarray[curr].customobj);
                }
            }

            const { from, customtime, customobj, ...currentanimation } = keyframesarray[curr];
            if (keyframesarray[curr].z || keyframesarray[curr].rx || keyframesarray[curr].ry) {
                gsap.set($anobj, { transformPerspective: 1000 });
            }
            if (keyframesarray[curr].from == "yes") {
                animation.from($anobj, currentanimation, keyframesarray[curr].customtime);
            } else {
                animation.to($anobj, currentanimation, keyframesarray[curr].customtime);
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
    if (triggertype == 'load' || immediateLoad) {
        if (gs_get_dataset(current, 'videoplay') == 'yes') {
            GSPBplayVideo($anobj);
        }
        animation.play();
    }
    else if (triggertype == 'batch') {
        gsapscrolledfind = true;
        let $batchobj = '';
        if (gs_get_dataset(current, 'customtrigger')) {
            $batchobj = gs_get_dataset(current, 'customtrigger');
        } else {
            if (current.querySelector('.block-editor-block-list__layout') !== null) {
                $batchobj = current.querySelector('.block-editor-block-list__layout').children;
            } else {
                $batchobj = current.children;
            }
        }

        GSBatchScrollTrigger(current, anargs, $batchobj, inEditor, id, context);
    }
    else if (triggertype == 'hover') {
        animation.pause();
        animation.reverse();
        curantrigger.addEventListener("mouseenter", function (event) {
            if (gs_get_dataset(current, 'videoplay') == 'yes') {
                GSPBplayVideo($anobj);
            }
            animation.play();
        });
        curantrigger.addEventListener("mouseleave", function (event) {
            if (gs_get_dataset(current, 'videoplay') == 'yes') {
                GSPBplayVideo($anobj, 'pause');
            }
            animation.reverse();
        });
    }
    else if (triggertype == 'mousefollow') {
        gsap.set($anobj, { xPercent: -50, yPercent: -50 });
        animation.pause();
        animation.reverse();
        let $duration = gs_get_dataset(current, 'durationfollow');
        $duration = parseFloat($duration);
        if (!$duration) {
            $duration = 0.25;
        }
        let xTo = gsap.quickTo($anobj, "x", { duration: $duration, ease: "power3" }),
            yTo = gsap.quickTo($anobj, "y", { duration: $duration, ease: "power3" });
        if (curantrigger == current || curantrigger == window) {
            curantrigger = '';
        }
        let mousetrigger = curantrigger || window;
        let mousetriggerdoc = curantrigger || document.body;
        let showMouse = gsap.to($anobj, {
            autoAlpha: 1,
            paused: true
        });
        mousetrigger.addEventListener("mousemove", e => {
            xTo(e.clientX);
            yTo(e.clientY);
        });
        mousetriggerdoc.addEventListener("mouseleave", e => {
            showMouse.reverse();
        });

        mousetriggerdoc.addEventListener("mouseenter", e => {
            showMouse.play();
        });
        mousetriggerdoc.addEventListener("mousedown", function (event) {
            animation.play();
        });
        mousetriggerdoc.addEventListener("mouseup", function (event) {
            animation.reverse();
        });
    }
    else if (triggertype == 'click') {
        animation.pause();
        animation.reverse();
        curantrigger.addEventListener('click',
            function (event) {
                if (gs_get_dataset(current, 'videoplay') == 'yes') {
                    GSPBplayVideo($anobj);
                }
                animation.play();
            }
        );
    }
    else if (triggertype == 'toggleclick') {
        animation.pause();
        animation.reverse();
        curantrigger.addEventListener('click',
            function (event) {
                if (current.classList.contains('gsap-click-active')) {
                    animation.reverse();
                    if (gs_get_dataset(current, 'videoplay') == 'yes') {
                        GSPBplayVideo($anobj, 'pause');
                    }
                } else {
                    animation.play();
                    if (gs_get_dataset(current, 'videoplay') == 'yes') {
                        GSPBplayVideo($anobj);
                    }
                }
                current.classList.toggle('gsap-click-active');
                curantrigger.classList.toggle('gsap-click-obj-active');
            }
        );
    }
    else if (triggertype == 'slidechange') {
        animation.pause();
        animation.reverse();
        let slider = current.closest('.swiper');
        let currentSwiper = current.closest('.swiper-slide');
        if (slider) {
            setTimeout(function () {
                let swiper = slider.swiper;
                if (swiper) {
                    let aria = currentSwiper.getAttribute('aria-label');
                    let ariaarray = aria.split('/');
                    let arianumber = parseInt(ariaarray[0]);
                    if (arianumber == 1) {
                        animation.play();
                        if (gs_get_dataset(current, 'videoplay') == 'yes') {
                            GSPBplayVideo($anobj);
                        }
                    }
                    swiper.on('slideChangeTransitionEnd', function (swiper) {
                        if (currentSwiper != null) {
                            if (arianumber == (swiper.realIndex + 1)) {
                                animation.play();
                                if (gs_get_dataset(current, 'videoplay') == 'yes') {
                                    GSPBplayVideo($anobj);
                                }
                            } else {
                                animation.reverse();
                                if (gs_get_dataset(current, 'videoplay') == 'yes') {
                                    GSPBplayVideo($anobj, 'pause');
                                }
                            }
                        }
                    });
                }
            }, inEditor ? 1000 : 0);
        }
    }
    else if (triggertype == 'observe') {
        animation.pause();
        animation.reverse();
        let observetype = gs_get_dataset(current, 'observetype');
        let additive = gs_get_dataset(current, 'additive');
        let tolerance = gs_get_dataset(current, 'tolerance');

        argsobserve = {
            target: curantrigger,
            type: "wheel,touch,pointer",
            tolerance: tolerance || null
        };
        let anargsadditive = GSGetBasicTween(current, context);
        for (let ann in anargsadditive) {
            if (ann != 'duration') {
                anargsadditive[ann] = '+=' + anargsadditive[ann];
            }
        }
        let anargsextracting = GSGetBasicTween(current, context);
        for (let ann in anargsextracting) {
            if (ann != 'duration') {
                anargsextracting[ann] = '+=' + '-' + anargsextracting[ann];
            }
        }

        let aplay = () => {
            return additive ? gsap.to($anobj, anargsadditive) : animation.play();
        }
        let areverse = () => {
            return additive ? gsap.to($anobj, anargsextracting) : animation.reverse();
        }

        if (observetype == 'down') {
            argsobserve['onDown'] = () => aplay();
        }
        else if (observetype == 'downtoggle') {
            argsobserve['onDown'] = () => aplay();
            argsobserve['onUp'] = () => areverse();
        }
        else if (observetype == 'up') {
            argsobserve['onUp'] = () => aplay();
        }
        else if (observetype == 'uptoggle') {
            argsobserve['onUp'] = () => aplay();
            argsobserve['onDown'] = () => areverse();
        }
        else if (observetype == 'drag') {
            argsobserve['onDrag'] = () => aplay();
        }
        else if (observetype == 'dragtoggle') {
            argsobserve['onDrag'] = () => aplay();
            argsobserve['onDragEnd'] = () => areverse();
        }
        else if (observetype == 'right') {
            argsobserve['onRight'] = (self) => {
                aplay();
            };
        }
        else if (observetype == 'righttoggle') {
            argsobserve['onRight'] = () => aplay();
            argsobserve['onLeft'] = () => areverse();
        }
        else if (observetype == 'left') {
            argsobserve['onLeft'] = () => aplay();
        }
        else if (observetype == 'lefttoggle') {
            argsobserve['onLeft'] = () => aplay();
            argsobserve['onRight'] = () => areverse();
        }
        else if (observetype == 'onchange') {
            $anobj.style.cursor = 'grab';
            let addspeedX = gs_get_dataset(current, 'addspeedX') || 0.005;
            let addspeedY = gs_get_dataset(current, 'addspeedY') || 0.005;
            let maxX = gs_get_dataset(current, 'maxx') || null;
            argsobserve['onChangeX'] = (self) => {
                let speedargsX = GSGetBasicTween(current, context);
                for (let ann in speedargsX) {
                    if (ann != 'duration') {
                        speedargsX[ann] = '+=' + speedargsX[ann] * addspeedX * self.deltaX;
                    }
                }
                if (maxX) {
                    speedargsX.onComplete = () => {
                        let currentprop = gsap.getProperty($anobj, "x");
                        maxX.replace('{WIDTH}', $anobj.clientWidth);
                        maxX.replace('{WIDTH/2}', $anobj.clientWidth / 2);
                        maxX.replace('{WINDOW}', window.innerWidth);
                        if (Math.abs(currentprop) > maxX) {
                            gsap.to($anobj, { x: 0, duration: 1 });
                        }
                    }
                }
                gsap.to($anobj, speedargsX);
            };
            argsobserve['onChangeY'] = (self) => {
                let speedargsY = GSGetBasicTween(current, context);
                for (let ann in speedargsY) {
                    if (ann != 'duration') {
                        speedargsY[ann] = '+=' + speedargsY[ann] * addspeedY * self.deltaY;
                    }
                }
                gsap.to($anobj, speedargsY);
            };
        }
        ScrollTrigger.observe(argsobserve);
    }
    else {
        gsapscrolledfind = true;
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
                animation.from($anobj, { autoAlpha: 0, duration: 0.2 }, 0);
                animation.to($anobj, { autoAlpha: 0, duration: 0.2 }, 0.8);
            }
        }
        if (gs_get_dataset(current, 'triggeraction')) {
            scrollargs.toggleActions = gs_get_dataset(current, 'triggeraction');
        } else {
            scrollargs.toggleActions = 'play pause resume reverse';
        }
        scrollargs.animation = animation;
        if (gs_get_dataset(current, 'videoplay') == 'yes') {
            scrollargs.onToggle = self => self.isActive ? GSPBplayVideo($anobj) : GSPBplayVideo($anobj, 'pause');
        }
        scrollargs.fastScrollEnd = true;
        if (inEditor) {
            //scrollargs.markers = true;
            if (gs_get_dataset(current, 'pinpreview')) {
                scrollargs.pinType = "fixed";
            }
            let scrollerfind = (typeof inEditor == 'boolean') ? ".interface-interface-skeleton__content" : inEditor;
            scrollargs.scroller = scrollerfind;
        } else {
            if (gs_get_dataset(current, 'scrollcontainer') == 'yes') {
                let closeX = current.closest('.gs-gsap-scrollx');
                if (closeX) {
                    let scrollXid = ScrollTrigger.getById("gspagescrollx" + closeX.getAttribute('id'));
                    if (scrollXid) {
                        let anX = scrollXid.animation.getById(closeX.getAttribute('id'));
                        if (anX) {
                            scrollargs.containerAnimation = anX;
                        }
                    }
                }
            };
        }
        if (gs_get_dataset(current, 'scrollernav') == 'yes') {
            scrollargs.scroller = current.closest('.gspb_pagenav');
        }
        if (gs_get_dataset(current, 'scroller')) {
            scrollargs.scroller = gs_get_dataset(current, 'scroller');
        }
        if (id) {
            scrollargs.id = 'gsinit' + id;
        }
        ScrollTrigger.create(scrollargs);
    }
}

async function GSPBplayVideo(el, type = 'play') {
    let vid = el.querySelector("video");
    if (vid !== null) {
        let video = vid.querySelector('source') !== null ? vid[0] : vid;
        if (video.paused && type == 'play') {
            video.play();
        } else if (!video.paused && type == 'pause') {
            video.pause();
        }

    }
}

function GSBatchScrollTrigger(current, anargs, $batchobj, inEditor, id, context) {
    var scrollargs = {};
    let isMobile = (typeof context.conditions != 'undefined') ? context.conditions.isMobile : false;
    let useMobile = (gs_get_dataset(current, 'useMobile') == 'yes') ? true : false;
    let triggerstart = (useMobile && isMobile) ? gs_get_dataset(current, 'triggerstartM') : gs_get_dataset(current, 'triggerstart');
    let triggerend = (useMobile && isMobile) ? gs_get_dataset(current, 'triggerendM') : gs_get_dataset(current, 'triggerend');
    if (triggerstart) {
        scrollargs.start = triggerstart;
    } else {
        if (gs_get_dataset(current, 'scrollcontainer') == 'yes') {
            scrollargs.start = "left 92%";
        } else {
            scrollargs.start = "clamp(top 92%)";
        }
    }
    if (triggerend) {
        scrollargs.end = triggerend;
    }
    var batchenter = {};
    var batchenterback = {};
    var batchleave = {};
    var batchleaveback = {};
    var batchinit = {};
    for (let batchitem in anargs) {
        if (batchitem == 'x' || batchitem == 'y' || batchitem == 'xPercent' || batchitem == 'yPercent' || batchitem == 'rotation' || batchitem == 'rotationX' || batchitem == 'rotationY') {
            batchenter[batchitem] = 0;
            batchenterback[batchitem] = 0;
            batchleave[batchitem] = -anargs[batchitem];
            batchleaveback[batchitem] = anargs[batchitem];
            batchinit[batchitem] = anargs[batchitem];
        }
        if (batchitem == 'scale' || batchitem == 'scaleX' || batchitem == 'scaleY' || batchitem == 'autoAlpha') {
            batchenter[batchitem] = 1;
            batchenterback[batchitem] = 1;
            batchleave[batchitem] = anargs[batchitem];
            batchleaveback[batchitem] = anargs[batchitem];
            batchinit[batchitem] = anargs[batchitem];
        }
        if (batchitem == 'transformOrigin' || batchitem == 'duration') {
            batchinit[batchitem] = anargs[batchitem];
        }
    }
    batchenter.overwrite = batchleave.overwrite = batchenterback.overwrite = batchleaveback.overwrite = true;

    if (gs_get_dataset(current, 'batchint')) {
        var batchstagger = parseFloat(gs_get_dataset(current, 'batchint'));
    } else {
        var batchstagger = 0.15;
    }
    batchenter.stagger = { each: batchstagger };
    batchenterback.stagger = { each: batchstagger };
    if (gs_get_dataset(current, 'batchrandom') == 'yes') {
        batchenter.stagger.from = "random";
        batchenterback.stagger.from = "random";
    }

    gsap.set($batchobj, batchinit);
    scrollargs.onEnter = batch => gsap.to(batch, batchenter);
    if (!gs_get_dataset(current, 'batchonce')) {
        scrollargs.onLeave = batch => gsap.to(batch, batchleave);
        scrollargs.onEnterBack = batch => gsap.to(batch, batchenterback);
        scrollargs.onLeaveBack = batch => gsap.to(batch, batchleaveback);
    }
    if (inEditor) {
        //scrollargs.markers = true;
        scrollargs.pin = false;
        let scrollerfind = (typeof inEditor == 'boolean') ? ".interface-interface-skeleton__content" : inEditor;
        scrollargs.scroller = scrollerfind;
    }
    else {
        if (gs_get_dataset(current, 'scrollcontainer') == 'yes') {
            let closeX = current.closest('.gs-gsap-scrollx');
            if (closeX) {
                let scrollXid = ScrollTrigger.getById("gspagescrollx" + closeX.getAttribute('id'));
                if (scrollXid) {
                    let anX = scrollXid.animation.getById(closeX.getAttribute('id'));
                    if (anX) {
                        scrollargs.containerAnimation = anX;
                    }
                }
            }
        };
    }
    if (gs_get_dataset(current, 'scrollernav') == 'yes') {
        scrollargs.scroller = current.closest('.gspb_pagenav');
    }
    if (gs_get_dataset(current, 'scroller')) {
        scrollargs.scroller = gs_get_dataset(current, 'scroller');
    }
    if (id) {
        scrollargs.id = 'gsinit' + id;
    }
    ScrollTrigger.batch($batchobj, scrollargs);
}

function GSGetBasicTween(current, context = {}) {
    var anargs = {};
    let $duration = gs_get_dataset(current, 'duration');
    $duration = parseFloat($duration);
    if (!$duration) {
        $duration = 1;
    }
    anargs.duration = $duration;
    let threelayer = false;

    let isMobile = (typeof context.conditions != 'undefined') ? context.conditions.isMobile : false;
    let useMobile = (gs_get_dataset(current, 'useMobile') == 'yes') ? true : false;

    if (isMobile && useMobile) {
        if (gs_get_dataset(current, 'xM')) {
            anargs.x = parseFloat(gs_get_dataset(current, 'xM'));
        }

        if (gs_get_dataset(current, 'yM')) {
            anargs.y = parseFloat(gs_get_dataset(current, 'yM'));
        }

        if (gs_get_dataset(current, 'xoM')) {
            anargs.xPercent = parseFloat(gs_get_dataset(current, 'xoM'));
        }

        if (gs_get_dataset(current, 'yoM')) {
            anargs.yPercent = parseFloat(gs_get_dataset(current, 'yoM'));
        }

        if (gs_get_dataset(current, 'zM')) {
            anargs.z = parseFloat(gs_get_dataset(current, 'zM'));
            threelayer = true;
        }

        if (gs_get_dataset(current, 'rM')) {
            anargs.rotation = parseFloat(gs_get_dataset(current, 'rM'));
        }

        if (gs_get_dataset(current, 'rxM')) {
            anargs.rotationX = parseFloat(gs_get_dataset(current, 'rxM'));
            threelayer = true;
        }

        if (gs_get_dataset(current, 'ryM')) {
            anargs.rotationY = parseFloat(gs_get_dataset(current, 'ryM'));
            threelayer = true;
        }

        if (gs_get_dataset(current, 'sM')) {
            anargs.scale = parseFloat(gs_get_dataset(current, 'sM'));
        }

        if (gs_get_dataset(current, 'skewXM')) {
            anargs.skewX = parseInt(gs_get_dataset(current, 'skewXM'));
        }

        if (gs_get_dataset(current, 'skewYM')) {
            anargs.skewY = parseInt(gs_get_dataset(current, 'skewYM'));
        }

        if (gs_get_dataset(current, 'sxM')) {
            anargs.scaleX = parseFloat(gs_get_dataset(current, 'sxM'));
        }

        if (gs_get_dataset(current, 'syM')) {
            anargs.scaleY = parseFloat(gs_get_dataset(current, 'syM'));
        }
        if (gs_get_dataset(current, 'oM')) {
            let alpha = parseInt(gs_get_dataset(current, 'oM'));
            anargs.autoAlpha = alpha / 100;
            if (anargs.autoAlpha == 0.01) {
                anargs.autoAlpha = 0;
            }
        }
    } else {
        if (gs_get_dataset(current, 'x')) {
            anargs.x = parseFloat(gs_get_dataset(current, 'x'));
        }

        if (gs_get_dataset(current, 'y')) {
            anargs.y = parseFloat(gs_get_dataset(current, 'y'));
        }

        if (gs_get_dataset(current, 'xo')) {
            anargs.xPercent = parseFloat(gs_get_dataset(current, 'xo'));
        }

        if (gs_get_dataset(current, 'yo')) {
            anargs.yPercent = parseFloat(gs_get_dataset(current, 'yo'));
        }

        if (gs_get_dataset(current, 'z')) {
            anargs.z = parseFloat(gs_get_dataset(current, 'z'));
            threelayer = true;
        }

        if (gs_get_dataset(current, 'r')) {
            anargs.rotation = parseFloat(gs_get_dataset(current, 'r'));
        }

        if (gs_get_dataset(current, 'rx')) {
            anargs.rotationX = parseFloat(gs_get_dataset(current, 'rx'));
            threelayer = true;
        }

        if (gs_get_dataset(current, 'ry')) {
            anargs.rotationY = parseFloat(gs_get_dataset(current, 'ry'));
            threelayer = true;
        }

        if (gs_get_dataset(current, 's')) {
            anargs.scale = parseFloat(gs_get_dataset(current, 's'));
        }

        if (gs_get_dataset(current, 'skewX')) {
            anargs.skewX = parseInt(gs_get_dataset(current, 'skewX'));
        }

        if (gs_get_dataset(current, 'skewY')) {
            anargs.skewY = parseInt(gs_get_dataset(current, 'skewY'));
        }

        if (gs_get_dataset(current, 'sx')) {
            anargs.scaleX = parseFloat(gs_get_dataset(current, 'sx'));
        }

        if (gs_get_dataset(current, 'sy')) {
            anargs.scaleY = parseFloat(gs_get_dataset(current, 'sy'));
        }
        if (gs_get_dataset(current, 'o')) {
            let alpha = parseInt(gs_get_dataset(current, 'o'));
            anargs.autoAlpha = alpha / 100;
            if (anargs.autoAlpha == 0.01) {
                anargs.autoAlpha = 0;
            }
        }
    }
    if (gs_get_dataset(current, 'boxshadow')) {
        anargs.boxShadow = gs_get_dataset(current, 'boxshadow').toString();
        let colorarray = anargs.boxShadow.split('#');
        gsap.set(current, { boxShadow: "0 0 0 0 #" + colorarray[1] + "" });
    }
    if (gs_get_dataset(current, 'bg')) {
        anargs.backgroundColor = gs_get_dataset(current, 'bg');
    }
    if (gs_get_dataset(current, 'origin')) {
        anargs.transformOrigin = gs_get_dataset(current, 'origin');
    }
    if (gs_get_dataset(current, 'varwidth')) {
        let objwidth = current.clientWidth;
        if (gs_get_dataset(current, 'varwidth') == 'minuswidth') {
            objwidth = -objwidth;
        }
        anargs.x = objwidth + anargs.x;
    }
    if (gs_get_dataset(current, 'varheight')) {
        let objheight = current.clientHeight;
        if (gs_get_dataset(current, 'varheight') == 'minusheight') {
            objheight = -objheight;
        }
        anargs.y = objheight + anargs.y;
    }
    if (gs_get_dataset(current, 'winwidth')) {
        let objwidth = window.innerWidth;
        if (gs_get_dataset(current, 'winwidth') == 'minuswidth') {
            objwidth = -objwidth;
        }
        anargs.x = objwidth + anargs.x;
    }
    if (gs_get_dataset(current, 'winheight')) {
        let objheight = window.innerHeight;
        if (gs_get_dataset(current, 'winheight') == 'minusheight') {
            objheight = -objheight;
        }
        anargs.y = objheight + anargs.y;
    }
    let easeobj = gs_get_dataset(current, 'ease');
    if (easeobj) {
        if (easeobj == 'none') {
            anargs.ease = "none";
        } else if (easeobj == 'custom' && gs_get_dataset(current, 'easecustom')) {
            let easerand = 'ease' + Math.floor(Math.random() * 100);
            CustomEase.create(easerand, gs_get_dataset(current, 'easecustom'));
            anargs.ease = easerand;
        }
        else {
            let $ease = gs_get_dataset(current, 'ease').split('-');
            anargs.ease = $ease[0] + '.' + $ease[1];
        }
    }
    let var1 = gs_get_dataset(current, 'variable1');
    let var2 = gs_get_dataset(current, 'variable2');
    let var3 = gs_get_dataset(current, 'variable3');
    let var4 = gs_get_dataset(current, 'variable4');
    let var1value = gs_get_dataset(current, 'variable1value');
    let var2value = gs_get_dataset(current, 'variable2value');
    let var3value = gs_get_dataset(current, 'variable3value');
    let var4value = gs_get_dataset(current, 'variable4value');
    let attrargs = {};
    let attrenable = false;

    if (var1 && var1value) {
        if (var1.startsWith('--')) {
            anargs[var1] = var1value;
        } else {
            attrargs[var1] = var1value;
            attrenable = true;
        }
    }
    if (var2 && var2value) {
        if (var2.startsWith('--')) {
            anargs[var2] = var2value;
        } else {
            attrargs[var2] = var2value;
            attrenable = true;
        }
    }
    if (var3 && var3value) {
        if (var3.startsWith('--')) {
            anargs[var3] = var3value;
        } else {
            attrargs[var3] = var3value;
            attrenable = true;
        }
    }
    if (var4 && var4value) {
        if (var4.startsWith('--')) {
            anargs[var4] = var4value;
        } else {
            attrargs[var4] = var4value;
            attrenable = true;
        }
    }
    if (attrenable) {
        anargs.attr = attrargs;
    }

    if (threelayer) {
        gsap.set(current, { transformPerspective: 1000 });
    }
    return anargs;
}

document.addEventListener('DOMContentLoaded', function (event) {
    //the event occurred

    let mobilecheck = gsap.matchMedia();
    mobilecheck.add({
        isDesktop: '(min-width: 768px)',
        isMobile: '(max-width: 767px)',
    }, (context) => {
        let gs_wrappers = document.getElementsByClassName('gs-gsap-wrap');
        if (gs_wrappers.length > 0) {
            for (let i = 0; i < gs_wrappers.length; i++) {
                let current = gs_wrappers[i];
                const animationtype = gs_get_dataset(current, 'animationType');
                if (animationtype !== '3d_model') {
                    console.log(animationtype)
                    GSinit(current, false, false, '', '', context);
                }
                GSmodelinit(current, context);
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
                if (gs_get_dataset(current, 'animationType') !== '3d_model') {
                    GSinit(current, false, false, '', '', context);
                }
                GSmodelinit(current, context);
            };
        }
    });
});

function gs_get_dataset(elem, attribute) {
    return elem.getAttribute('data-' + attribute);
};