import { ToggleControl, BaseControl, __experimentalNumberControl as NumberControl, Button } from '@wordpress/components';
const { __ } = wp.i18n;

const MouseMoveForm = (props) => {
	const {
		attributes: { mouse_move_enabled, prlx_tilt, prlx_xy, prlx_cur, prlx_reset },
		setAttributes,
	} = props;

	return (
		<div className="gs-inspector-form-inspector">
			<div className="gspb_row">
				<div className="gspb_row__col--10">
					<span className="gspb_inspector_property-title">
						{__("Enable mouse move effect")}
					</span>
				</div>
				<div className="gspb_row__col--2" style={{ marginTop: "5px" }}>
					<ToggleControl
						checked={mouse_move_enabled}
						onChange={(value) => setAttributes({ mouse_move_enabled: value })}
					/>
				</div>
			</div>
			{mouse_move_enabled && (
				<>
					<div className="gspb_row">

						<div className="gspb_row__col--10">
							<span className="gspb_inspector_property-title">
								{__("Bounds by Object")}
							</span>
						</div>
						<div className="gspb_row__col--2" style={{ marginTop: "5px" }}>
							<ToggleControl
								checked={prlx_cur}
								onChange={(value) => setAttributes({ prlx_cur: value })}
							/>
						</div>
					</div>
					{prlx_cur && (
						<div className="gspb_row">
							<div className="gspb_row__col--10">
								<span className="gspb_inspector_property-title">
									{__("Restore on Mouse Leave")}
								</span>
							</div>
							<div className="gspb_row__col--2" style={{ marginTop: "5px" }}>
								<ToggleControl
									checked={prlx_reset}
									onChange={(value) => setAttributes({ prlx_reset: value })}
								/>
							</div>
						</div>
					)}
					<BaseControl className="gs-label-row">
						<NumberControl
							onChange={(value) => setAttributes({ prlx_xy: parseFloat(value) })}
							label={__('Strength for x and y')}
							isDragEnabled
							isShiftStepEnabled
							shiftStep={1}
							max={200}
							step={0.1}
							value={prlx_xy}
						/>
					</BaseControl>
					<BaseControl className="gs-label-row">
						<NumberControl
							onChange={(value) => setAttributes({ prlx_tilt: parseFloat(value) })}
							label={__('Strength for tilt')}
							isDragEnabled
							isShiftStepEnabled
							shiftStep={1}
							max={200}
							step={0.1}
							value={prlx_tilt}
						/>
					</BaseControl>
				</>
			)}
		</div>
	);
};
export default MouseMoveForm;
