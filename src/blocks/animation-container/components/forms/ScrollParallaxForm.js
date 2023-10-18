import { ToggleControl, BaseControl, __experimentalNumberControl as NumberControl,TextControl } from '@wordpress/components';
const { __ } = wp.i18n;

const ScrollParallaxForm = (props) => {

	const {
		attributes: {
			scroll_parallax_enabled,
			parallax_speedX,
			parallax_speedY,
			parallax_start,
            parallax_end
		},
		setAttributes,
	} = props;

	const TriggerDocLink = () => {
		return (
			<>
				{__('Check documentation for available values', 'greenshiftgsap')} - <a href="https://greensock.com/docs/v3/Plugins/ScrollTrigger" target="_blank"> ScrollTrigger Docs </a>
			</>
		)
	}

	return (
		<div className="gs-inspector-form-inspector">
			<div className="gspb_row">
				<div className="gspb_row__col--10">
					<span className="gspb_inspector_property-title">
						{__('Enable scroll parallax effect', 'greenshiftgsap')}
					</span>
				</div>
				<div className="gspb_row__col--2" style={{ marginTop: '5px' }}>
					<ToggleControl
						checked={scroll_parallax_enabled}
						onChange={(value) => setAttributes({ scroll_parallax_enabled: value })}
					/>
				</div>
			</div>
			{scroll_parallax_enabled &&
				<>
					<BaseControl className="gs-label-row">
						<NumberControl
							onChange={(value) => setAttributes({ parallax_speedY: parseFloat(value) })}
							label={__('Speed Y', 'greenshiftgsap')}
							isDragEnabled
							isShiftStepEnabled
							shiftStep={1}
							step={0.1}
							value={parallax_speedY}
						/>
					</BaseControl>
					<BaseControl className="gs-label-row">
						<NumberControl
							onChange={(value) => setAttributes({ parallax_speedX: parseFloat(value) })}
							label={__('Speed X', 'greenshiftgsap')}
							isDragEnabled
							isShiftStepEnabled
							shiftStep={1}
							step={0.1}
							value={parallax_speedX}
						/>
					</BaseControl>

					<span className="gspb_inspector_property-title">
						{__('For reverse direction - set negative values.', 'greenshiftgsap')} {__('Check documentation for available values', 'greenshiftgsap')} - <a href="https://greensock.com/docs/v3/Plugins/ScrollTrigger" target="_blank"> ScrollTrigger Docs </a>
					</span>

					<>
						<span className="gspb_inspector_property-title">
							{__("Trigger start", 'greenshiftgsap')}
						</span>
						<TextControl
							value={parallax_start}
							onChange={(value) => setAttributes({ parallax_start: value })}
							help={__(
								"Default is top bottom, which means that it starts when object top area will be visible at bottom part of browser. If your object in first screen, we recommend to set value as 0", 'greenshiftgsap'
							)}
						/>
					</>
					<>
						<span className="gspb_inspector_property-title">
							{__("Trigger end", 'greenshiftgsap')}
						</span>
						<TextControl
							value={parallax_end}
							onChange={(value) => setAttributes({ parallax_end: value })}
							help={__(
								"Default is bottom top, which means that it ends when object bottom area will hit top part of browser", 'greenshiftgsap'
							)}
						/>
					</>

				</>

			}
		</div>
	);
}
export default ScrollParallaxForm;