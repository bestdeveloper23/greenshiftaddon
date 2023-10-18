import AnimationMainWrapper from "./wrappers/AnimationMainWrapper";
import ScrollParallaxWrapper from "./wrappers/ScrollPallaxWrapper";
import MouseMoveWrapper from "./wrappers/MouseMoveWrapper";
import RevealWrapper from "./wrappers/RevealWrapper";

const { ConditionalWrapper } = gspblib.components;

const {
    gspb_spacing_cssGen,
    gspb_responsive_cssGen,
    gspb_position_cssGen,
    gspb_csstransform_cssGen,
    gspb_background_cssGen,
    gspb_width_cssGen,
    gspb_flex_cssGen,
    gspb_Css_Final
} = gspblib.utilities;
const { gspb_cssGen } = gspblib.helpers;

export const AnimationContainer = (props) => {

    const {
        attributes: {
            id,
            inlineCssStyles,
            scroll_parallax_enabled,
            mouse_move_enabled,
            reveal_enabled,
            responsive,
            position,
            csstransform,
            spacing,
            textmask,
            backgroundBlock,
            observetype,
            customtrigger,
            text,
            blockWidth,
            triggertype,
            flexAlign,
            animation_type,
            o,
            set_from,
            stchild,
            stagger,
            batchchild,
            reveal_clip,
            reveal_dir,
            flexbox
        },
        isChange,
        clientId,
        className
    } = props;

    let containerId = `gspb_gsap-${id}`;
    let css_selector_by_user = '#' + containerId;
    let final_css;

    // Responsive classes
    final_css = gspb_responsive_cssGen(
        responsive,
        css_selector_by_user,
        final_css,
    );

    // Position
    final_css = gspb_position_cssGen(
        position,
        'body.gspb-bodyfront ' + css_selector_by_user,
        final_css,
    );

    // Flex Align
    final_css = gspb_flex_cssGen(
        flexbox,
        'body.gspb-bodyfront ' + css_selector_by_user + ' > .gs-gsap-wrap',
        final_css,
        false
    );

    // Css transform
    final_css = gspb_csstransform_cssGen(
        csstransform,
        css_selector_by_user,
        final_css,
        css_selector_by_user
    );

    // Spacing
    final_css = gspb_spacing_cssGen(
        spacing,
        css_selector_by_user,
        final_css
    );

    // blockWidth
    final_css = gspb_width_cssGen(
        blockWidth,
        `${css_selector_by_user}, body.gspb-bodyfront ${css_selector_by_user} > .gs-gsap-wrap`,
        final_css,
    );

    final_css = gspb_background_cssGen(
        backgroundBlock,
        css_selector_by_user,
        final_css
    );

    if (flexAlign) {
        final_css = gspb_cssGen(
            css_selector_by_user,
            ['align-items', 'display', 'flex-direction'],
            [flexAlign, 'flex', 'column'],
            final_css
        );
        final_css = gspb_cssGen(
            `${css_selector_by_user} .gs-gsap-wrap`,
            ['position'],
            ['relative'],
            final_css
        );
    }

    //additional styles
    if (animation_type == 'stagger_transformations') {
        if ((o == 1 || o === 0) && set_from) {
            if (stchild) {
                final_css += `body.gspb-bodyfront ${css_selector_by_user} .gs-gsap-wrap > *{visibility:hidden}`;
            } else if (stagger) {
                final_css += `body.gspb-bodyfront ${css_selector_by_user} ${stagger}{visibility:hidden}`;
            }
        }
    }
    else if (animation_type == 'batch') {
        if ((o == 1 || o === 0) && set_from) {
            if (batchchild) {
                final_css += `body.gspb-bodyfront ${css_selector_by_user} .gs-gsap-wrap > *{visibility:hidden}`;
            } else if (customtrigger) {
                final_css += `body.gspb-bodyfront ${css_selector_by_user} ${customtrigger}{visibility:hidden}`;
            }
        }
    }
    else {
        final_css += `[data-prehidden], body.gspb-bodyfront .gs-prehidden{visibility:hidden}`;
    }
    if (triggertype != 'mousefollow') {
        final_css += `${css_selector_by_user}{perspective:500px}`;
    } else {
        if (customtrigger && customtrigger != 'window') {
            final_css += `${customtrigger}{perspective:inherit !important}`;
        }
        final_css += `${css_selector_by_user} .gs-gsap-wrap{position:fixed;top:0;left:0;z-index:99999;pointer-events:none;visibility:hidden}`;
    }

    if (textmask && (text == 'words' || text == 'chars')) {
        if (text == 'chars') {
            final_css += `${css_selector_by_user} .gsap-g-word{overflow:hidden; vertical-align:top}`;
        } else if (text == 'words') {
            final_css += `${css_selector_by_user} .gsap-g-line{overflow:hidden; vertical-align:top}`;
        }
        final_css += `${css_selector_by_user} .gsap-g-char{vertical-align:text-top}`;
    }

    if ((observetype == 'drag' || observetype == 'dragtoggle') && !customtrigger) {
        final_css += `${css_selector_by_user}{cursor:drag}`;
    }

    if (reveal_enabled && reveal_clip) {
        if (reveal_dir == 'tb') {
            final_css += `${css_selector_by_user} .gs-reveal-cont{clip-path: inset(0% 0% 100% 0%)}`;
        }
        else if (reveal_dir == 'bt') {
            final_css += `${css_selector_by_user} .gs-reveal-cont{clip-path: inset(100% 0% 0% 0%)}`;
        }
        else if (reveal_dir == 'rl') {
            final_css += `${css_selector_by_user} .gs-reveal-cont{clip-path: inset(0% 0% 0% 100%)}`;
        } else {
            final_css += `${css_selector_by_user} .gs-reveal-cont{clip-path: inset(0% 100% 0% 0%)}`;
        }

    }

    // Get The Stored CSS
    gspb_Css_Final(id, final_css, props);
    let editor_css = final_css;

    // Position
    editor_css = gspb_position_cssGen(
        position,
        '#block-' + clientId,
        editor_css,
    );

    editor_css = gspb_flex_cssGen(
        flexbox,
        `${css_selector_by_user} > .gs-gsap-wrap > .block-editor-inner-blocks > .block-editor-block-list__layout`,
        editor_css
    );

    editor_css = gspb_width_cssGen(
        blockWidth,
        `${css_selector_by_user} > .gs-gsap-wrap > .block-editor-inner-blocks > .block-editor-block-list__layout`,
        editor_css,
    );

    const propsClassname = {
        'className': (className && className != 'wp-block-greenshift-blocks-animation-container') ? className : null
    };

    return (
        <div id={containerId}{...propsClassname}>
                <ConditionalWrapper
                    condition={mouse_move_enabled}
                    wrapper={(children) => (
                        <MouseMoveWrapper
                            props={props}
                            child={children}
                        />
                    )}
                >
                    <ConditionalWrapper
                        condition={scroll_parallax_enabled}
                        wrapper={(children) => (
                            <ScrollParallaxWrapper
                                props={props}
                                child={children}
                            />
                        )}
                    >
                        <ConditionalWrapper
                            condition={reveal_enabled}
                            wrapper={(children) => <RevealWrapper child={children} props={props} />}
                        >
                            <AnimationMainWrapper {...props} />
                        </ConditionalWrapper>
                    </ConditionalWrapper>
                </ConditionalWrapper>
            
            {props.editor ? (
                <style
                    dangerouslySetInnerHTML={{
                        __html: editor_css,
                    }}
                />
            ) : null}
        </div>
    );
};

export default AnimationContainer;
