const ScrollParallaxWrapper = ({child, props}) => {

    const {
        attributes: {
            parallax_speedX,
            parallax_speedY,
            parallax_reverse_direction,
            parallax_start,
            parallax_end
        }
    } = props;

    return (
        <div 
            className="gs-gsap-parallax" 
            data-speedx={parallax_speedX}
            data-speedy={parallax_speedY}
            data-start={parallax_start || null}
            data-end={parallax_end || null}
            data-from={parallax_reverse_direction ? "yes" : null}
            >
                {child}
        </div>
)};

export default ScrollParallaxWrapper;