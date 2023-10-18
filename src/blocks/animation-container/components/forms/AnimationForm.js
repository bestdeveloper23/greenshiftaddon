import animationsTypes from './Animationstype';
import { __ } from '@wordpress/i18n';
import { SelectControl, TextControl, ToggleControl, BaseControl, __experimentalNumberControl as NumberControl } from '@wordpress/components';
const { GsbpFormLabel, RadioAdvanced } = gspblib.components;

const AnimationForm = (props) => {
	const {
		attributes: {
			ease,
			delay,
			duration,
			yoyo,
			loop,
			repeatdelay,
			set_from,
			easecustom
		},
		setAttributes,
	} = props;
	return (
		<>
			<div className="gs-inspector-form-inspector">
				<BaseControl className="gs-label-row">
					<NumberControl
						onChange={(value) => setAttributes({ duration: parseFloat(value) })}
						label={__('Duration')}
						isDragEnabled
						isShiftStepEnabled
						shiftStep={1}
						min={0.1}
						max={120}
						step={0.1}
						value={duration}
					/>
				</BaseControl>

				<BaseControl className="gs-label-row">
					<NumberControl
						onChange={(value) => setAttributes({ delay: parseFloat(value) })}
						label={__('Delay')}
						isDragEnabled
						isShiftStepEnabled
						shiftStep={1}
						min={0.1}
						max={20}
						step={0.1}
						value={delay}
					/>
				</BaseControl>
				<div className="gspb_row">

					<div className="gspb_row__col--7" style={{ padding: 0 }}>
						<GsbpFormLabel
							title={__("Ease type")}
							clearFun={() => setAttributes({ ease: null })}
						/>
					</div>
					<div className="gspb_row__col--5" style={{ padding: 0 }}>
						<SelectControl
							value={ease}
							options={animationsTypes}
							onChange={(value) => setAttributes({ ease: value })}
						/>
					</div>
				</div>
				{ease == 'custom' &&
					<>
						<TextControl
							value={easecustom}
							label={__('Add custom ease coordinates', 'greenshiftgsap')}
							onChange={(value) => setAttributes({ easecustom: value })}
						/>
						<div style={{ marginBottom: 10 }}><a href="https://greensock.com/customease/" target="_blank">{__('Get coordinates', 'greenshiftgsap')}</a></div>
					</>
				}
				<div className="gspb_row">

					<div className="gspb_row__col--10" style={{ padding: 0 }}>
						<span className="gspb_inspector_property-title">
							{__("Enable infinite")}
						</span>
					</div>
					<div className="gspb_row__col--2" style={{ marginTop: "5px", padding: 0 }}>
						<ToggleControl
							checked={loop}
							onChange={(value) => setAttributes({ loop: value })}
						/>
					</div>
				</div>
				{loop && (
					<>
						<div className="gspb_row">

							<div className="gspb_row__col--10">
								<span className="gspb_inspector_property-title">
									{__("Enable Yoyo style")}
								</span>
							</div>
							<div className="gspb_row__col--2" style={{ marginTop: "5px" }}>
								<ToggleControl
									checked={yoyo}
									onChange={(value) => setAttributes({ yoyo: value })}
								/>
							</div>
						</div>
						<div className="gspb_row">

							<div className="gspb_row__col--10">
								<span className="gspb_inspector_property-title">
									{__("Enable delay between animations")}
								</span>
							</div>
							<div className="gspb_row__col--2" style={{ marginTop: "5px" }}>
								<ToggleControl
									checked={repeatdelay}
									onChange={(value) => setAttributes({ repeatdelay: value })}
								/>
							</div>
						</div>
					</>
				)}
				<div style={{ marginTop: "5px" }}></div>
				<RadioAdvanced
					value={set_from}
					label={__('Set Direction', 'greenshiftgsap')}
					fluid={''}
					onChange={(value) => {
						setAttributes({
							set_from: value,
						});
					}}
					options={[
						{ label: 'From', value: true, title: __('From Value') },
						{ label: 'To', value: false, title: __('To Value') }
					]}
				/>
			</div>
		</>
	);
};
export default AnimationForm;
