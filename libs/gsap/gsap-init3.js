// import { Application } from 'https://unpkg.com/@splinetool/runtime@0.9.523/build/runtime.js';
import { Application } from '../splinetool/runtime.js';

var gsapscrolledfind = false;
var gsapsplitTextinit = '';

function GSmodelinit(app, current, zoomtf = false, init = false, context = {}) {
    let documentsearch = document;
    var scrollargs = {};
    if(!app) return;
    if(!app._scene) return;
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

        let selected_camera = false;
        
            const variables = JSON.parse(gs_get_dataset(current, 'variables'));
            console.log(variables, app);
            if (variables && variables.length > 0) {
                variables.map((item, index) => {
                app.setVariable(item.name, item.value);
                });
            }

            const splinezoom = JSON.parse(gs_get_dataset(current, 'splinezoom'));
            const zoom = JSON.parse(gs_get_dataset(current, 'zoomIn'));
            if(init){
                app.setZoom(zoom);
            } else if(zoomtf){
                app.setZoom(splinezoom);
            }
            app._scene.traverse((child) => {
                if (child.type !== 'HemisphereLight') {

                    if (child.type === "Scene") {
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
            let color = multianimations[curr].color;
            let origin = multianimations[curr].origin;
            let de = multianimations[curr].delay;
            let ea = multianimations[curr].ease;
            let du = multianimations[curr].duration;
            let customtime = multianimations[curr].time;
            let from = multianimations[curr].from;
            let additive = multianimations[curr].additive;
            let customobj = multianimations[curr].obj;
            let customProps = multianimations[curr].customProps;

            let multiargs = {};
            if (rx || rx == 0) multiargs.rotationX = parseFloat(rx);
            if (ry || ry == 0) multiargs.rotationY = parseFloat(ry);
            if (r || r == 0) multiargs.rotation = parseFloat(r);
            if (px || px == 0) multiargs.x = px;
            if (py || py == 0) multiargs.y = py;
            if (pz || pz == 0) multiargs.z = pz;
            if (pxo || pxo == 0) multiargs.xPercent = parseFloat(pxo);
            if (pyo || pyo == 0) multiargs.yPercent = parseFloat(pyo);
            if (sc) multiargs.scale = parseFloat(sc);
            if (scx) multiargs.scaleX = parseFloat(scx);
            if (scy) multiargs.scaleY = parseFloat(scy);
            if (autoAlpha || autoAlpha === 0) multiargs.autoAlpha = parseInt(autoAlpha) / 100;
            if (de) multiargs.delay = parseFloat(de);
            if (bg) multiargs.backgroundColor = bg;
            if (color) multiargs.color = color;
            if (width || width == 0) multiargs.width = width;
            if (height || height == 0) multiargs.height = height;
            if (origin) multiargs.transformOrigin = origin;
            if (du && multikeyframesenable != 'yes') multiargs.duration = parseFloat(du);
            if(customProps){
                let customPropsArray = customProps;
                for (let i = 0; i < customPropsArray.length; i++) {
                    let customProp = customPropsArray[i];
                    if(customProp.name && customProp.value){
                        multiargs[customProp.name] = customProp.value;
                    }
                }
            }
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
        else if (observetype == 'click') {
            argsobserve['onClick'] = () => aplay();
        }
        else if (observetype == 'press') {
            argsobserve['onPress'] = () => aplay();
        }
        else if (observetype == 'presstoggle') {
            argsobserve['onPress'] = () => aplay();
            argsobserve['onRelease'] = () => areverse();
        }
        else if (observetype == 'hover') {
            argsobserve['onHover'] = () => aplay();
        }
        else if (observetype == 'hovertoggle') {
            argsobserve['onHover'] = () => aplay();
            argsobserve['onHoverEnd'] = () => areverse();
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
            if (gs_get_dataset(current, 'triggerscrub') && !gs_get_dataset(current, 'scrollcontainer') == 'yes') {
                scrollargs.start = "clamp(top 92%)";
            }else{
                scrollargs.start = "top 92%";
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

document.addEventListener('DOMContentLoaded', function (event) {
    //the event occurred

    let mobilecheck = gsap.matchMedia();
    mobilecheck.add({
        isDesktop: '(min-width: 768px)',
        isMobile: '(max-width: 767px)',
    }, (context) => {
        let gs_wrappers = document.getElementsByClassName('gs-gsap-wrap-3d');
        if (gs_wrappers.length > 0) {
            for (let i = 0; i < gs_wrappers.length; i++) {
                let current = gs_wrappers[i];
            
                if (current.children.length > 0) {
                    current.children[0].remove();
                }
                const newCanvas = document.createElement('canvas');
                const contextWebGL = newCanvas.getContext('webgl2');
                current.appendChild(newCanvas);

                const app = new Application(current.children[0]);
                app.load(current.getAttribute('url')).then(()=>{
                    GSmodelinit(app, current, true, context);
                });
            };

        }
    });
});

function gs_get_dataset(elem, attribute) {
    return elem.getAttribute('data-' + attribute);
};

export default GSmodelinit