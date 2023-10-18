const { __ } = wp.i18n;
const { useState } = wp.element;

const AnimationSetPanelHead = ({ id, index, props, children }) => {

  const [toogle, setToogle] = useState(false);
  const {
    attributes: { multiple_animation },
    setAttributes,
  } = props;

  const AnimationsList = JSON.parse(multiple_animation).slice();

  const duplicateAnimationSet = (id) => {
    const animationToDuplicate = AnimationsList.find(
      (item) => item._id === id
    );

    const animationClone = (({_id, ...others}) => ({...others}))(animationToDuplicate);
    
    const newAnimation = {
      _id: btoa(Math.random()).substr(10, 8),
      ...animationClone,
    };

    AnimationsList.push(newAnimation);
    setAttributes({ multiple_animation: JSON.stringify(AnimationsList) });
  };

  const removeAnimationSet = (id) => {
    const animationToRemove = AnimationsList.findIndex(
      (item) => item._id === id
    );

    if (animationToRemove >= 0) {
      AnimationsList.splice(animationToRemove, 1);
      setAttributes({ multiple_animation: JSON.stringify(AnimationsList) });
    }
  };


  return (
    <div>
      <div className="gsbp_animation_panel">
        <span className="gsbp_animation_panel__title" onClick={() => setToogle(!toogle)}> {__('Animation')} - {index+1} </span>
        <div className="gsbp_animation_panel__options">
            <span
                className="rhicon rhi-window-restore"
                onClick={() => duplicateAnimationSet(id)}
            ></span>
            <span
                className="rhicon rhi-trash-alt"
                onClick={() => removeAnimationSet(id)}
            ></span>
        </div>
      </div>
      { toogle && children}
    </div>
  );
};

export default AnimationSetPanelHead;
