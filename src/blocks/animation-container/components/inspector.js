// Import wp dependencies
const { __ } = wp.i18n;
import { TreeSelect } from '@wordpress/components';
import ScrollParallaxForm from './forms/ScrollParallaxForm';
import MouseMoveForm from './forms/MouseMoveForm';
import RevealForm from './forms/RevealForm';
import TriggerForm from './forms/TriggerForm';
import AnimationForm from './forms/AnimationForm';
import CommonForm from './forms/CommonForm';
import MultipleAnimation from './forms/MultipleAnimation';

import { isEqual } from 'lodash';
import attributesDefault from './attributes';

const { InspectorControls, BlockControls, AlignmentToolbar } = wp.blockEditor;
const { PanelBody, TextControl, BaseControl } = wp.components;
const {
	Spacing,
	Responsive,
	CssTransform,
	Position,
	Background,
	BlockWidth,
	GSFlexbox,
	ProChecker
} = gspblib.collections;
const { InspectorTabs, InspectorTab } = gspblib.components;

const Inspector = (props) => {

	const {
		attributes: {
			reveal_enabled,
			scroll_parallax_enabled,
			mouse_move_enabled,
			variable1,
			variable2,
			variable3,
			variable4,
			variable1value,
			variable2value,
			variable3value,
			variable4value,
			flexAlign,
			animation_type,
			td_objects,
			selected_object
		},
		setAttributes
	} = props;

	let csstransformchange = isEqual(attributesDefault.csstransform.default, props.attributes.csstransform) ? false : true;
	let positionchange = isEqual(attributesDefault.position.default, props.attributes.position) ? false : true;
	let responsivechange = isEqual(attributesDefault.responsive.default, props.attributes.responsive) ? false : true;
	let widthchange = isEqual(attributesDefault.blockWidth.default, props.attributes.blockWidth) ? false : true;

	const ALIGNMENT_CONTROLS = [
		{
			icon: 'menu',
			title: __('No align'),
			align: null,
		},
		{
			icon: 'editor-alignleft',
			title: __('Align Text Left'),
			align: 'flex-start',
		},
		{
			icon: 'editor-aligncenter',
			title: __('Align Text Center'),
			align: 'center',
		},
		{
			icon: 'editor-alignright',
			title: __('Align Text Right'),
			align: 'flex-end',
		},
	];

	return (
		<>
			<InspectorControls>
				<div className="gspb_inspector">
					<InspectorTabs tabs={['general', 'advance']} activeAdvance={(csstransformchange || positionchange || responsivechange || mouse_move_enabled || scroll_parallax_enabled || reveal_enabled || widthchange) ? true : false}>
						<InspectorTab key={'general'}>
							<PanelBody title={__("Common options")} initialOpen={true}>
								<ProChecker addonVar={greenshiftGSAP.can_use_premium_code} />
								<CommonForm {...props} />
							</PanelBody>
							<PanelBody title={__("Animation options")} initialOpen={true}>
								<AnimationForm {...props} />
							</PanelBody>
							<PanelBody title={__("Trigger option")} initialOpen={true}>
								<TriggerForm {...props} />
							</PanelBody>
							{animation_type === "3d_model" && (
								<PanelBody title={__("Available objects")} initialOpen={true}>
									<TreeSelect
										label="Select object"
										noOptionLabel="Full model"
										onChange={(page) => setAttributes({ selected_object: page })}
										tree={td_objects}
									/>
								</PanelBody>
							)}
							<PanelBody title={__("Multiple Animation")} initialOpen={false}>
								<MultipleAnimation {...props} />
							</PanelBody>
							<PanelBody title={__("Custom css variables")} initialOpen={false}>
								<BaseControl help={__("You can also animate your custom css variables values. If you need to set initial values and custom css, do this in Advanced - Responsive and custom css", 'greenshiftgsap')}>
									<div className="gspb_inspector_inputs-row__title gspb_row gspb_row--gutter-20">
										<div className="gspb_row__col--8">
											<span className="gspb_inspector_property-title">
												{__("Name", 'greenshiftgsap')}
											</span>
											<TextControl
												value={variable1}
												onChange={(value) => setAttributes({ variable1: value })}
											/>
										</div>
										<div className="gspb_row__col--4">
											<span className="gspb_inspector_property-title">
												{__("Value", 'greenshiftgsap')}
											</span>
											<TextControl
												value={variable1value}
												onChange={(value) => setAttributes({ variable1value: value })}
											/>
										</div>
									</div>
									<div className="gspb_inspector_inputs-row__title gspb_row gspb_row--gutter-20">
										<div className="gspb_row__col--8">
											<span className="gspb_inspector_property-title">
												{__("Name", 'greenshiftgsap')}
											</span>
											<TextControl
												value={variable2}
												onChange={(value) => setAttributes({ variable2: value })}
											/>
										</div>
										<div className="gspb_row__col--4">
											<span className="gspb_inspector_property-title">
												{__("Value", 'greenshiftgsap')}
											</span>
											<TextControl
												value={variable2value}
												onChange={(value) => setAttributes({ variable2value: value })}
											/>
										</div>
									</div>
									<div className="gspb_inspector_inputs-row__title gspb_row gspb_row--gutter-20">
										<div className="gspb_row__col--8">
											<span className="gspb_inspector_property-title">
												{__("Name", 'greenshiftgsap')}
											</span>
											<TextControl
												value={variable3}
												onChange={(value) => setAttributes({ variable3: value })}
											/>
										</div>
										<div className="gspb_row__col--4">
											<span className="gspb_inspector_property-title">
												{__("Value", 'greenshiftgsap')}
											</span>
											<TextControl
												value={variable3value}
												onChange={(value) => setAttributes({ variable3value: value })}
											/>
										</div>
									</div>
									<div className="gspb_inspector_inputs-row__title gspb_row gspb_row--gutter-20">
										<div className="gspb_row__col--8">
											<span className="gspb_inspector_property-title">
												{__("Name", 'greenshiftgsap')}
											</span>
											<TextControl
												value={variable4}
												onChange={(value) => setAttributes({ variable4: value })}
											/>
										</div>
										<div className="gspb_row__col--4">
											<span className="gspb_inspector_property-title">
												{__("Value", 'greenshiftgsap')}
											</span>
											<TextControl
												value={variable4value}
												onChange={(value) => setAttributes({ variable4value: value })}
											/>
										</div>
									</div>
								</BaseControl>
							</PanelBody>
							{ /* Position Tab */}
							<PanelBody
								title={__("Flexible Align", 'greenshiftgsap')}
								initialOpen={false}
								className={`gspb_smallpadding_btn ${isEqual(attributesDefault.flexbox.default, props.attributes.flexbox) ? '' : 'gspb_panel_changed'}`}
							>
								<GSFlexbox
									flex={false}
									attributeName="flexbox"
									{...props}
								/>
							</PanelBody>
						</InspectorTab>
						<InspectorTab key={'advance'}>
							<PanelBody title={__("Enabled Reveal")} initialOpen={true} className={`${!reveal_enabled ? '' : 'gspb_panel_changed'}`}>
								<RevealForm {...props} />
							</PanelBody>
							<PanelBody title={__("Enable scroll parallax effect")} initialOpen={false} className={`${!scroll_parallax_enabled ? '' : 'gspb_panel_changed'}`}>
								<ScrollParallaxForm {...props} />
							</PanelBody>
							<PanelBody title={__("Mouse move effect")} initialOpen={false} className={`${!mouse_move_enabled ? '' : 'gspb_panel_changed'}`}>
								<MouseMoveForm {...props} />
							</PanelBody>
							{ /* Css Transform */}
							<PanelBody
								title={__("Css Transform", 'greenshiftgsap')}
								initialOpen={false}
								className={`${!csstransformchange ? '' : 'gspb_panel_changed'}`}
							>
								<CssTransform attributeName="csstransform" {...props} />
							</PanelBody>

							{ /* Position Tab */}
							<PanelBody
								title={__("Position", 'greenshiftgsap')}
								initialOpen={false}
								className={`${!positionchange ? '' : 'gspb_panel_changed'}`}
							>
								<Position attributeName="position" {...props} />
							</PanelBody>

							{ /* Width Settings */}
							<PanelBody
								title={__("Width and Height", 'greenshiftgsap')}
								initialOpen={false}
								className={`${!widthchange ? '' : 'gspb_panel_changed'}`}
							>
								<BlockWidth
									attributeName="blockWidth"
									include={['height']}
									{...props}
								/>
							</PanelBody>

							<PanelBody
								title={__("Background and Opacity", 'greenshiftgsap')}
								initialOpen={false}
								className={`gspb_smallpadding_btn ${isEqual(attributesDefault.backgroundBlock.default, props.attributes.backgroundBlock) ? '' : 'gspb_panel_changed'}`}
							>
								<Background
									attributeName="backgroundBlock"
									exclude={['video']}
									{...props}
								/>
							</PanelBody>

							{ /* Responsive */}
							<PanelBody title={__("Responsive and Custom CSS", "greenshiftgsap")} initialOpen={false}
								className={`${!responsivechange ? '' : 'gspb_panel_changed'}`}
							>
								<Responsive attributeName="responsive" customstyle="{GREENSHIFT} .gs-gsap-wrap{  }" {...props} />
							</PanelBody>
							{ /* Spacing */}
							<PanelBody title={__("Spacing", 'greenshiftgsap')} initialOpen={false} className={`${isEqual(attributesDefault.spacing.default, props.attributes.spacing) ? '' : 'gspb_panel_changed'}`}>
								<Spacing attributeName="spacing" {...props} />
							</PanelBody>
						</InspectorTab>
					</InspectorTabs>
				</div>
			</InspectorControls>
			<BlockControls>
				<AlignmentToolbar
					value={flexAlign}
					onChange={value => setAttributes({ flexAlign: value })}
					alignmentControls={ALIGNMENT_CONTROLS}
				/>
			</BlockControls>
		</>
	);
}
export default Inspector;