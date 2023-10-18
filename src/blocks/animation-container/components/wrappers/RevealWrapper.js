const RevealWrapper = ({ child, props }) => {
    const {
        attributes: {
            reveal_dir,
            reveal_speed,
            reveal_delay,
            reveal_bg,
            reveal_enabled,
            backgroundReveal,
            reveal_clip,
            reveal_ease
        },
        editor
    } = props;

    return (
        <div className="gs-reveal-wrap" data-ease={reveal_ease || null} style={{ position: 'relative', display: "inline-block" }}>
            <div className="gs-reveal-cont" 
                data-revealclip={reveal_clip || null} 
                data-reveal-dir={reveal_clip ? reveal_dir : null}
                data-reveal-speed={reveal_clip ? reveal_speed : null}
                data-reveal-delay={reveal_clip ? reveal_delay : null}
            >
                {child}
            </div>
            {(reveal_enabled && !reveal_clip) && (
                <div
                    data-reveal-dir={reveal_dir}
                    data-reveal-speed={reveal_speed}
                    data-reveal-delay={reveal_delay}
                    data-reveal-bg={backgroundReveal.color || reveal_bg}
                    data-reveal-bgimage={(backgroundReveal.gradient && backgroundReveal.backgroundState == 'Gradient') ? backgroundReveal.gradient : null}
                    className="gs-reveal-block"
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        pointerEvents: 'none'
                    }}
                ></div>
            )}
        </div>
    );
}

export default RevealWrapper;