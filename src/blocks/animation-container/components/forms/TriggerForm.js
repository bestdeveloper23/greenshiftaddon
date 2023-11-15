const { __ } = wp.i18n;
import { SelectControl, TextControl, ToggleControl, BaseControl, __experimentalNumberControl as NumberControl, Dropdown, RangeControl } from '@wordpress/components';

const { GsbpFormLabel } = gspblib.components;

const TriggerForm = (props) => {
	const {
		attributes: {
			strandom,
			triggertype,
			customtrigger,
			customobject,
			triggerstart,
			triggerend,
			triggerscrub,
			pinned,
			pinspace,
			pinReparent,
			triggeraction,
			triggersnap,
			batchint,
			animation_type,
			prehide,
			scroller,
			scrollernav,
			observetype,
			durationfollow,
			additive,
			tolerance,
			addspeedX,
			addspeedY,
			scrollcontainer,
			maxX
		},
		setAttributes,
	} = props;

	const TriggerDocLink = () => {
		return (
			<>
				{__('Check documentation for available values', 'greenshiftgsap')} - <a href="https://greensock.com/docs/v3/Plugins/ScrollTrigger" target="__blank"> ScrollTrigger Docs </a>
			</>
		)
	}

	let scrolladvancedoptions = (
		<div
			className="gspb_inspector_advancedOptionsWrraper gspb_inspector"
			style={{ minWidth: 220 }}
		>
			<span className="gspb_inspector_property-title">
				{__("Custom Scroller object", 'greenshiftgsap')}
			</span>
			<TextControl
				value={scroller}
				onChange={(value) => setAttributes({ scroller: value })}
				help={__(
					"By default, plugin will use window scroll tracking, but if you have blocks with own scroll, you can set scroll object with id(use #) or class (use .) here", 'greenshiftgsap'
				)}
			/>
			{triggertype != 'batch' && (
				<>
					<>
						<span className="gspb_inspector_property-title">
							{__("Trigger actions", 'greenshiftgsap')}
						</span>
						<TextControl
							value={triggeraction}
							onChange={(value) =>
								setAttributes({ triggeraction: value })
							}
							help={__("Determines how the linked animation is controlled at the 4 distinct toggle places - onEnter, onLeave, onEnterBack, and onLeaveBack. Possible values: play, pause, resume, reset, restart, complete, reverse, and none. Default is: play pause resume reset", 'greenshiftgsap')}
						/>
					</>
					<BaseControl className="gs-label-row" help={__("Formula: 1 / (number of section - 1). Snap are working only on frontend part of site", 'greenshiftgsap')}>
						<NumberControl
							onChange={(value) => setAttributes({ triggersnap: parseFloat(value) })}
							label={__('Scroll snap', 'greenshiftgsap')}
							isDragEnabled
							isShiftStepEnabled
							shiftStep={0.1}
							min={0}
							max={1}
							step={0.01}
							value={triggersnap}
						/>
					</BaseControl>
					<BaseControl className="gs-label-row" help={__("Use this option if your animation is part of Horizontal Section Scroll block", 'greenshiftgsap')}>
						<ToggleControl
							label={__("Horizontal scroll?", 'greenshiftgsap')}
							checked={scrollcontainer}
							onChange={(value) => setAttributes({ scrollcontainer: value })}
						/>
					</BaseControl>
					<BaseControl className="gs-label-row" help={__("Use this option if your animation is part of Page Navigation block", 'greenshiftgsap')}>
						<ToggleControl
							label={__("Is Page Nav Block?", 'greenshiftgsap')}
							checked={scrollernav}
							onChange={(value) => setAttributes({ scrollernav: value })}
						/>
					</BaseControl>
				</>
			)}
		</div>
	);

	return (
		<div className="gs-inspector-form-inspector">
			{animation_type != "batch" && animation_type != '3d_model' && (
				<>
					<span className="gspb_inspector_property-title">
						{__("Trigger type", 'greenshiftgsap')}
					</span>
					<SelectControl
						value={triggertype}
						options={[
							{ label: __("Scroll trigger", 'greenshiftgsap'), value: "scroll" },
							{ label: __("On load", 'greenshiftgsap'), value: "load" },
							{ label: __("Batch Scroll", 'greenshiftgsap'), value: "batch" },
							{ label: __("On Hover", 'greenshiftgsap'), value: "hover" },
							{ label: __("On Click", 'greenshiftgsap'), value: "click" },
						]}
						onChange={(value) => setAttributes({ triggertype: value })}
						help={<TriggerDocLink />}
					/>
				</>
			)}
			{animation_type == '3d_model' && (
				<>
					<span className="gspb_inspector_property-title">
						{__("Trigger type", 'greenshiftgsap')}
					</span>
					<SelectControl
						value={triggertype}
						options={[
							{ label: __("Scroll trigger", 'greenshiftgsap'), value: "scroll" },
							{ label: __("On load", 'greenshiftgsap'), value: "load" },
							{ label: __("On Hover", 'greenshiftgsap'), value: "hover" },
							{ label: __("On Click", 'greenshiftgsap'), value: "click" },
						]}
						onChange={(value) => setAttributes({ triggertype: value })}
						help={<TriggerDocLink />}
					/>
				</>
			)}
			{triggertype == 'observe' &&
				<>
					<span className="gspb_inspector_property-title">
						{__("Observe type", 'greenshiftgsap')}
					</span>
					<SelectControl
						value={observetype}
						help={__('Touch, scroll and drag types are working only on frontend part of site. Observer works on block itself, you can set custom trigger. If you want to observe whole window, use word - window, as custom trigger ', 'greenshiftgsap')}
						options={[
							{ label: __("Select", 'greenshiftgsap'), value: null },
							{ label: __("Down", 'greenshiftgsap'), value: "down" },
							{ label: __("Up", 'greenshiftgsap'), value: "up" },
							{ label: __("Down and reverse on Up", 'greenshiftgsap'), value: "downtoggle" },
							{ label: __("Up and reverse on Down", 'greenshiftgsap'), value: "uptoggle" },
							{ label: __("Left", 'greenshiftgsap'), value: "left" },
							{ label: __("Right", 'greenshiftgsap'), value: "right" },
							{ label: __("Left and reverse on Right", 'greenshiftgsap'), value: "lefttoggle" },
							{ label: __("Right and reverse on Left", 'greenshiftgsap'), value: "righttoggle" },
							{ label: __("Drag", 'greenshiftgsap'), value: "drag" },
							{ label: __("Drag and reverse on release", 'greenshiftgsap'), value: "dragtoggle" },
							{ label: __("On Change with Speed synchronized", 'greenshiftgsap'), value: "onchange" },
						]}
						onChange={(value) => setAttributes({ observetype: value })}
					/>
					{observetype != 'onchange' &&
						<BaseControl className="gs-label-row" help={__("This will add animation on each step", 'greenshiftgsap')}>
							<ToggleControl
								label={__("Additive mode", 'greenshiftgsap')}
								checked={additive}
								onChange={(value) => setAttributes({ additive: value })}
							/>
						</BaseControl>
					}
					{(observetype == 'onchange') && (
						<>
							<div className="gspb_inspector_inputs-row__title gspb_row gspb_row--gutter-20">
								<div class="gspb_row__col--6">
									<BaseControl help={__('Speed multiplier X', 'greenshiftgsap')}>
										<NumberControl
											onChange={(value) => setAttributes({ addspeedX: parseFloat(value) })}
											label={__('X', 'greenshiftgsap')}
											isDragEnabled
											isShiftStepEnabled
											shiftStep={0.1}
											min={0.005}
											max={1}
											step={0.001}
											value={addspeedX}
										/>
									</BaseControl>
								</div>
								<div class="gspb_row__col--6">
									<BaseControl help={__('Speed multiplier Y', 'greenshiftgsap')}>
										<NumberControl
											onChange={(value) => setAttributes({ addspeedY: parseFloat(value) })}
											label={__('Y', 'greenshiftgsap')}
											isDragEnabled
											isShiftStepEnabled
											shiftStep={0.1}
											min={0.005}
											max={1}
											step={0.001}
											value={addspeedY}
										/>
									</BaseControl>
								</div>
							</div>
							<TextControl
								value={maxX}
								label={__('Maximum X value', 'greenshiftgsap')}
								onChange={(value) => setAttributes({ maxX: value })}
								help={__(
									"You can clamp maximum transformed value for X axis. Place number here or use placeholders {WIDTH} - width of object, {WINDOW} - width of window, {WIDTH/2} half width of object", 'greenshiftgsap'
								)}
							/>
						</>
					)}
					<BaseControl>
						<NumberControl
							onChange={(value) => setAttributes({ tolerance: parseFloat(value) })}
							label={__('Minimum pixel movement to trigger', 'greenshiftgsap')}
							isDragEnabled
							isShiftStepEnabled
							shiftStep={10}
							min={0}
							max={500}
							step={1}
							value={tolerance}
						/>
					</BaseControl>
				</>
			}
			{triggertype == 'mousefollow' &&
				<>
					<span className="gspb_inspector_property-title">
						{__("Everything which you put inside this block will be used as Mouse pointer. By default, this will work on whole window but you can set custom trigger (this will make custom cursor only over this trigger) and custom object class (which will be used as pointer). Animations which you set in general options will be used when user clicks over trigger and will be reversed when user release pointer.", 'greenshiftgsap')}
					</span>
					<BaseControl className="gs-label-row">
						<NumberControl
							onChange={(value) => setAttributes({ durationfollow: parseFloat(value) })}
							label={__('Follow speed', 'greenshiftgsap')}
							isDragEnabled
							isShiftStepEnabled
							shiftStep={1}
							min={0.1}
							max={1}
							step={0.01}
							value={durationfollow}
						/>
					</BaseControl>
				</>
			}
			{triggertype !== "load" && (
				<>
					{triggertype === "batch" ? (
						<span className="gspb_inspector_property-title">
							{__("Custom class for Batch scroll", 'greenshiftgsap')}
						</span>
					) : (
						<span className="gspb_inspector_property-title">
							{__("Selector for custom trigger", 'greenshiftgsap')}
						</span>
					)
					}
					<TextControl
						value={customtrigger}
						onChange={(value) => setAttributes({ customtrigger: value })}
						help={__(
							"By default, trigger will be block itself, but you can set custom trigger. Use .class or #id of element to search globally OR div.class, img, button to search selector inside current container.", 'greenshiftgsap'
						)}
					/>
				</>
			)}
			{triggertype !== "batch" && (
				<>
					<span className="gspb_inspector_property-title">
						{__("Object where to add animation", 'greenshiftgsap')}
					</span>
					<TextControl
						value={customobject}
						onChange={(value) => setAttributes({ customobject: value })}
						help={__(
							"By default, will be applied to current object but you can apply to custom object. Use .class or #id of element to search globally OR div.class, img, button to search selector inside current container", 'greenshiftgsap'
						)}
					/>
				</>
			)}
			{(triggertype === "scroll" || triggertype === "batch") && (
				<>
					<>
						<span className="gspb_inspector_property-title">
							{__("Trigger start", 'greenshiftgsap')}
						</span>
						<TextControl
							value={triggerstart}
							onChange={(value) => setAttributes({ triggerstart: value })}
							help={__(
								"By default, trigger is set to top point of element, but you can change this. Example: top center", 'greenshiftgsap'
							)}
						/>
					</>
					<>
						<span className="gspb_inspector_property-title">
							{__("Trigger end", 'greenshiftgsap')}
						</span>
						<TextControl
							value={triggerend}
							onChange={(value) => setAttributes({ triggerend: value })}
							help={__(
								"By default, trigger scroll end is set to bottom point of element, but you can change this. Example: +=300 will set end of trigger as 300px after start", 'greenshiftgsap'
							)}
						/>
					</>
					{triggertype !== "batch" && (
						<>
							<>

								<GsbpFormLabel
									title={__("Interpolate animation by Scroll", 'greenshiftgsap')}
									clearFun={() => setAttributes({ triggerscrub: null })}
								/>
								<div></div>

								<RangeControl
									value={triggerscrub}
									trackColor='#2184f9'
									onChange={(value) => setAttributes({ triggerscrub: parseFloat(value) })}
									min={0.1}
									max={5}
									help={__(
										"By default, scroll will trigger full animation. If you want to play animation by scrolling, place here number of seconds for feedback. Better to check how it works on Frontend. Recommended value for interpolation is 1.", 'greenshiftgsap'
									)}
								/>
							</>
						</>
					)}
					<div
						className="gspb_row gspb_row--no-padding-col"
						style={{ marginTop: '10px', width: '100%' }}
					>
						<div
							className="gspb_row__col--10"
							style={{ display: 'flex', alignItems: 'center' }}
						>
							<div>{__('Advanced Scroll options', 'greenshiftgsap')}</div>
						</div>
						<div className="gspb_row__col--2">
							<Dropdown
								position="bottom left"
								renderToggle={({ onToggle }) => (
									<div>
										<button
											className="components-button components-icon-button components-toolbar__control"
											style={{ color: (scroller || triggeraction || triggersnap || scrollernav || scrollcontainer) ? "#2184f9" : '#111111' }}
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
									scrolladvancedoptions
								}
							/>
						</div>
					</div>
				</>
			)}
			{
				triggertype != 'mousefollow' &&
				<BaseControl className="gs-label-row" help={__("This helps to fix flickering on loading in some situation when your block is in first screen", 'greenshiftgsap')}>
					<hr style={{ marginBottom: 18, marginTop: 10 }} />
					<ToggleControl
						label={__("Hide on Init", 'greenshiftgsap')}
						checked={prehide}
						onChange={(value) => setAttributes({ prehide: value })}
					/>
				</BaseControl>
			}

		</div>
	);
};

export default TriggerForm;