/**
 *
 * Inspector Component.
 *
 */

// Import wp dependencies
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	MediaUpload, MediaUploadCheck
} from '@wordpress/block-editor';

import { isEqual } from 'lodash';
import attributesDefault from './attributes';
import MultipleAnimation from './forms/MultipleAnimation';

import {
	PanelBody,
	RangeControl,
	ToggleControl,
	TextControl,
	Button,
	TextareaControl,
	TreeSelect
} from '@wordpress/components';

// Import blockypage dependencies
const {
	Spacing,
	Responsive,
	CssTransform,
	Position,
	Animation,
	Background,
	DynamicMetaToolbar
} = gspblib.collections;

const { InspectorTabs, InspectorTab, CssUnits, Devices } = gspblib.components;
const { gspb_getDeviceStateIndex } = gspblib.utilities;

const Inspector = (props) => {

	const {
		attributes: {
			td_url,
			imageurl,
			td_load_iter,
			threecanvwidth,
			threecanvheight,
			threecanvheightUnit,
			threecanvwidthUnit,
			td_ar,
			td_ar_scale,
			td_ar_wall,
			usdz_url,
			td_rotate,
			td_camera,
			td_zoom_disable,
			td_cam_orbit,
			td_scale,
			td_sky,
			td_env,
			td_neutral,
			td_shadow_opacity,
			td_shadow_soft,
			td_play,
			td_an_choose,
			td_rx,
			td_ry,
			td_rz,
			td_mmove,
			td_variants,
			align,
			td_objects
		},
		setAttributes,
	} = props;

	const ALIGNMENT_CONTROLS = [
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
console.log(td_objects)
	const deviceStateIndex = gspb_getDeviceStateIndex();
	const [devstate, setdevState] = useState(0);

	let animationchange = isEqual(attributesDefault.animation.default, props.attributes.animation) ? false : true;
	let csstransformchange = isEqual(attributesDefault.csstransform.default, props.attributes.csstransform) ? false : true;
	let positionchange = isEqual(attributesDefault.position.default, props.attributes.position) ? false : true;
	let responsivechange = isEqual(attributesDefault.responsive.default, props.attributes.responsive) ? false : true;

	return (
		<>
			<InspectorControls>
				<div className="gspb_inspector">
					<InspectorTabs tabs={['general', 'advance']} activeAdvance={(animationchange || csstransformchange || positionchange || responsivechange) ? true : false}>
						<InspectorTab key={'general'}>
							<PanelBody
								initialOpen={true}
								title={__('GLTF Model loader')}
							>
								<div className={`${props.attributes.loading ? " gspb_loader_line_label" : ""}`}>
									<TextControl
										label={__('File URL')}
										value={td_url}
										onChange={(value) => {
											setAttributes({
												td_url: value
											});
										}}
									/>
								</div>
								<MediaUploadCheck>
									<MediaUpload
										onSelect={(media) =>
											setAttributes({ td_url: media.url })
										}
										allowedTypes={['glb', 'gltf']}
										value={td_url}
										render={({ open }) => (
											<Button isSecondary onClick={open}>{__("Upload Gltf or Glb file")}</Button>
										)}
									/>
								</MediaUploadCheck>
								<div style={{ marginTop: 10, marginBottom: 10 }}>{__("Fallback image")}</div>
								<MediaUpload
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
								<DynamicMetaToolbar attributeName="td_url"  {...props} />
							</PanelBody>
							<PanelBody title={__("Avaliable objects")} initialOpen={false}>
							<TreeSelect
									label="Select object"
									noOptionLabel="No parent page"
									onChange={ ( page ) => console.log(page) }
									selectedId={ 1 }
									tree={ td_objects }
								/>
							</PanelBody>
							<PanelBody title={__("Multiple Animation")} initialOpen={false}>
								<MultipleAnimation {...props} />
							</PanelBody>
							<PanelBody title={__("Canvas Size")} initialOpen={false}>
								<div className="gspb_inspector_options-set" style={{ marginBottom: 15 }}>
									<div className="gspb_row gspb_row--no-padding-col">
										<div className="gspb_row__col--7">
											<span className="gspb_inspector_property-title">
												{__('Width')}
												<Devices
													className="gspb_inspector_device-icons--small"
													onChange={() =>
														setdevState(!devstate)
													}
												/>
											</span>
										</div>
										<div
											className="gspb_row__col--5"
											style={{
												justifyContent: 'space-between',
											}}
										>
											<div>

												<CssUnits
													units={['px', '%', 'em', 'vw']}
													attribute={
														threecanvwidthUnit[deviceStateIndex] ==
															null
															? ''
															: threecanvwidthUnit[deviceStateIndex]
													}
													onChange={(value) => {
														let currentValue = threecanvwidthUnit.slice();
														currentValue[
															deviceStateIndex
														] = value;
														setAttributes({
															threecanvwidthUnit: currentValue,
														});
													}}
												/>
												<div
													className="gspb_inspector_clear_btn--right"
													onClick={() => {
														let currentValue = threecanvwidth.slice();
														currentValue[
															deviceStateIndex
														] = null;
														setAttributes({
															threecanvwidth: currentValue,
														});
													}}
												>
													<i className="rhicon rhi-undo" />
												</div>
											</div>
										</div>
										<div style={{ width: '100%' }}>
											<RangeControl
												value={
													threecanvwidth[deviceStateIndex] == null
														? (threecanvwidth[0] == null ? '' : threecanvwidth[0])
														: threecanvwidth[deviceStateIndex]
												}
												onChange={(value) => {
													let currentValue = threecanvwidth.slice();
													currentValue[
														deviceStateIndex
													] = value;
													setAttributes({
														threecanvwidth: currentValue,
													});
												}}
												trackColor='#2184f9'
												min={
													threecanvwidthUnit[deviceStateIndex] ==
														'px'
														? 100
														: 1
												}
												max={
													threecanvwidthUnit[deviceStateIndex] ==
														'px'
														? 2500
														: 100
												}
											/>
										</div>
									</div>
								</div>
								<div className="gspb_inspector_options-set" style={{ marginBottom: 15 }}>
									<div className="gspb_row gspb_row--no-padding-col">
										<div className="gspb_row__col--7">
											<span className="gspb_inspector_property-title">
												{__('Height')}
												<Devices
													className="gspb_inspector_device-icons--small"
													onChange={() =>
														setdevState(!devstate)
													}
												/>
											</span>
										</div>
										<div
											className="gspb_row__col--5"
											style={{
												justifyContent: 'space-between',
											}}
										>
											<div>

												<CssUnits
													units={['px', '%', 'em', 'vh']}
													attribute={
														threecanvheightUnit[deviceStateIndex] ==
															null
															? ''
															: threecanvheightUnit[deviceStateIndex]
													}
													onChange={(value) => {
														let currentValue = threecanvheightUnit.slice();
														currentValue[
															deviceStateIndex
														] = value;
														setAttributes({
															threecanvheightUnit: currentValue,
														});
													}}
												/>
												<div
													className="gspb_inspector_clear_btn--right"
													onClick={() => {
														let currentValue = threecanvheight.slice();
														currentValue[
															deviceStateIndex
														] = null;
														setAttributes({
															threecanvheight: currentValue,
														});
													}}
												>
													<i className="rhicon rhi-undo" />
												</div>
											</div>
										</div>
										<div style={{ width: '100%' }}>
											<RangeControl
												value={
													threecanvheight[deviceStateIndex] == null
														? (threecanvheight[0] == null ? '' : threecanvheight[0])
														: threecanvheight[deviceStateIndex]
												}
												onChange={(value) => {
													let currentValue = threecanvheight.slice();
													currentValue[
														deviceStateIndex
													] = value;
													setAttributes({
														threecanvheight: currentValue,
													});
												}}
												trackColor='#2184f9'
												min={
													threecanvheightUnit[deviceStateIndex] ==
														'px'
														? 100
														: 1
												}
												max={
													threecanvheightUnit[deviceStateIndex] ==
														'px'
														? 2500
														: 100
												}
											/>
										</div>
									</div>
								</div>
							</PanelBody>
							<PanelBody title={__("AR settings")} initialOpen={false}>
								<ToggleControl
									label={__('Enable Argumented Reality option?')}
									checked={td_ar}
									onChange={(value) => {
										setAttributes({ td_ar: value });
									}}
								/>
								<ToggleControl
									label={__('Disable scale option for AR')}
									checked={td_ar_scale}
									onChange={(value) => {
										setAttributes({ td_ar_scale: value })
									}}
								/>
								<ToggleControl
									label={__('Enable placement on Wall')}
									checked={td_ar_wall}
									onChange={(value) => {
										setAttributes({ td_ar_wall: value })
									}}
								/>
								<div className={`${props.attributes.loading ? " gspb_loader_line_label" : ""}`}>
									<TextControl
										label={__('Url of Usdz model for Ios')}
										value={usdz_url}
										onChange={(value) => {
											setAttributes({
												usdz_url: value
											});
										}}
									/>
								</div>
								<MediaUploadCheck>
									<MediaUpload
										onSelect={(media) =>
											setAttributes({ usdz_url: media.url })
										}
										allowedTypes={['usdz']}
										value={usdz_url}
										render={({ open }) => (
											<Button isSecondary onClick={open}>{__("Upload Usdz file")}</Button>
										)}
									/>
								</MediaUploadCheck>
								<div style={{ marginTop: 15 }}></div>
								<DynamicMetaToolbar attributeName="usdz_url"  {...props} />
							</PanelBody>
							<PanelBody title={__("Camera Settings")} initialOpen={false}>
								<ToggleControl
									label={__('Enable Auto rotate?')}
									checked={td_rotate}
									onChange={(value) => {
										setAttributes({ td_rotate: value })
									}}
								/>
								<ToggleControl
									label={__('Enable Camera Control?')}
									checked={td_camera}
									onChange={(value) => {
										setAttributes({ td_camera: value })
									}}
								/>
								<ToggleControl
									label={__('Disable zoom')}
									checked={td_zoom_disable}
									onChange={(value) => {
										setAttributes({ td_zoom_disable: value })
									}}
								/>
								<TextareaControl
									label={__("Custom camera orbit")}
									help={<DocLink />}
									value={td_cam_orbit}
									onChange={(value) => setAttributes({ td_cam_orbit: value })}
								/>
								<RangeControl
									label={__("Scale")}
									value={td_scale}
									onChange={(value) => {
										setAttributes({
											td_scale: value,
										});
									}}
									trackColor='#2184f9'
									min={0.01}
									max={10}
									step={0.01}
								/>
							</PanelBody>
							<PanelBody title={__("Light and Environment")} initialOpen={false}>
								<TextControl
									label={__('HDR skybox image url')}
									value={td_sky}
									onChange={(value) => {
										setAttributes({
											td_sky: value
										});
									}}
								/>
								<TextControl
									label={__('HDR environment image url')}
									value={td_env}
									onChange={(value) => {
										setAttributes({
											td_env: value
										});
									}}
								/>
								<ToggleControl
									label={__('Enable Neutral Light')}
									checked={td_neutral}
									onChange={(value) => {
										setAttributes({ td_neutral: value })
									}}
								/>
								<RangeControl
									label={__("Shadow Opacity")}
									value={td_shadow_opacity}
									onChange={(value) => {
										setAttributes({
											td_shadow_opacity: value,
										});
									}}
									trackColor='#2184f9'
									min={0}
									max={1}
									step={0.01}
								/>
								<RangeControl
									label={__("Shadow Softness")}
									value={td_shadow_soft}
									onChange={(value) => {
										setAttributes({
											td_shadow_soft: value,
										});
									}}
									trackColor='#2184f9'
									min={0}
									max={5}
									step={0.01}
								/>
							</PanelBody>
							<PanelBody title={__("Animation settings")} initialOpen={false}>
								<ToggleControl
									label={__('Autoplay animation of model')}
									checked={td_play}
									onChange={(value) => {
										setAttributes({ td_play: value })
									}}
								/>
								<TextControl
									label={__('Set name of animation to play')}
									value={td_an_choose}
									onChange={(value) => {
										setAttributes({
											td_an_choose: value
										});
									}}
								/>
							</PanelBody>
							<PanelBody title={__("Transform animation settings")} initialOpen={false}>
								<RangeControl
									label={__("Pitch strength")}
									value={td_rx}
									onChange={(value) => {
										setAttributes({
											td_rx: value,
										});
									}}
									trackColor='#2184f9'
									min={0}
									max={250}
									step={1}
								/>
								<RangeControl
									label={__("Pitch strength")}
									value={td_ry}
									onChange={(value) => {
										setAttributes({
											td_ry: value,
										});
									}}
									trackColor='#2184f9'
									min={0}
									max={250}
									step={1}
								/>
								<RangeControl
									label={__("Yaw strength")}
									value={td_rz}
									onChange={(value) => {
										setAttributes({
											td_rz: value,
										});
									}}
									trackColor='#2184f9'
									min={0}
									max={250}
									step={1}
								/>
								<RangeControl
									label={__("React on Mouth move")}
									value={td_mmove}
									onChange={(value) => {
										setAttributes({
											td_mmove: value,
										});
									}}
									trackColor='#2184f9'
									min={0}
									max={100}
									step={0.1}
								/>
								<button
									className="gspb_inspector_btn gspb_inspector_btn--small"
									onClick={() => {
										setAttributes({
											td_rx: null,
											td_ry: null,
											td_rz: null,
											td_mmove: null,

										});
									}
									}
								>
									{__('Clear')}
								</button>
							</PanelBody>
							<PanelBody title={__("Additional")} initialOpen={false}>
								<ToggleControl
									label={__('Enable variant selector of model')}
									checked={td_variants}
									onChange={(value) => {
										setAttributes({ td_variants: value })
									}}
								/>
							</PanelBody>

							{ /* Background Settings */}
							<PanelBody
								title={__("Background and Opacity")}
								initialOpen={false}
								className={`${isEqual(attributesDefault.background.default, props.attributes.background) ? '' : 'gspb_panel_changed'}`}
							>
								<Background
									attributeName="background"
									exclude={['video']}
									{...props}
								/>
							</PanelBody>
							{ /* Spacing */}
							<PanelBody title={__("Spacing")} initialOpen={false} className={`${isEqual(attributesDefault.spacing.default, props.attributes.spacing) ? '' : 'gspb_panel_changed'}`}>
								<Spacing attributeName="spacing" overflow={false} {...props} />
							</PanelBody>

						</InspectorTab>
						<InspectorTab key={'advance'}>
							{ /* Animations Tab */}
							<PanelBody
								title={__("Animation", 'greenshift-animation-and-page-builder-blocks')}
								initialOpen={true}
								className={`${!animationchange ? '' : 'gspb_panel_changed'}`}
							>
								<Animation
									attributeName="animation"
									{...props}
								/>
							</PanelBody>
							{ /* Css Transform */}
							<PanelBody
								title={__("Css Transform", 'greenshift-animation-and-page-builder-blocks')}
								initialOpen={false}
								className={`${!csstransformchange ? '' : 'gspb_panel_changed'}`}
							>
								<CssTransform attributeName="csstransform" {...props} />
							</PanelBody>

							{ /* Position Tab */}
							<PanelBody
								title={__("Position", 'greenshift-animation-and-page-builder-blocks')}
								initialOpen={false}
								className={`${!positionchange ? '' : 'gspb_panel_changed'}`}
							>
								<Position attributeName="position" {...props} />
							</PanelBody>

							{ /* Responsive */}
							<PanelBody title={__("Responsive and Custom CSS", "greenshift-animation-and-page-builder-blocks")} initialOpen={false}
								className={`${!responsivechange ? '' : 'gspb_panel_changed'}`}
							>
								<Responsive attributeName="responsive" {...props} />
							</PanelBody>
						</InspectorTab>
					</InspectorTabs>
				</div>

			</InspectorControls>
			<BlockControls>
				<AlignmentToolbar
					value={align}
					onChange={align => setAttributes({ align })}
					alignmentControls={ALIGNMENT_CONTROLS}
				/>
			</BlockControls>
		</>
	);
}

export default Inspector;

const DocLink = () => {
	return (
		<>
			<a href="https://modelviewer.dev/examples/stagingandcameras/#orbitAndScroll" target="_blank">Documentation</a>
		</>
	)
}