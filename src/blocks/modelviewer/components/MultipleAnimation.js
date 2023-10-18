import AnimationSet from './forms/AnimationSet';
import AnimationSetPanelHead from './forms/AnimationSetPanelHead';
const { Fragment } = wp.element;
const { Button, BaseControl, ToggleControl } = wp.components;
const { __ } = wp.i18n;

const MultipleAnimation = (props) => {
  const {
    attributes: { multiple_animation, multikeyframes },
    setAttributes,
  } = props;

  let AnimationsList = JSON.parse(multiple_animation).slice();

  const addAniamtion = () => {
    const animation = { _id: btoa(Math.random()).substr(10, 8) };
    AnimationsList.push(animation);
    setAttributes({ multiple_animation: JSON.stringify(AnimationsList) });
  };

  return (
    <Fragment>
      {AnimationsList.map((item, index) => {
        return (
          <AnimationSetPanelHead id={item._id} index={index} props={props}>
            <AnimationSet props={props} id={item._id} />
          </AnimationSetPanelHead>
        );
      })}
      <Button isPrimary onClick={() => addAniamtion()}>
        {__("Add Animation")}
      </Button>
      <hr style={{ marginTop: 10, marginBottom: 10 }} />
      <BaseControl help={__("When you enable Common Timeline option, each animation will use easing and duration from main animation and will work each after another as common timeline. If you disable this option, each animation can work independently and after main animation", 'greenshiftgsap')}>
        <ToggleControl
          label={__("Common Timeline enable?")}
          checked={multikeyframes}
          onChange={(value) => setAttributes({multikeyframes: value})} />
      </BaseControl>
    </Fragment>
  );
};
export default MultipleAnimation;
