import animationsTypes from "./Animationstype";

const { __ } = wp.i18n;
import { TextControl, SelectControl, ToggleControl, BaseControl, __experimentalNumberControl as NumberControl, __experimentalAlignmentMatrixControl as AlignmentMatrixControl } from '@wordpress/components';
const { BlpgeColorPicker, RadioAdvanced } = gspblib.components;

const AnimationSet = ({ id, props }) => {
    const {
        attributes: { multiple_animation, multikeyframes },
        setAttributes,
    } = props;

    const animationTarget = multiple_animation
        ? JSON.parse(multiple_animation).find((item) => item._id === id)
        : null;
    const currentAnimations = JSON.parse(multiple_animation).slice();

    const updateAnimationSetOption = (field, value) => {
        if (value !== null) {
            currentAnimations.find((v) => v._id === id)[field] = value;
            setAttributes({ multiple_animation: JSON.stringify(currentAnimations) });
        }
    };

    const resetAnimationOption = (field) => {
        delete currentAnimations.find((v) => v._id === id)[field];
        setAttributes({ multiple_animation: JSON.stringify(currentAnimations) });
    }

    return (
        <>
            <div className="gs-inspector-form-inspector">
                <div className="gspb_inspector_inputs-row__title gspb_row gspb_row--gutter-20">
                    <div class="gspb_row__col--4">
                        <BaseControl>
                            <NumberControl
                                onChange={(value) => updateAnimationSetOption("x", parseInt(value))}
                                label={__('Shift X')}
                                isDragEnabled
                                isShiftStepEnabled
                                shiftStep={10}
                                step={1}
                                value={animationTarget.x}
                            />
                        </BaseControl>
                    </div>
                    <div class="gspb_row__col--4">
                        <BaseControl>
                            <NumberControl
                                onChange={(value) => updateAnimationSetOption("y", parseInt(value))}
                                label={__('Y')}
                                isDragEnabled
                                isShiftStepEnabled
                                shiftStep={10}
                                step={1}
                                value={animationTarget.y}
                            />
                        </BaseControl>
                    </div>
                    <div class="gspb_row__col--4">
                        <BaseControl>
                            <NumberControl
                                onChange={(value) => updateAnimationSetOption("z", parseInt(value))}
                                label={__('Z')}
                                isDragEnabled
                                isShiftStepEnabled
                                shiftStep={10}
                                step={1}
                                value={animationTarget.z}
                            />
                        </BaseControl>
                    </div>
                </div>
                <div className="gspb_inspector_inputs-row__title gspb_row gspb_row--gutter-20">
                    <div class="gspb_row__col--4">
                        <BaseControl>
                            <NumberControl
                                onChange={(value) => updateAnimationSetOption("r", parseInt(value))}
                                label={__('Rotation')}
                                isDragEnabled
                                isShiftStepEnabled
                                shiftStep={10}
                                step={1}
                                value={animationTarget.r}
                            />
                        </BaseControl>
                    </div>
                    <div class="gspb_row__col--4">
                        <BaseControl>
                            <NumberControl
                                onChange={(value) => updateAnimationSetOption("rx", parseInt(value))}
                                label={__('X')}
                                isDragEnabled
                                isShiftStepEnabled
                                shiftStep={10}
                                step={1}
                                value={animationTarget.rx}
                            />
                        </BaseControl>
                    </div>
                    <div class="gspb_row__col--4">
                        <BaseControl>
                            <NumberControl
                                onChange={(value) => updateAnimationSetOption("ry", parseInt(value))}
                                label={__('Y')}
                                isDragEnabled
                                isShiftStepEnabled
                                shiftStep={10}
                                step={1}
                                value={animationTarget.ry}
                            />
                        </BaseControl>
                    </div>
                </div>
                <div className="gspb_inspector_inputs-row__title gspb_row gspb_row--gutter-20">
                    <div class="gspb_row__col--4">
                        <BaseControl>
                            <NumberControl
                                onChange={(value) => updateAnimationSetOption("s", parseFloat(value))}
                                label={__('Scale')}
                                isDragEnabled
                                isShiftStepEnabled
                                shiftStep={1}
                                min={0}
                                max={30}
                                step={0.1}
                                value={animationTarget.s}
                            />
                        </BaseControl>
                    </div>
                    <div class="gspb_row__col--4">
                        <BaseControl>
                            <NumberControl
                                onChange={(value) => updateAnimationSetOption("sx", parseFloat(value))}
                                label={__('X')}
                                isDragEnabled
                                isShiftStepEnabled
                                shiftStep={1}
                                min={0}
                                max={30}
                                step={0.1}
                                value={animationTarget.sx}
                            />
                        </BaseControl>
                    </div>
                    <div class="gspb_row__col--4">
                        <BaseControl>
                            <NumberControl
                                onChange={(value) => updateAnimationSetOption("sy", parseFloat(value))}
                                label={__('Y')}
                                isDragEnabled
                                isShiftStepEnabled
                                shiftStep={1}
                                min={0}
                                max={30}
                                step={0.1}
                                value={animationTarget.sy}
                            />
                        </BaseControl>
                    </div>
                </div>
                <BaseControl className="gs-label-row">
                    <NumberControl
                        onChange={(value) => updateAnimationSetOption("xo", parseInt(value))}
                        label={__('Translate X (%)')}
                        isDragEnabled
                        isShiftStepEnabled
                        shiftStep={10}
                        step={1}
                        value={animationTarget.xo}
                    />
                </BaseControl>
                <BaseControl className="gs-label-row">
                    <NumberControl
                        onChange={(value) => updateAnimationSetOption("yo", parseInt(value))}
                        label={__('Translate Y (%)')}
                        isDragEnabled
                        isShiftStepEnabled
                        shiftStep={10}
                        step={1}
                        value={animationTarget.yo}
                    />
                </BaseControl>
                <div className="gspb_row gspb_row--gutter-20">
                    <div className="gspb_row__col--8" style={{ padding: 0 }}>
                        {__("Width")}
                    </div>
                    <div className="gspb_row__col--4" style={{ padding: 0 }}>
                        <TextControl
                            value={animationTarget.width}
                            onChange={(value) => updateAnimationSetOption("width", value)}
                        />
                    </div>
                </div>
                <div className="gspb_row gspb_row--gutter-20">
                    <div className="gspb_row__col--8" style={{ padding: 0 }}>
                        {__("Height")}
                    </div>
                    <div className="gspb_row__col--4" style={{ padding: 0 }}>
                        <TextControl
                            value={animationTarget.height}
                            onChange={(value) => updateAnimationSetOption("height", value)}
                        />
                    </div>
                </div>
                <BaseControl className="gs-label-row">
                    <NumberControl
                        onChange={(value) => updateAnimationSetOption("o", parseInt(value))}
                        label={__("Opacity")}
                        isDragEnabled
                        isShiftStepEnabled
                        shiftStep={10}
                        min={0}
                        step={1}
                        max={100}
                        value={animationTarget.o}
                    />
                </BaseControl>
                {!multikeyframes &&
                    <BaseControl className="gs-label-row">
                        <NumberControl
                            onChange={(value) => updateAnimationSetOption("duration", parseFloat(value))}
                            label={__('Duration')}
                            isDragEnabled
                            isShiftStepEnabled
                            shiftStep={1}
                            min={0.1}
                            max={120}
                            step={0.1}
                            value={
                                animationTarget.duration
                                    ? animationTarget.duration
                                    : 1
                            }
                        />
                    </BaseControl>
                }
                <BaseControl className="gs-label-row">
                    <NumberControl
                        onChange={(value) => updateAnimationSetOption("delay", parseFloat(value))}
                        label={__('Delay')}
                        isDragEnabled
                        isShiftStepEnabled
                        shiftStep={1}
                        min={0}
                        max={20}
                        step={0.1}
                        value={
                            animationTarget.delay ? animationTarget.delay : null
                        }
                    />
                </BaseControl>
                <div className="gspb_row">
                    <div className="gspb_row__col--7" style={{ padding: 0 }}>
                        {__("Ease type")}
                    </div>
                    <div className="gspb_row__col--5" style={{ padding: 0 }}>
                        <SelectControl
                            value={
                                animationTarget.ease ? animationTarget.ease : null
                            }
                            options={animationsTypes}
                            onChange={(value) => updateAnimationSetOption("ease", value)}
                        />
                    </div>
                </div>
                <div className="gspb_row" style={{ marginBottom: 15 }}>
                    <div className="gspb_row__col--10" style={{ padding: 0 }}>
                        <span className="gspb_inspector_property-title">
                            {__("Use values as additive", 'greenshiftgsap')}
                        </span>
                    </div>
                    <div className="gspb_row__col--2" style={{ marginTop: "5px", padding: 0 }}>
                        <ToggleControl
                            checked={animationTarget.additive === "yes" ? true : false}
                            onChange={(value) => updateAnimationSetOption("additive", value == true ? "yes" : "no")} />
                    </div>
                </div>
                <hr style={{ marginBottom: 15, marginTop: 15 }} />
                <div className="gspb_row gspb_row--gutter-30">
                    <div className="gspb_row__col--6">
                        <span className="gspb_inspector_property-title">
                            {__("Background Color")}
                        </span>
                    </div>
                    <div className="gspb_row__col--6" style={{ textAlign: "right", justifyContent: "flex-end", padding: 0 }}>
                        <BlpgeColorPicker
                            color={animationTarget.bg}
                            onChange={(value) => updateAnimationSetOption("bg", value.rgb ? `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})` : value)}
                        />
                    </div>
                </div>

                <hr style={{ marginBottom: 15, marginTop: 15 }} />
                <div className="gspb_row gspb_row--gutter-30">
                    <div class="gspb_row__col--6" style={{ padding: "0 10px 0 0" }}>
                        {animationTarget.custom_origin ?
                            <TextControl
                                value={animationTarget.origin}
                                onChange={(value) => updateAnimationSetOption("origin", value)}
                                help={<OriginDocLink />}
                            />
                            :
                            <AlignmentMatrixControl
                                help={<OriginDocLink />}
                                label={__("Origin")}
                                value={animationTarget.origin}
                                onChange={(value) => updateAnimationSetOption("origin", value)}
                            />
                        }
                    </div>
                    <div class="gspb_row__col--6" style={{ padding: 0 }}>
                        <span style={{ display: "block" }} className="marginbottom10">
                            {__("Use custom transform origin")}
                        </span>
                        <ToggleControl
                            className="marginbottom10"
                            checked={animationTarget.custom_origin}
                            onChange={(value) => updateAnimationSetOption("custom_origin", value)}
                        />

                    </div>
                </div>

                <>
                    <hr style={{ marginBottom: 15, marginTop: 15 }} />
                    {!multikeyframes && (
                        <>
                            <div style={{ marginTop: 5, marginBottom: 15 }}></div>
                            <RadioAdvanced
                                value={animationTarget.from}
                                label={__('Set Direction', 'greenshiftgsap')}
                                fluid={''}
                                onChange={(value) => updateAnimationSetOption("from", value)}
                                options={[
                                    { label: 'From', value: "yes", title: __('From Value') },
                                    { label: 'To', value: "no", title: __('To Value') }
                                ]}
                            />

                            <div style={{ marginBottom: 6 }}>{__("Custom start time")}</div>
                            <TextControl
                                value={animationTarget.time ? animationTarget.time : null}
                                onChange={(value) => updateAnimationSetOption("time", value)}
                                help={<DocLink />}
                            />

                            <div style={{ marginBottom: 6 }}>{__("Custom object")}</div>
                            <TextControl
                                value={animationTarget.obj ? animationTarget.obj : null}
                                onChange={(value) => updateAnimationSetOption("obj", value)}
                                help={__(
                                    "By default, animation will be applied to current object, but you can set custom class or id of object."
                                )}
                            />
                            <hr style={{ marginBottom: 25, marginTop: 15 }} />
                        </>
                    )}
                </>
            </div>
        </>
    );
};
export default AnimationSet;

const DocLink = () => {
    return (
        <>
            <a href="https://greensock.com/docs/v3/GSAP/Timeline" target="__blank"> Documentation </a>
        </>
    )
}

const OriginDocLink = () => {
    return (
        <>
            left, right, top, bottom - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin" target="__blank"> Check documentation  </a>
        </>
    )
}