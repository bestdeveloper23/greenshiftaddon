import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, ToggleControl, BaseControl, __experimentalNumberControl as NumberControl, Button, __experimentalAlignmentMatrixControl as AlignmentMatrixControl, Dropdown, TextareaControl } from '@wordpress/components';

const { Shadow } = gspblib.collections;
const { GsbpFormLabel, OptionsGroupSet, StylesforBlock, BlpgeColorPicker, RadioAdvanced } = gspblib.components;
import { rtransform, ttransform, svgtransform, svgdraw, staggertransform, svgmorph, batchicon, threedmodel } from "../icons.js";

const CommonForm = (props) => {
    const {
        attributes: {
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
            background,
            origin,
            custom_origin,
            strandom,
            stchild,
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
            id,
            batchint,
            batchchild,
            batchrandom,
            customtrigger,
            batchonce,
            textmask,
            skewX,
            skewY,
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
            varwidth,
            varheight,
            winwidth,
            winheight,
            videoplay,
            model_url
        },
        setAttributes,
    } = props;

    function animationReset() {
        setAttributes(
            {
                x: '',
                y: '',
                z: '',
                xo: '',
                yo: '',
                s: '',
                sx: '',
                sy: '',
                r: '',
                rx: '',
                ry: '',
                skewX: '',
                skewY: '',
                background: '',
                origin: '',
                shadow: '',
                o: null,
                xM: '',
                yM: '',
                zM: '',
                xoM: '',
                yoM: '',
                sM: '',
                sxM: '',
                syM: '',
                rM: '',
                rxM: '',
                ryM: '',
                skewXM: '',
                skewYM: '',
                oM: null,
            }
        )
    }

    function animationEditorReset(animationref) {
        const gsapquick = animationref.querySelector('.gs-gsap-wrap');
        if (gsapquick) {
            let stgsap = ScrollTrigger.getById('gsinit' + id);
            if (stgsap) stgsap.kill();
            gsap.killTweensOf(gsapquick);
            if (typeof gsapsplitTextinit != 'undefined' && gsapsplitTextinit) {
                gsapsplitTextinit.revert();
            }
            gsapquick.style = '';
        }
    }

    function animationEditorInit(animationref) {
        const gsapquick = animationref.querySelector('.gs-gsap-wrap');
        if (gsapquick) {
            let ownerDocument = animationref.ownerDocument;
            let stgsap = ScrollTrigger.getById('gsinit' + id);
            if (stgsap) stgsap.kill();
            gsap.killTweensOf(gsapquick);
            if (typeof gsapsplitTextinit != 'undefined' && gsapsplitTextinit) {
                gsapsplitTextinit.revert();
            }
            if (ownerDocument.body.classList.contains('gspb-bodyadmin')) {
                GSinit(gsapquick, true, true, ownerDocument, id);
            } else {
                GSinit(gsapquick, true, false, ownerDocument, id);
            }

        }
    }

    let mobileOptions = (
        <div
            className="gspb_inspector_advancedOptionsWrraper gspb_inspector"
            style={{ minWidth: 220 }}
        >
            <div className="gspb_row gspb_row--no-padding-col">
                <div className="gspb_row__col--9">
                    <span className="gspb_inspector_property-title">
                        {__("Mobile Options", 'greenshiftgsap')}
                    </span>
                </div>
                <div className="gspb_row__col--2" style={{ marginTop: "5px" }}>
                    <ToggleControl
                        checked={useMobile}
                        onChange={(value) => setAttributes({ useMobile: value })}
                    />
                </div>
            </div>
            <div className="gspb_inspector_inputs-row__title gspb_row gspb_row--gutter-20">
                <div class="gspb_row__col--3">
                    <BaseControl>
                        <NumberControl
                            onChange={(value) => setAttributes({ xM: parseInt(value) })}
                            label={__('Shift X', 'greenshiftgsap')}
                            isDragEnabled
                            isShiftStepEnabled
                            shiftStep={10}
                            step={1}
                            value={xM}
                        />
                    </BaseControl>
                </div>
                <div class="gspb_row__col--4">
                    <BaseControl>
                        <NumberControl
                            onChange={(value) => setAttributes({ yM: parseInt(value) })}
                            label={__('Y')}
                            isDragEnabled
                            isShiftStepEnabled
                            shiftStep={10}
                            step={1}
                            value={yM}
                        />
                    </BaseControl>
                </div>
                <div class="gspb_row__col--4">
                    <BaseControl>
                        <NumberControl
                            onChange={(value) => setAttributes({ zM: parseInt(value) })}
                            label={__('Z')}
                            isDragEnabled
                            isShiftStepEnabled
                            shiftStep={10}
                            step={1}
                            value={zM}
                        />
                    </BaseControl>
                </div>
            </div>
            <div className="gspb_inspector_inputs-row__title gspb_row gspb_row--gutter-20">
                <div class="gspb_row__col--4">
                    <BaseControl>
                        <NumberControl
                            onChange={(value) => setAttributes({ rM: parseInt(value) })}
                            label={__('Rotation', 'greenshiftgsap')}
                            isDragEnabled
                            isShiftStepEnabled
                            shiftStep={10}
                            step={1}
                            value={rM}
                        />
                    </BaseControl>
                </div>
                <div class="gspb_row__col--4">
                    <BaseControl>
                        <NumberControl
                            onChange={(value) => setAttributes({ rxM: parseInt(value) })}
                            label={__('X')}
                            isDragEnabled
                            isShiftStepEnabled
                            shiftStep={10}
                            step={1}
                            value={rxM}
                        />
                    </BaseControl>
                </div>
                <div class="gspb_row__col--4">
                    <BaseControl>
                        <NumberControl
                            onChange={(value) => setAttributes({ ryM: parseInt(value) })}
                            label={__('Y')}
                            isDragEnabled
                            isShiftStepEnabled
                            shiftStep={10}
                            step={1}
                            value={ryM}
                        />
                    </BaseControl>
                </div>
            </div>
            <div className="gspb_inspector_inputs-row__title gspb_row gspb_row--gutter-20">
                <div class="gspb_row__col--4">
                    <BaseControl>
                        <NumberControl
                            onChange={(value) => setAttributes({ sM: parseFloat(value) })}
                            label={__('Scale', 'greenshiftgsap')}
                            isDragEnabled
                            isShiftStepEnabled
                            shiftStep={1}
                            min={0}
                            max={30}
                            step={0.1}
                            value={sM}
                        />
                    </BaseControl>
                </div>
                <div class="gspb_row__col--4">
                    <BaseControl>
                        <NumberControl
                            onChange={(value) => setAttributes({ sxM: parseFloat(value) })}
                            label={__('X')}
                            isDragEnabled
                            isShiftStepEnabled
                            shiftStep={1}
                            min={0}
                            max={30}
                            step={0.1}
                            value={sxM}
                        />
                    </BaseControl>
                </div>
                <div class="gspb_row__col--4">
                    <BaseControl>
                        <NumberControl
                            onChange={(value) => setAttributes({ syM: parseFloat(value) })}
                            label={__('Y')}
                            isDragEnabled
                            isShiftStepEnabled
                            shiftStep={1}
                            min={0}
                            max={30}
                            step={0.1}
                            value={syM}
                        />
                    </BaseControl>
                </div>
            </div>
            <BaseControl className="gs-label-row">
                <NumberControl
                    onChange={(value) => setAttributes({ oM: parseInt(value) })}
                    label={__("Opacity", 'greenshiftgsap')}
                    isDragEnabled
                    isShiftStepEnabled
                    shiftStep={10}
                    min={0}
                    step={1}
                    max={100}
                    value={oM}
                />
            </BaseControl>
            <BaseControl className="gs-label-row">
                <NumberControl
                    onChange={(value) => setAttributes({ xoM: parseInt(value) })}
                    label={__('X (%)', 'greenshiftgsap')}
                    isDragEnabled
                    isShiftStepEnabled
                    shiftStep={10}
                    step={1}
                    value={xoM}
                />
            </BaseControl>
            <BaseControl className="gs-label-row">
                <NumberControl
                    onChange={(value) => setAttributes({ yoM: parseInt(value) })}
                    label={__('Y (%)', 'greenshiftgsap')}
                    isDragEnabled
                    isShiftStepEnabled
                    shiftStep={10}
                    step={1}
                    value={yoM}
                />
            </BaseControl>
            <BaseControl className="gs-label-row">
                <NumberControl
                    onChange={(value) => setAttributes({ skewXM: parseInt(value) })}
                    label={__('Skew X', 'greenshift')}
                    isDragEnabled
                    isShiftStepEnabled
                    shiftStep={10}
                    step={1}
                    value={skewXM}
                />
            </BaseControl>
            <BaseControl className="gs-label-row">
                <NumberControl
                    onChange={(value) => setAttributes({ skewYM: parseInt(value) })}
                    label={__('Skew Y', 'greenshift')}
                    isDragEnabled
                    isShiftStepEnabled
                    shiftStep={10}
                    step={1}
                    value={skewYM}
                />
            </BaseControl>
            <>
                <span className="gspb_inspector_property-title">
                    {__("Trigger start", 'greenshiftgsap')}
                </span>
                <TextControl
                    value={triggerstartM}
                    onChange={(value) => setAttributes({ triggerstartM: value })}
                />
            </>
            <>
                <span className="gspb_inspector_property-title">
                    {__("Trigger end")}
                </span>
                <TextControl
                    value={triggerendM}
                    onChange={(value) => setAttributes({ triggerendM: value })}
                />
            </>
            <div style={{ marginTop: 10 }}>{__('Mobile options currently work only on frontend side', 'greenshiftgsap')}</div>
        </div>
    );

    let varwidthopen = (
        <div style={{ minWidth: 220 }}>
            <span className="gspb_inspector_property-title">
                {__('Attach width of element', 'greenshift')}{' '}
            </span>
            <RadioAdvanced
                value={varwidth}
                label={''}
                fluid={'yes'}
                onChange={(value) => {
                    setAttributes({
                        varwidth: value,
                    });
                }}
                options={[
                    { label: 'No', value: null, title: __('No', 'greenshift') },
                    { label: '+ Width', value: 'width', title: __('Attach Width', 'greenshift') },
                    { label: '- Width', value: 'minuswidth', title: __('Attach Negative width', 'greenshift') },
                ]}
            />
            <span className="gspb_inspector_property-title">
                {__('Attach width of window', 'greenshift')}{' '}
            </span>
            <RadioAdvanced
                value={winwidth}
                label={''}
                fluid={'yes'}
                onChange={(value) => {
                    setAttributes({
                        winwidth: value,
                    });
                }}
                options={[
                    { label: 'No', value: null, title: __('No', 'greenshift') },
                    { label: '+ Width', value: 'width', title: __('Attach Width', 'greenshift') },
                    { label: '- Width', value: 'minuswidth', title: __('Attach Negative width', 'greenshift') },
                ]}
            />
        </div>
    );

    let varheightopen = (
        <div style={{ minWidth: 220 }}>
            <span className="gspb_inspector_property-title">
                {__('Attach height of element', 'greenshift')}{' '}
            </span>
            <RadioAdvanced
                value={varheight}
                label={''}
                fluid={'yes'}
                onChange={(value) => {
                    setAttributes({
                        varheight: value,
                    });
                }}
                options={[
                    { label: 'No', value: null, title: __('No', 'greenshift') },
                    { label: '+ Height', value: 'height', title: __('Attach Height', 'greenshift') },
                    { label: '- Height', value: 'minusheight', title: __('Attach Negative Height', 'greenshift') },
                ]}
            />
            <span className="gspb_inspector_property-title">
                {__('Attach height of window', 'greenshift')}{' '}
            </span>
            <RadioAdvanced
                value={winheight}
                label={''}
                fluid={'yes'}
                onChange={(value) => {
                    setAttributes({
                        winheight: value,
                    });
                }}
                options={[
                    { label: 'No', value: null, title: __('No', 'greenshift') },
                    { label: '+ Height', value: 'height', title: __('Attach Height', 'greenshift') },
                    { label: '- Height', value: 'minusheight', title: __('Attach Negative Height', 'greenshift') },
                ]}
            />
        </div>
    );

    return (
        <div className="gs-inspector-form-inspector">
            <div>{__('Select type', 'greenshiftgsap')}</div>
            <StylesforBlock columns={3} value={animation_type} onChange={(val) => {setAttributes({ animation_type: val })}}
                options={[
                    { value: 'regular', svg: rtransform, label: __('Transform', 'greenshiftgsap') },
                    { value: 'stagger_transformations', svg: staggertransform, label: __('Stagger', 'greenshiftgsap') },
                    { value: 'text_transformations', svg: ttransform, label: __('Inner Text', 'greenshiftgsap') },
                    { value: 'svg_motion_path', svg: svgtransform, label: __('SVG Path', 'greenshiftgsap') },
                    { value: 'svg_line_draw', svg: svgdraw, label: __('SVG draw', 'greenshiftgsap') },
                    { value: 'svg_morph', svg: svgmorph, label: __('Svg morph', 'greenshiftgsap') },
                    { value: 'batch', svg: batchicon, label: __('BatchScroll', 'greenshiftgsap') },
                    { value: '3d_model', svg: threedmodel, label: __('3d model', 'greenshiftgsap') },
                ]}
            />
            <hr style={{ marginBottom: 18, marginTop: 10 }} />
            {animation_type === "3d_model" && (
                <>
                    <PanelBody
                        initialOpen={true}
                        title={__('Spline model loader')}
                    >
                        <div className={`${props.attributes.loading ? " gspb_loader_line_label" : ""}`}>
                            <TextControl
                                label={__('File URL')}
                                value={model_url}
                                onChange={(value) => {
                                    setAttributes({
                                        model_url: value
                                    });
                                }}
                            />
                        </div>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) =>
                                    setAttributes({ model_url: media.url })
                                }
                                allowedTypes={['glb', 'gltf']}
                                value={model_url}
                                render={({ open }) => (
                                    <Button isSecondary onClick={open}>{__("Upload spline file")}</Button>
                                )}
                            />
                        </MediaUploadCheck>
                        {/* <div style={{ marginTop: 10, marginBottom: 10 }}>{__("Fallback image")}</div> */}
                        {/* <MediaUpload
                            onSelect={(imgObject) => {
                                setAttributes({
                                    imageid: imgObject.id,
                                    imageurl: imgObject.url
                                });
                            }

                            }
                            type="image"
                            render={({ open }) => (
                                <button
                                    className="gspb_inspector_btn gspb_inspector_btn--medium"
                                    onClick={open}
                                >
                                    {__('Choose an image')}
                                    <i className="rhicon rhi-image-regular" />
                                </button>
                            )}
                        />
                        <div
                            className="gspb_inspector_img_preview"
                            style={{ display: 'block' }}
                        >
                            <img
                                src={
                                    imageurl
                                        ? imageurl
                                        : null
                                }
                            />
                        </div>
                        {imageurl &&
                            <button
                                className="gspb_inspector_btn gspb_inspector_btn--small"
                                onClick={() => {
                                    setAttributes({
                                        imageid: null,
                                        imageurl: null
                                    });
                                }
                                }
                            >
                                {__('Clear')}
                            </button>
                        }
                        <ToggleControl
                            label={__('Load only on iteraction')}
                            checked={td_load_iter}
                            onChange={(value) => {
                                setAttributes({ td_load_iter: value });
                            }}
                        />
                        <div style={{ marginTop: 15 }}></div>
                        <DynamicMetaToolbar attributeName="model_url"  {...props} /> */}
                    </PanelBody>
                </>
            )}
            {animation_type === "svg_motion_path" && (
                <>
                    <GsbpFormLabel
                        title={__("Set path", 'greenshiftgsap')}
                        clearFun={() => setAttributes({ path: null })}
                    />
                    <TextareaControl
                        value={path}
                        help={__("can be ID (place here id with #) or svg coordinates.", 'greenshiftgsap')}
                        onChange={(value) => setAttributes({ path: value })}
                    />
                    <span className="gspb_inspector_property-title">
                        {__("Align ID", 'greenshiftgsap')}
                    </span>
                    <TextControl
                        value={path_align}
                        onChange={(value) => setAttributes({ path_align: value })}
                        help={__(
                            "By default, element is alighned by itself, but you can set id of path of another element to align.", 'greenshiftgsap'
                        )}
                    />
                    <div className="gspb_row">
                        <div className="gspb_row__col--10">
                            <span className="gspb_inspector_property-title">
                                {__("Orient along path", 'greenshiftgsap')}
                            </span>
                        </div>
                        <div className="gspb_row__col--2" style={{ marginTop: "5px" }}>
                            <ToggleControl
                                checked={path_orient}
                                onChange={(value) => setAttributes({ path_orient: value })}
                            />
                        </div>
                    </div>
                    <BaseControl className="gs-label-row">
                        <NumberControl
                            onChange={(value) => setAttributes({ path_align_x: parseFloat(value) })}
                            label={__('Align origin point X', 'greenshiftgsap')}
                            isDragEnabled
                            isShiftStepEnabled
                            shiftStep={1}
                            min={0}
                            step={0.1}
                            max={1}
                            value={path_align_x}
                        />
                    </BaseControl>
                    <BaseControl className="gs-label-row">
                        <NumberControl
                            onChange={(value) => setAttributes({ path_align_y: parseFloat(value) })}
                            label={__('Align origin point Y', 'greenshiftgsap')}
                            isDragEnabled
                            isShiftStepEnabled
                            shiftStep={1}
                            min={0}
                            step={0.1}
                            max={1}
                            value={path_align_y}
                        />
                    </BaseControl>
                    <BaseControl className="gs-label-row">
                        <NumberControl
                            onChange={(value) => setAttributes({ path_start: parseFloat(value) })}
                            label={__('Start point', 'greenshiftgsap')}
                            isDragEnabled
                            isShiftStepEnabled
                            shiftStep={1}
                            min={0}
                            step={0.1}
                            max={50}
                            value={path_start}
                        />
                    </BaseControl>
                    <BaseControl className="gs-label-row">
                        <NumberControl
                            onChange={(value) => setAttributes({ path_end: parseFloat(value) })}
                            label={__('End point', 'greenshiftgsap')}
                            isDragEnabled
                            isShiftStepEnabled
                            shiftStep={1}
                            min={0}
                            step={0.1}
                            max={50}
                            value={path_end}
                        />
                    </BaseControl>
                    <hr style={{ marginBottom: 20, marginTop: 30 }} />
                </>
            )}
            {animation_type === "svg_morph" && (
                <>
                    <GsbpFormLabel
                        title={__("Set SVG path of end morph", 'greenshiftgsap')}
                        clearFun={() => setAttributes({ morphend: null })}
                    />
                    <TextareaControl
                        value={morphend}
                        help={__("can be ID (place here id with #) or svg path coordinates.", 'greenshiftgsap')}
                        onChange={(value) => setAttributes({ morphend: value })}
                    />
                    <GsbpFormLabel
                        title={__("Set ID of start shape", 'greenshiftgsap')}
                        clearFun={() => setAttributes({ morphstart: null })}
                    />
                    <TextareaControl
                        value={morphstart}
                        help={__("By default, all svg which you place inside container will be used as start shape. In this field you can set ID of path which you want to use as start point", 'greenshiftgsap')}
                        onChange={(value) => setAttributes({ morphstart: value })}
                    />
                    <span className="gspb_inspector_property-title">
                        {__("Custom origin")}
                    </span>
                    <TextControl
                        value={morphorigin}
                        onChange={() => setAttributes({ morphorigin: value })}
                        help={__(
                            "Default is: 50% 50%"
                        )}
                    />
                    <hr style={{ marginBottom: 20, marginTop: 20 }} />
                </>
            )}
            {animation_type === "svg_line_draw" && (
                <>
                    <div>{__('Please, add any svg with paths inside Container and enjoy animation', 'greenshiftgsap')}</div>
                    <hr style={{ marginBottom: 20, marginTop: 20 }} />
                </>
            )}
            <>
                <div className="gspb_inspector_inputs-row__title gspb_row gspb_row--gutter-20 gspb_right_abs_btn">
                    <div className="gspb_row__col--4">
                        <div className="gspb_small_btn_abs">
                            <Dropdown
                                position="bottom left"
                                renderToggle={({ onToggle }) => (
                                    <div>
                                        <button
                                            className="components-button components-icon-button components-toolbar__control"
                                            style={{ color: (varwidth) ? "#2184f9" : '#111111' }}
                                            onClick={onToggle}
                                        >
                                            <i
                                                class="rhicon rhi-cog"
                                                style={{
                                                    margin: 'auto',
                                                    fontSize: '14px',
                                                }}
                                            />
                                        </button>
                                    </div>
                                )}
                                renderContent={({ onToggle }) =>
                                    varwidthopen
                                }
                            /></div>
                        <BaseControl>
                            <NumberControl
                                onChange={(value) => setAttributes({ x: parseInt(value) })}
                                label={__('Shift X', 'greenshiftgsap')}
                                isDragEnabled
                                isShiftStepEnabled
                                shiftStep={10}
                                step={1}
                                value={x}
                            />
                        </BaseControl>
                    </div>
                    <div class="gspb_row__col--4">
                        <div className="gspb_small_btn_abs">
                            <Dropdown
                                position="bottom left"
                                renderToggle={({ onToggle }) => (
                                    <div>
                                        <button
                                            className="components-button components-icon-button components-toolbar__control"
                                            style={{ color: (varheight) ? "#2184f9" : '#111111' }}
                                            onClick={onToggle}
                                        >
                                            <i
                                                class="rhicon rhi-cog"
                                                style={{
                                                    margin: 'auto',
                                                    fontSize: '14px',
                                                }}
                                            />
                                        </button>
                                    </div>
                                )}
                                renderContent={({ onToggle }) =>
                                    varheightopen
                                }
                            /></div>
                        <BaseControl>
                            <NumberControl
                                onChange={(value) => setAttributes({ y: parseInt(value) })}
                                label={__('Y')}
                                isDragEnabled
                                isShiftStepEnabled
                                shiftStep={10}
                                step={1}
                                value={y}
                            />
                        </BaseControl>
                    </div>
                    <div class="gspb_row__col--4">
                        <BaseControl>
                            <NumberControl
                                onChange={(value) => setAttributes({ z: parseInt(value) })}
                                label={__('Z')}
                                isDragEnabled
                                isShiftStepEnabled
                                shiftStep={10}
                                step={1}
                                value={z}
                            />
                        </BaseControl>
                    </div>
                </div>
                <div className="gspb_inspector_inputs-row__title gspb_row gspb_row--gutter-20">
                    <div class="gspb_row__col--4">
                        <BaseControl>
                            <NumberControl
                                onChange={(value) => setAttributes({ r: parseInt(value) })}
                                label={__('Rotation', 'greenshiftgsap')}
                                isDragEnabled
                                isShiftStepEnabled
                                shiftStep={10}
                                step={1}
                                value={r}
                            />
                        </BaseControl>
                    </div>
                    <div class="gspb_row__col--4">
                        <BaseControl>
                            <NumberControl
                                onChange={(value) => setAttributes({ rx: parseInt(value) })}
                                label={__('X')}
                                isDragEnabled
                                isShiftStepEnabled
                                shiftStep={10}
                                step={1}
                                value={rx}
                            />
                        </BaseControl>
                    </div>
                    <div class="gspb_row__col--4">
                        <BaseControl>
                            <NumberControl
                                onChange={(value) => setAttributes({ ry: parseInt(value) })}
                                label={__('Y')}
                                isDragEnabled
                                isShiftStepEnabled
                                shiftStep={10}
                                step={1}
                                value={ry}
                            />
                        </BaseControl>
                    </div>
                </div>
                <div className="gspb_inspector_inputs-row__title gspb_row gspb_row--gutter-20">
                    <div class="gspb_row__col--4">
                        <BaseControl>
                            <NumberControl
                                onChange={(value) => setAttributes({ s: parseFloat(value) })}
                                label={__('Scale', 'greenshiftgsap')}
                                isDragEnabled
                                isShiftStepEnabled
                                shiftStep={1}
                                min={0}
                                max={1000}
                                step={0.1}
                                value={s}
                            />
                        </BaseControl>
                    </div>
                    <div class="gspb_row__col--4">
                        <BaseControl>
                            <NumberControl
                                onChange={(value) => setAttributes({ sx: parseFloat(value) })}
                                label={__('X')}
                                isDragEnabled
                                isShiftStepEnabled
                                shiftStep={1}
                                min={0}
                                max={1000}
                                step={0.1}
                                value={sx}
                            />
                        </BaseControl>
                    </div>
                    <div class="gspb_row__col--4">
                        <BaseControl>
                            <NumberControl
                                onChange={(value) => setAttributes({ sy: parseFloat(value) })}
                                label={__('Y')}
                                isDragEnabled
                                isShiftStepEnabled
                                shiftStep={1}
                                min={0}
                                max={1000}
                                step={0.1}
                                value={sy}
                            />
                        </BaseControl>
                    </div>
                </div>
                <BaseControl className="gs-label-row">
                    <NumberControl
                        onChange={(value) => setAttributes({ o: parseInt(value) })}
                        label={__("Opacity", 'greenshiftgsap')}
                        isDragEnabled
                        isShiftStepEnabled
                        shiftStep={10}
                        min={0}
                        step={1}
                        max={100}
                        value={o}
                    />
                </BaseControl>
                <BaseControl className="gs-label-row">
                    <NumberControl
                        onChange={(value) => setAttributes({ xo: parseInt(value) })}
                        label={__('Translate X (%)', 'greenshiftgsap')}
                        isDragEnabled
                        isShiftStepEnabled
                        shiftStep={10}
                        step={1}
                        value={xo}
                    />
                </BaseControl>
                <BaseControl className="gs-label-row">
                    <NumberControl
                        onChange={(value) => setAttributes({ yo: parseInt(value) })}
                        label={__('Translate Y (%)', 'greenshiftgsap')}
                        isDragEnabled
                        isShiftStepEnabled
                        shiftStep={10}
                        step={1}
                        value={yo}
                    />
                </BaseControl>
                <BaseControl className="gs-label-row">
                    <NumberControl
                        onChange={(value) => setAttributes({ skewX: parseInt(value) })}
                        label={__('Skew X', 'greenshift')}
                        isDragEnabled
                        isShiftStepEnabled
                        shiftStep={10}
                        step={1}
                        value={skewX}
                    />
                </BaseControl>
                <BaseControl className="gs-label-row">
                    <NumberControl
                        onChange={(value) => setAttributes({ skewY: parseInt(value) })}
                        label={__('Skew Y', 'greenshift')}
                        isDragEnabled
                        isShiftStepEnabled
                        shiftStep={10}
                        step={1}
                        value={skewY}
                    />
                </BaseControl>
                <div
                    className="gspb_row gspb_row--no-padding-col"
                    style={{ marginTop: '10px', width: '100%' }}
                >
                    <div
                        className="gspb_row__col--10"
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <div>{__('Use separate for mobile', 'greenshiftgsap')}</div>
                    </div>
                    <div className="gspb_row__col--2">
                        <Dropdown
                            position="bottom left"
                            renderToggle={({ onToggle }) => (
                                <div>
                                    <button
                                        className="components-button components-icon-button components-toolbar__control"
                                        style={{ color: (useMobile) ? "#2184f9" : '#111111' }}
                                        onClick={onToggle}
                                    >
                                        <i
                                            class="rhicon rhi-cog"
                                            style={{
                                                margin: 'auto',
                                                fontSize: '20px',
                                            }}
                                        />
                                    </button>
                                </div>
                            )}
                            renderContent={({ onToggle }) =>
                                mobileOptions
                            }
                        />
                    </div>
                </div>

                {animation_type === "text_transformations" && (
                    <>
                        <hr style={{ marginBottom: 20, marginTop: 20 }} />
                        <div className="gspb_inspector_inputs-row__title gspb_row gspb_row--gutter-20" style={{ alignItems: "flex-start" }}>
                            <div class="gspb_row__col--8">
                                <span>{__("Break type for text")}</span>
                            </div>
                            <div class="gspb_row__col--4">
                                <SelectControl
                                    value={text}
                                    options={[
                                        { label: __("Lines", 'greenshiftgsap'), value: "lines" },
                                        { label: __("Chars", 'greenshiftgsap'), value: "chars" },
                                        { label: __("Words", 'greenshiftgsap'), value: "words" },
                                    ]}
                                    onChange={(value) => setAttributes({ text: value })}
                                />
                            </div>
                        </div>
                        <BaseControl className="gs-label-row">
                            <NumberControl
                                onChange={(value) => setAttributes({ stdelay: parseFloat(value) })}
                                label={__('Stagger delay', 'greenshiftgsap')}
                                isDragEnabled
                                isShiftStepEnabled
                                shiftStep={10}
                                min={0}
                                max={10}
                                step={0.01}
                                value={stdelay}
                            />
                        </BaseControl>
                        <div className="gspb_inspector_inputs-row__title gspb_row gspb_row--gutter-20">
                            <div className="gspb_row__col--10">
                                <span className="gspb_inspector_property-title">
                                    {__("Enable random order", 'greenshiftgsap')}
                                </span>
                            </div>
                            <div className="gspb_row__col--2" style={{ marginTop: "5px" }}>
                                <ToggleControl
                                    checked={strandom}
                                    onChange={(value) => setAttributes({ strandom: value })}
                                />
                            </div>
                        </div>
                        {(text == 'chars' || text == 'words') &&
                            <div className="gspb_inspector_inputs-row__title gspb_row gspb_row--gutter-20">
                                <div className="gspb_row__col--10">
                                    <span className="gspb_inspector_property-title">
                                        {__("Enable text mask", 'greenshiftgsap')}
                                    </span>
                                </div>
                                <div className="gspb_row__col--2" style={{ marginTop: "5px" }}>
                                    <ToggleControl
                                        checked={textmask}
                                        onChange={(value) => setAttributes({ textmask: value })}
                                    />
                                </div>
                            </div>
                        }

                    </>
                )}
                {animation_type === "stagger_transformations" && (
                    <>
                        <OptionsGroupSet>
                            <div className="gspb_row__col--10">
                                <span className="gspb_inspector_property-title">
                                    {__("Enable stagger to child items", 'greenshiftgsap')}
                                </span>
                            </div>
                            <div className="gspb_row__col--2" style={{ marginTop: "5px" }}>
                                <ToggleControl
                                    checked={stchild}
                                    onChange={(value) => setAttributes({ stchild: value })}
                                />
                            </div>
                            {!stchild && (
                                <>
                                    <GsbpFormLabel
                                        title={__("Or Set Stagger class", 'greenshiftgsap')}
                                        clearFun={() => setAttributes({ stagger: null })}
                                    />
                                    <TextControl
                                        value={stagger}
                                        onChange={(value) => setAttributes({ stagger: value })}
                                        help={__(
                                            "You can set special class to trigger animation on all elements with this class with some delay between each item."
                                        )}
                                    />
                                </>
                            )}
                            <div className="gspb_row__col--10">
                                <span className="gspb_inspector_property-title">
                                    {__("Enable random order", 'greenshiftgsap')}
                                </span>
                            </div>
                            <div className="gspb_row__col--2" style={{ marginTop: "5px" }}>
                                <ToggleControl
                                    checked={strandom}
                                    onChange={(value) => setAttributes({ strandom: value })}
                                />
                            </div>
                            <BaseControl className="gs-label-row">
                                <NumberControl
                                    onChange={(value) => setAttributes({ stdelay: parseFloat(value) })}
                                    label={__('Stagger delay', 'greenshiftgsap')}
                                    isDragEnabled
                                    isShiftStepEnabled
                                    shiftStep={10}
                                    min={0}
                                    max={10}
                                    step={0.01}
                                    value={stdelay}
                                />
                            </BaseControl>
                        </OptionsGroupSet>
                    </>
                )}
                {animation_type === "batch" && (
                    <>
                        <OptionsGroupSet>
                            <div className="gspb_row__col--10">
                                <span className="gspb_inspector_property-title">
                                    {__("Enable batch to child items", 'greenshiftgsap')}
                                </span>
                            </div>
                            <div className="gspb_row__col--2" style={{ marginTop: "5px" }}>
                                <ToggleControl
                                    checked={batchchild}
                                    onChange={(value) => setAttributes({ batchchild: value })}
                                />
                            </div>
                            {!batchchild && (
                                <>
                                    <TextControl
                                        value={customtrigger}
                                        onChange={(value) => setAttributes({ customtrigger: value })}
                                        help={__(
                                            "By default, trigger will be block itself, but you can set custom trigger. Use .class to search globally OR div.class, img, button to search selector inside current container", 'greenshiftgsap'
                                        )}
                                    />
                                </>
                            )}
                            <>
                                <span className="gspb_inspector_property-title">
                                    {__("Interval between items", 'greenshiftgsap')}
                                </span>
                                <NumberControl
                                    onChange={(value) => setAttributes({ batchint: parseFloat(value) })}
                                    help={__(
                                        "By default, interval is 0.15, but you can set other.", 'greenshiftgsap'
                                    )}
                                    isDragEnabled
                                    isShiftStepEnabled
                                    shiftStep={0.1}
                                    min={0.01}
                                    max={3}
                                    step={0.01}
                                    value={batchint}
                                />
                            </>
                            <div className="gspb_row__col--10">
                                <span className="gspb_inspector_property-title">
                                    {__("Trigger only once", 'greenshiftgsap')}
                                </span>
                            </div>
                            <div className="gspb_row__col--2" style={{ marginTop: "5px" }}>
                                <ToggleControl
                                    checked={batchonce}
                                    onChange={(value) => setAttributes({ batchonce: value })}
                                />
                            </div>
                            <div className="gspb_row__col--10">
                                <span className="gspb_inspector_property-title">
                                    {__("Enable random order", 'greenshiftgsap')}
                                </span>
                            </div>
                            <div className="gspb_row__col--2" style={{ marginTop: "5px" }}>
                                <ToggleControl
                                    checked={batchrandom}
                                    onChange={(value) => setAttributes({ batchrandom: value })}
                                />
                            </div>
                        </OptionsGroupSet>
                    </>
                )}
                <hr style={{ marginBottom: 15, marginTop: 15 }} />
                <div className="gspb_row gspb_row--gutter-30">
                    <div className="gspb_row__col--6" style={{ padding: 0 }}>
                        <span className="gspb_inspector_property-title">
                            {__(
                                animation_type === "text_transformations"
                                    ? "Color"
                                    : "Background Color"
                            )}
                        </span>
                    </div>
                    <div className="gspb_row__col--6" style={{ textAlign: "right", justifyContent: "flex-end", padding: 0 }}>
                        <BlpgeColorPicker
                            color={background}
                            onChange={(value) =>
                                setAttributes({
                                    background: value.rgb ? `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})` : value,
                                })
                            }
                        />
                    </div>
                    <div
                        className="gspb_row__col--10"
                        style={{ display: "flex", alignItems: "center", padding: 0 }}
                    >
                        {__("Shadow", 'greenshiftgsap')}
                    </div>
                    <div className="gspb_row__col--2" style={{ padding: 0 }}>
                        <Dropdown
                            position="top left"
                            renderToggle={({ onToggle }) => (
                                <div>
                                    <button
                                        className="components-button components-icon-button components-toolbar__control"
                                        onClick={onToggle}
                                    >
                                        <i
                                            class="rhicon rhi-cog"
                                            style={{
                                                margin: "auto",
                                                fontSize: "20px",
                                            }}
                                        />
                                    </button>
                                </div>
                            )}
                            renderContent={({ onToggle }) => (
                                <div className="gspb_inspector_more_options">
                                    <Shadow
                                        attributeName="shadow"
                                        {...props}
                                        predefined={false}
                                    />
                                </div>
                            )}
                        />
                    </div>
                </div>
                <div className="gspb_row">
                    <div className="gspb_row__col--10">
                        <span className="gspb_inspector_property-title">
                            {__("Play inner video", 'greenshiftgsap')}
                        </span>
                    </div>
                    <div className="gspb_row__col--2" style={{ marginTop: "5px" }}>
                        <ToggleControl
                            checked={videoplay}
                            onChange={(value) => setAttributes({ videoplay: value })}
                        />
                    </div>
                </div>
                <hr style={{ marginBottom: 15, marginTop: 15 }} />

                <div className="gspb_row gspb_row--gutter-30">
                    <div class="gspb_row__col--6" style={{ padding: "0 10px 0 0" }}>
                        {custom_origin ?
                            <TextControl
                                value={origin}
                                onChange={(value) => setAttributes({ origin: value })}
                                help={<OriginDocLink />}
                            />
                            :
                            <AlignmentMatrixControl
                                help={<OriginDocLink />}
                                label={__("Origin")}
                                value={origin}
                                onChange={(value) => setAttributes({ origin: value })}
                            />
                        }
                    </div>
                    <div class="gspb_row__col--6" style={{ padding: 0 }}>
                        <span style={{ display: "block" }} className="marginbottom10">
                            {__("Use custom transform origin", 'greenshiftgsap')}
                        </span>
                        <ToggleControl
                            className="marginbottom10"
                            checked={custom_origin}
                            onChange={(value) => setAttributes({ custom_origin: value })}
                        />
                        <Button isSecondary isSmall onClick={() => {
                            animationReset();
                        }}>{__('Reset All values', 'greenshiftgsap')}</Button>
                        <div style={{ marginBottom: 5 }}></div>
                        <Button isSecondary isSmall onClick={() => {
                            animationEditorReset(props.animationref);
                        }}>{__('Reset in Editor', 'greenshiftgsap')}</Button>
                        <div style={{ marginBottom: 5 }}></div>
                        <Button isSecondary isSmall onClick={() => {
                            animationEditorInit(props.animationref);
                        }}>{__('Init in Editor', 'greenshiftgsap')}</Button>
                    </div>
                </div>
            </>

        </div>
    );
};

export default CommonForm;

const OriginDocLink = () => {
    return (
        <>
            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin" target="__blank">{__('Check documentation', 'greenshiftgsap')}</a>
        </>
    )
}