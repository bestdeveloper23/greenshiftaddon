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
 if (current && current.getAttribute('url')) {
  const model_url = current.getAttribute('url');

  if (current.children.length > 0) {
   current.children[0].remove();
  }
  const newCanvas = document.createElement('canvas');
  const contextWebGL = newCanvas.getContext('webgl2');
  current.appendChild(newCanvas);

  const app = new Application(current.children[0]);

  app.load(model_url).then(() => {
   app._scene.traverse((child) => {
    if (child.type !== 'HemisphereLight') {

     var animation = gsap.timeline();
     let multianimations = JSON.parse(gs_get_dataset(current, "modelanimations")).slice().filter(item => item._objectkey === child.uuid);
     let multikeyframesenable = gs_get_dataset(current, 'multikeyframes');
     let keyframesarray = [];

     if (multianimations && multianimations.length) {
      let children = app.findObjectById(child.uuid);

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
         animation.from(children, { autoAlpha: 0, duration: 0.2 }, 0);
         animation.to(children, { autoAlpha: 0, duration: 0.2 }, 0.8);
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
  })

 }


 // Set multi animations

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
    GSmodelinit(current, context);
   };
  }
 });
});

function gs_get_dataset(elem, attribute) {
 return elem.getAttribute('data-' + attribute);
};