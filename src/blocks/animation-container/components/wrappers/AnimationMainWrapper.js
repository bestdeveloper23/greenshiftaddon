import ModelBox from "./ModelBox";

const { gspb_shadow_cssGen } = gspblib.utilities;
const AnimationMainWrapper = (props) => {

    const {
        attributes: {
            id,
            animation_type,
            shadow,
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
            skewX,
            skewY,
            width,
            height,
            background,
            origin,
            ease,
            delay,
            duration,
            repeatdelay,
            yoyo,
            loop,
            strandom,
            stchild,
            text,
            stagger,
            stdelay,
            triggertype,
            customtrigger,
            customobject,
            triggerstart,
            triggerend,
            triggerscrub,
            pinned,
            pinReparent,
            pinspace,
            triggeraction,
            triggersnap,
            path,
            path_align,
            path_orient,
            path_align_x,
            path_align_y,
            path_start,
            path_end,
            batchint,
            multiple_animation,
            set_from,
            morphend,
            morphstart,
            morphorigin,
            multikeyframes,
            batchrandom,
            batchonce,
            batchchild,
            prehide,
            variable1,
			variable2,
			variable3,
			variable4,
			variable1value,
			variable2value,
			variable3value,
			variable4value,
            xM,
            yM,
            zM,
            xoM,
            yoM,
            rM,
            rxM,
            ryM,
            sM,
            sxM,
            syM,
            oM,
            skewXM,
            skewYM,
            useMobile,
            triggerstartM,
            triggerendM,
            scroller,
            varwidth,
            varheight,
            winwidth,
            winheight,
            observetype,
            durationfollow,
            additive,
            tolerance,
            addspeedX,
            addspeedY,
            videoplay,
            scrollcontainer,
            easecustom,
            maxX,
            scrollernav,
            model_url,
            td_objects,
            selected_object,
            model_animations
        },
        children,
    } = props;
    // Shadow
    let data_shadow = "";

    if (shadow.color) {
        data_shadow = gspb_shadow_cssGen(shadow, "", data_shadow);
    }
    const final_shadow = data_shadow
        .replace("body {box-shadow:", "")
        .replace(";}", "");

    // remove unesessary values
    const final_multi_origin = multiple_animation ? JSON.parse(multiple_animation) : [];
    const modelanimations = model_animations ? JSON.parse(model_animations) : [];
    let batchtrigger = '';
    if(animation_type == 'batch'){
        batchtrigger = "batch";
    }

    return (
        <div
            id={id}
            className="gs-gsap-wrap"
            data-x={(x && Number.isFinite(x)) ? x : null}
            data-y={(y && Number.isFinite(y)) ? y : null}
            data-z={(z && Number.isFinite(z)) ? z : null}
            data-xo={(xo && Number.isFinite(xo)) ? xo : null}
            data-yo={(yo && Number.isFinite(yo)) ? yo : null}
            data-r={(r && Number.isFinite(r)) ? r : null}
            data-rx={(rx && Number.isFinite(rx)) ? rx : null}
            data-ry={(ry && Number.isFinite(ry)) ? ry : null}
            data-s={(s && Number.isFinite(s)) ? s : null}
            data-sx={(sx && Number.isFinite(sx)) ? sx : null}
            data-sy={(sy && Number.isFinite(sy)) ? sy : null}
            data-skewX={(skewX && Number.isFinite(skewX)) ? skewX : null}
            data-skewY={(skewY && Number.isFinite(skewY)) ? skewY : null}
            data-width={width ? width : null}
            data-height={height ? height : null}
            data-boxshadow={final_shadow !== '' ? final_shadow : null}
            data-o={(o || o===0) ? o : null}
            data-bg={background ? background : null}
            data-origin={origin ? origin : null}
            data-ease={ease ? ease : null}
            data-delay={(delay && Number.isFinite(delay)) ? delay : null}
            data-duration={(duration && Number.isFinite(duration)) ? duration : null}
            data-repeatdelay={repeatdelay ? 'yes' : null}
            data-yoyo={yoyo ? 'yes' : null}
            data-loop={loop ? 'yes' : null}
            data-strandom={strandom ? 'yes' : null}
            data-text={animation_type === 'text_transformations' ? text : null}
            data-svgdraw={animation_type === 'svg_line_draw' ? 'yes' : null}
            data-stagger={animation_type === 'stagger_transformations' ? stagger : null}
            data-stchild={(animation_type === 'stagger_transformations' && stchild) ? "yes" : null}
            data-triggertype={batchtrigger || triggertype}
            data-customtrigger={customtrigger ? customtrigger : null}
            data-customobject={customobject ? customobject : null}
            data-triggerstart={triggerstart ? triggerstart : null}
            data-triggerend={triggerend ? triggerend : null}
            data-triggerscrub={(triggerscrub && Number.isFinite(triggerscrub)) ? triggerscrub : null}
            data-pinned={pinned ? 'yes' : null}
            data-pinreparent={pinReparent ? 'yes' : null}
            data-pinspace={pinspace ? 'yes' : null}
            data-triggeraction={triggeraction ? triggeraction : null}
            data-triggersnap={(triggersnap && Number.isFinite(triggersnap)) ? triggersnap : null}
            data-path={(animation_type === 'svg_motion_path' && path) ? path : null}
            data-path-align={(animation_type === 'svg_motion_path' && path_align) ? path_align : null}
            data-path-orient={(animation_type === 'svg_motion_path' && path_orient) ? 'yes' : null}
            data-path-alignx={(animation_type === 'svg_motion_path' && path_align_x) ? path_align_x : null}
            data-path-aligny={(animation_type === 'svg_motion_path' && path_align_y) ? path_align_y : null}
            data-path-start={(animation_type === 'svg_motion_path' && path_start) ? path_start : null}
            data-path-end={(animation_type === 'svg_motion_path' && path_end) ? path_end : null}
            data-morphstart={(animation_type === 'svg_morph' && morphstart) ? morphstart : null}
            data-morphend={(animation_type === 'svg_morph' && morphend) ? morphend : null}
            data-morphorigin={(animation_type === 'svg_morph' && morphorigin) ? morphorigin : null}
            data-batchint={batchint}
            data-batchchild={(animation_type === 'batch' && batchchild) ? batchchild : null}
            data-batchrandom={(animation_type === 'batch' && batchrandom) ? batchrandom : null}
            data-batchonce={(animation_type === 'batch' && batchonce) ? batchonce : null}
            data-multianimations={
                (final_multi_origin.length) ? JSON.stringify(final_multi_origin) : null
            }
            data-modelanimations= { 
                (modelanimations.length) ? JSON.stringify(modelanimations) : null 
            }
            data-target={selected_object ? selected_object: null}
            data-stdelay={(stdelay && Number.isFinite(stdelay)) ? stdelay : null}
            data-from={set_from ? 'yes' : null}
            data-multikeyframes={multikeyframes ? 'yes' : null}
            data-prehidden={((((o==1 || o===0) && set_from && animation_type !=='svg_motion_path') || prehide) && !props.editor) ? 1 : null}
            data-variable1={variable1 || null}
            data-variable2={variable2 || null}
            data-variable3={variable3 || null}
            data-variable4={variable4 || null}
            data-variable1value={variable1value || null}
            data-variable2value={variable2value || null}
            data-variable3value={variable3value || null}
            data-variable4value={variable4value || null}
            data-xM={(xM && Number.isFinite(xM)) ? xM : null}
            data-yM={(yM && Number.isFinite(yM)) ? yM : null}
            data-zM={(zM && Number.isFinite(zM)) ? zM : null}
            data-xoM={(xoM && Number.isFinite(xoM)) ? xoM : null}
            data-yoM={(yoM && Number.isFinite(yoM)) ? yoM : null}
            data-rM={(rM && Number.isFinite(rM)) ? rM : null}
            data-rxM={(rxM && Number.isFinite(rxM)) ? rxM : null}
            data-ryM={(ryM && Number.isFinite(ryM)) ? ryM : null}
            data-sM={(sM && Number.isFinite(sM)) ? sM : null}
            data-sxM={(sxM && Number.isFinite(sxM)) ? sxM : null}
            data-syM={(syM && Number.isFinite(syM)) ? syM : null}
            data-skewXM={(skewXM && Number.isFinite(skewXM)) ? skewXM : null}
            data-skewYM={(skewYM && Number.isFinite(skewYM)) ? skewYM : null}
            data-oM={(oM || oM===0) ? oM : null}
            data-usemobile={useMobile ? 'yes' : null}
            data-triggerstartM={triggerstartM || null}
            data-triggerendM={triggerendM || null}
            data-scroller={scroller || null}
            data-varwidth={varwidth || null}
            data-varheight={varheight || null}
            data-winwidth={winwidth || null}
            data-winheight={winheight || null}
            data-observetype={observetype || null}
            data-additive={additive || null}
            data-durationfollow={durationfollow || null}
            data-tolerance={tolerance || null}
            data-addspeedX={addspeedX || null}
            data-addspeedY={addspeedY || null}
            data-maxx={maxX || null}
            data-easecustom={(easecustom && ease == 'custom') ? easecustom : null}
            data-videoplay={videoplay ? 'yes' : null}
            data-scrollcontainer={scrollcontainer ? 'yes' : null}
            data-scrollernav={scrollernav ? 'yes' : null}
        >
            {(model_url && animation_type === "3d_model") ? (
                <ModelBox editor={true} {...props} />
            ) :
            children}
        </div>
    );
};

export default AnimationMainWrapper;
