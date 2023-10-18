const MouseMoveWrapper = ({child, props}) => {
    const {
		attributes: { 
            prlx_tilt,
            prlx_xy,
            prlx_cur,
            prlx_reset
        }
	} = props;
    return (
        <div 
            className="gs-prlx-mouse"
            data-prlx-cur={prlx_cur ? 'yes' : null}
            data-prlx-rest={(prlx_reset && prlx_cur) ? 'yes' : null}
            data-prlx-xy={prlx_xy}
            data-prlx-tilt={prlx_tilt}
        >
            {child}
        </div>
    )
}

export default MouseMoveWrapper;