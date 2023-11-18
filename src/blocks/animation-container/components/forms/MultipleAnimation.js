import AnimationSet from './AnimationSet';
import AnimationSetPanelHead from './AnimationSetPanelHead';
const { Fragment } = wp.element;
const { Button, BaseControl, ToggleControl } = wp.components;
const { __ } = wp.i18n;

const MultipleAnimation = (props) => {
  const {
    attributes: { animation_type, selected_object, multiple_animation, multikeyframes, model_animations },
    setAttributes,
  } = props;

  let AnimationsList = animation_type !== "3d_model" ? JSON.parse(multiple_animation).slice() : JSON.parse(model_animations).slice();

  const addAniamtion = () => {
    // if (animation_type === "3d_model" && !selected_object) return;
    const animation = (animation_type === "3d_model") ? { _id: btoa(Math.random()).substr(10, 8) } : { _id: btoa(Math.random()).substr(10, 8) };
    AnimationsList.push(animation);
    animation_type === "3d_model" ? setAttributes({ model_animations: JSON.stringify(AnimationsList) }) : setAttributes({ multiple_animation: JSON.stringify(AnimationsList) });
    console.log("Multiple animation list: ", AnimationsList)
  };

  return (
    <Fragment>
      {/* {animation_type !== "3d_model" ? AnimationsList.map((item, index) => { */}
      {AnimationsList.map((item, index) => {
        return (
          <AnimationSetPanelHead id={item._id} index={index} props={props}>
            <AnimationSet props={props} id={item._id} />
          </AnimationSetPanelHead>
        );
      })
      //  : AnimationsList.filter(obj => obj._objectkey === selected_object).map((item, index) => {
      //   return (
      //     <AnimationSetPanelHead id={item._id} index={index} props={props}>
      //       <AnimationSet props={props} id={item._id} />
      //     </AnimationSetPanelHead>
      //   );
      // })
      }
      <Button isPrimary onClick={() => addAniamtion()}>
        {__("Add Animation")}
      </Button>
      <hr style={{ marginTop: 10, marginBottom: 10 }} />
      <BaseControl help={__("When you enable Common Timeline option, each animation will use easing and duration from main animation and will work each after another as common timeline. If you disable this option, each animation can work independently and after main animation", 'greenshiftgsap')}>
        <ToggleControl
          label={__("Common Timeline enable?")}
          checked={multikeyframes}
          onChange={(value) => setAttributes({ multikeyframes: value })} />
      </BaseControl>
    </Fragment>
  );
};
export default MultipleAnimation;
