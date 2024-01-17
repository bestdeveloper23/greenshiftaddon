// import { Application } from 'https://unpkg.com/@splinetool/runtime@0.9.523/build/runtime.js';
import { Application } from '../splinetool/runtime.js';

var gsapscrolledfind = false;
var gsapsplitTextinit = '';

function GSmodelinit(app, current, id = '', zoomtf = false, init = false, context = {}) {
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
            if (variables && variables.length > 0) {
                variables.map((item, index) => {
                app.setVariable(item.name, item.value);
                });
            }

            if(init){
                const zoom = JSON.parse(gs_get_dataset(current, 'zoomIn'));
                const zoomM = JSON.parse(gs_get_dataset(current, 'zoomInM'));
                let isMobile = (typeof context.conditions != 'undefined') ? context.conditions.isMobile : false;
                let useMobile = (gs_get_dataset(current, 'useMobile') == 'yes') ? true : false;

                if (isMobile && useMobile) {
                    app.setZoom(zoomM);
                } else {
                    app.setZoom(zoom);
                }

            } else if(zoomtf){
                const splinezoom = JSON.parse(gs_get_dataset(current, 'splinezoom'));
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
                            if (id) {
                                scrollargs.id = 'gsinit' + id;
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
                if (id) {
                    scrollargs.id = 'gsinit' + id;
                }
                ScrollTrigger.create(scrollargs);
            }


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
                    GSmodelinit(app, current, '', false, true, context);
                });
            };

        }
    });
});

function gs_get_dataset(elem, attribute) {
    return elem.getAttribute('data-' + attribute);
};

export default GSmodelinit