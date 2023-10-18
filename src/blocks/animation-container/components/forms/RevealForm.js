const { __ } = wp.i18n;
import { SelectControl, ToggleControl, BaseControl, __experimentalNumberControl as NumberControl } from '@wordpress/components';
const { GsbpFormLabel} = gspblib.components;
import animationsTypes from './Animationstype';
const {
    Background,
} = gspblib.collections;

const RevealForm = (props) => {
    const {
        attributes: {
            reveal_enabled,
            reveal_dir,
            reveal_speed,
            reveal_delay,
            reveal_bg,
            reveal_clip,
            reveal_ease
        },
        setAttributes,
    } = props;

    return (
        <div className="gs-inspector-form-inspector">
            <>
                <div className="gspb_row">
                    <div className="gspb_row__col--10">
                        <span className="gspb_inspector_property-title">
                            {__("Enable reveal", 'greenshiftgsap')}
                        </span>
                    </div>
                    <div className="gspb_row__col--2" style={{ marginTop: "5px" }}>
                        <ToggleControl
                            checked={reveal_enabled}
                            onChange={(value) => setAttributes({ reveal_enabled: value })}
                        />
                    </div>
                </div>
                <div className="gspb_row">
                    <div className="gspb_row__col--10">
                        <span className="gspb_inspector_property-title">
                            {__("Use Clip Reveal", 'greenshiftgsap')}
                        </span>
                    </div>
                    <div className="gspb_row__col--2" style={{ marginTop: "5px" }}>
                        <ToggleControl
                            checked={reveal_clip}
                            onChange={(value) => setAttributes({ reveal_clip: value })}
                        />
                    </div>
                </div>
            </>
            {reveal_enabled &&
                <>
                    <div className="gspb_row">

                        <div className="gspb_row__col--6">
                            <GsbpFormLabel
                                title={__("Direction: ")}
                                clearFun={() => setAttributes({ reveal_dir: null })}
                            />
                        </div>
                        <div className="gspb_row__col--6">
                            <SelectControl
                                value={reveal_dir}
                                options={[
                                    { label: __("Left to Right"), value: "lr" },
                                    { label: __("Right to Left"), value: "rl" },
                                    { label: __("Top to Bottom"), value: "tb" },
                                    { label: __("Bottom to top"), value: "bt" },
                                ]}
                                onChange={(value) => setAttributes({ reveal_dir: value })}
                            />
                        </div>
                    </div>

                    <BaseControl className="gs-label-row">
                        <NumberControl
                            onChange={(value) => setAttributes({ reveal_speed: parseFloat(value) })}
                            label={__('Speed')}
                            isDragEnabled
                            isShiftStepEnabled
                            shiftStep={1}
                            min={0.1}
                            max={100}
                            step={0.1}
                            value={reveal_speed}
                        />
                    </BaseControl>

                    <BaseControl className="gs-label-row">
                        <NumberControl
                            onChange={(value) => setAttributes({ reveal_delay: parseFloat(value) })}
                            label={__('Delay')}
                            isDragEnabled
                            isShiftStepEnabled
                            shiftStep={1}
                            min={0.1}
                            max={10}
                            step={0.1}
                            value={reveal_delay}
                        />
                    </BaseControl>
                    <div className="gspb_row">

                        <div className="gspb_row__col--7" style={{ padding: 0 }}>
                            <GsbpFormLabel
                                title={__("Ease type")}
                                clearFun={() => setAttributes({ reveal_ease: null })}
                            />
                        </div>
                        <div className="gspb_row__col--5" style={{ padding: 0 }}>
                            <SelectControl
                                value={reveal_ease}
                                options={animationsTypes}
                                onChange={(value) => setAttributes({ reveal_ease: value })}
                            />
                        </div>
                    </div>
                    {!reveal_clip &&
                        <Background
                            attributeName="backgroundReveal"
                            exclude={['video', 'opacity', 'hover', 'mixblend', 'parallax']}
                            {...props}
                        />
                    }
                </>
            }
        </div>
    );
};

export default RevealForm;
