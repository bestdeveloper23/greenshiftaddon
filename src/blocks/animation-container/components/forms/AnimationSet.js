import animationsTypes from "./Animationstype";

const { __ } = wp.i18n;
import {
  TextControl,
  TreeSelect,
  SelectControl,
  ToggleControl,
  BaseControl,
  __experimentalNumberControl as NumberControl,
  __experimentalAlignmentMatrixControl as AlignmentMatrixControl,
} from "@wordpress/components";
const {
  BlpgeColorPicker,
  RadioAdvanced,
  UnitControl,
  AddRemoveItemButton,
  RuleBuilder,
} = gspblib.components;

const AnimationSet = ({ id, props }) => {
  const {
    attributes: {
      animation_type,
      multiple_animation,
      multikeyframes,
      model_animations,
      td_objects,
    },
    setAttributes,
  } = props;

  const animationTarget =
    JSON.parse(model_animations).find((item) => item._id === id)
  const currentAnimations = JSON.parse(model_animations).slice();

  const updateAnimationSetOption = (field, value) => {
    if (value !== null) {
      currentAnimations.find((v) => v._id === id)[field] = value;
        setAttributes({ model_animations: JSON.stringify(currentAnimations) })
    }
  };

  const resetAnimationOption = (field) => {
    delete currentAnimations.find((v) => v._id === id)[field];
    setAttributes({ model_animations: JSON.stringify(currentAnimations) })
  };

  return (
    <>
      <div className="gs-inspector-form-inspector">
          <TreeSelect
            label="Select object"
            noOptionLabel="Select object"
            onChange={(value) => updateAnimationSetOption("_objectkey", value)}
            // onChange={(value) => console.log(value)}
            selectedId={animationTarget ? animationTarget._objectkey : 0}
            tree={td_objects}
          />
        <div className="gspb_inspector_inputs-row__title gspb_row gspb_row--gutter-20">
          <div class="gspb_row__col--4">
            <BaseControl>
              <UnitControl
                onChange={(value) => updateAnimationSetOption("x", value)}
                label={__("Shift X")}
                units={[
                  { value: "px", label: "px" },
                  { value: "%", label: "%" },
                  { value: "em", label: "em" },
                  { value: "rem", label: "rem" },
                  { value: "vw", label: "vw" },
                  { value: "vh", label: "vh" },
                  { value: "ch", label: "ch" },
                ]}
                value={animationTarget.x}
              />
            </BaseControl>
          </div>
          <div class="gspb_row__col--4">
            <BaseControl>
              <UnitControl
                onChange={(value) => updateAnimationSetOption("y", value)}
                label={__("Y")}
                units={[
                  { value: "px", label: "px" },
                  { value: "%", label: "%" },
                  { value: "em", label: "em" },
                  { value: "rem", label: "rem" },
                  { value: "vw", label: "vw" },
                  { value: "vh", label: "vh" },
                  { value: "ch", label: "ch" },
                ]}
                value={animationTarget.y}
              />
            </BaseControl>
          </div>
          <div class="gspb_row__col--4">
            <BaseControl>
              <UnitControl
                onChange={(value) => updateAnimationSetOption("z", value)}
                label={__("Z")}
                units={[
                  { value: "px", label: "px" },
                  { value: "%", label: "%" },
                  { value: "em", label: "em" },
                  { value: "rem", label: "rem" },
                  { value: "vw", label: "vw" },
                  { value: "vh", label: "vh" },
                  { value: "ch", label: "ch" },
                ]}
                value={animationTarget.z}
              />
            </BaseControl>
          </div>
        </div>
        <div className="gspb_inspector_inputs-row__title gspb_row gspb_row--gutter-20">
          <div class="gspb_row__col--4">
            <BaseControl>
              <NumberControl
                onChange={(value) =>
                  updateAnimationSetOption("rx", parseInt(value))
                }
                label={__("Rotation X")}
                isDragEnabled
                isShiftStepEnabled
                shiftStep={10}
                step={1}
                value={animationTarget.rx}
              />
            </BaseControl>
          </div>
          <div class="gspb_row__col--4">
            <BaseControl>
              <NumberControl
                onChange={(value) =>
                  updateAnimationSetOption("ry", parseInt(value))
                }
                label={__("Y")}
                isDragEnabled
                isShiftStepEnabled
                shiftStep={10}
                step={1}
                value={animationTarget.ry}
              />
            </BaseControl>
          </div>
          <div class="gspb_row__col--4">
            <BaseControl>
              <NumberControl
                onChange={(value) =>
                  updateAnimationSetOption("rz", parseInt(value))
                }
                label={__("Z")}
                isDragEnabled
                isShiftStepEnabled
                shiftStep={10}
                step={1}
                value={animationTarget.rz}
              />
            </BaseControl>
          </div>
        </div>
        <div className="gspb_inspector_inputs-row__title gspb_row gspb_row--gutter-20">
          <div class="gspb_row__col--4">
            <BaseControl>
              <NumberControl
                onChange={(value) =>
                  updateAnimationSetOption("sx", parseFloat(value))
                }
                label={__("Scale X")}
                isDragEnabled
                isShiftStepEnabled
                shiftStep={1}
                min={0}
                max={30}
                step={0.1}
                value={animationTarget.sx}
              />
            </BaseControl>
          </div>
          <div class="gspb_row__col--4">
            <BaseControl>
              <NumberControl
                onChange={(value) =>
                  updateAnimationSetOption("sy", parseFloat(value))
                }
                label={__("Y")}
                isDragEnabled
                isShiftStepEnabled
                shiftStep={1}
                min={0}
                max={30}
                step={0.1}
                value={animationTarget.sy}
              />
            </BaseControl>
          </div>
          <div class="gspb_row__col--4">
            <BaseControl>
              <NumberControl
                onChange={(value) =>
                  updateAnimationSetOption("sz", parseFloat(value))
                }
                label={__("Y")}
                isDragEnabled
                isShiftStepEnabled
                shiftStep={1}
                min={0}
                max={30}
                step={0.1}
                value={animationTarget.sz}
              />
            </BaseControl>
          </div>
        </div>
        <BaseControl className="gs-label-row">
          <NumberControl
            onChange={(value) => updateAnimationSetOption("o", parseInt(value))}
            label={__("Opacity")}
            isDragEnabled
            isShiftStepEnabled
            shiftStep={10}
            min={0}
            step={1}
            max={100}
            value={animationTarget.o}
          />
        </BaseControl>
        {!multikeyframes && (
          <BaseControl className="gs-label-row">
            <NumberControl
              onChange={(value) =>
                updateAnimationSetOption("duration", parseFloat(value))
              }
              label={__("Duration")}
              isDragEnabled
              isShiftStepEnabled
              shiftStep={1}
              min={0.1}
              max={120}
              step={0.1}
              value={animationTarget.duration ? animationTarget.duration : 1}
            />
          </BaseControl>
        )}
        <BaseControl className="gs-label-row">
          <NumberControl
            onChange={(value) =>
              updateAnimationSetOption("delay", parseFloat(value))
            }
            label={__("Delay")}
            isDragEnabled
            isShiftStepEnabled
            shiftStep={1}
            min={0}
            max={20}
            step={0.1}
            value={animationTarget.delay ? animationTarget.delay : null}
          />
        </BaseControl>
        <div className="gspb_row">
          <div className="gspb_row__col--8" style={{ padding: 0 }}>
            {__("Ease type")}
          </div>
          <div className="gspb_row__col--4" style={{ padding: 0 }}>
            <SelectControl
              value={animationTarget.ease ? animationTarget.ease : null}
              options={animationsTypes}
              onChange={(value) => updateAnimationSetOption("ease", value)}
            />
          </div>
        </div>
        <div className="gspb_row" style={{ marginBottom: 15 }}>
          <div className="gspb_row__col--10" style={{ padding: 0 }}>
            <span className="gspb_inspector_property-title">
              {__("Use values as additive", "greenshiftgsap")}
            </span>
          </div>
          <div
            className="gspb_row__col--2"
            style={{ marginTop: "5px", padding: 0 }}
          >
            <ToggleControl
              checked={animationTarget.additive === "yes" ? true : false}
              onChange={(value) =>
                updateAnimationSetOption(
                  "additive",
                  value == true ? "yes" : "no"
                )
              }
            />
          </div>
        </div>
        <hr style={{ margin: "1em 0" }} />
        {animationTarget.customProps &&
          animationTarget.customProps.map((item, index) => {
            return (
              <div
                className="gspb_row gspb_row--gutter-20"
                style={{ marginBottom: 5 }}
              >
                <div className="gspb_row__col--6" style={{ padding: 0 }}>
                  <TextControl
                    value={item.name}
                    autocomplete="off"
                    onChange={(value) => {
                      let argscustomProps = animationTarget.customProps
                        ? animationTarget.customProps.slice()
                        : [];
                      argscustomProps[index].name = value;
                      updateAnimationSetOption("customProps", argscustomProps);
                    }}
                    placeholder={__(
                      "Property name",
                      "greenshift-animation-and-page-builder-blocks"
                    )}
                  />
                </div>
                <div className="gspb_row__col--6" style={{ padding: 0 }}>
                  <TextControl
                    value={item.value}
                    autocomplete="off"
                    onChange={(value) => {
                      let argscustomProps = animationTarget.customProps
                        ? animationTarget.customProps.slice()
                        : [];
                      argscustomProps[index].value = value;
                      updateAnimationSetOption("customProps", argscustomProps);
                    }}
                    placeholder={__(
                      "Property value",
                      "greenshift-animation-and-page-builder-blocks"
                    )}
                  />
                </div>
              </div>
            );
          })}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          className="gspb_nomargin_component"
        >
          <span>
            {__("Add custom", "greenshift-animation-and-page-builder-blocks")}
          </span>
          <AddRemoveItemButton
            handleAddClick={() => {
              let argscustomProps = animationTarget.customProps
                ? animationTarget.customProps
                : [];
              argscustomProps.push({ name: "", value: "" });
              updateAnimationSetOption("customProps", argscustomProps);
            }}
            handleRemoveClick={() => {
              let argscustomProps = animationTarget.customProps
                ? animationTarget.customProps
                : [];
              argscustomProps.pop();
              updateAnimationSetOption("customProps", argscustomProps);
            }}
          />
        </div>
        <div style={{ marginTop: 10 }}></div>
        <>
          <hr style={{ marginBottom: 15, marginTop: 15 }} />
          {!multikeyframes && (
            <>
              <div style={{ marginTop: 5, marginBottom: 15 }}></div>
              <RadioAdvanced
                value={animationTarget.from}
                label={__("Set Direction", "greenshiftgsap")}
                fluid={""}
                onChange={(value) => updateAnimationSetOption("from", value)}
                options={[
                  { label: "From", value: "yes", title: __("From Value") },
                  { label: "To", value: "no", title: __("To Value") },
                ]}
              />

              <div style={{ marginBottom: 6 }}>{__("Custom start time")}</div>
              <TextControl
                value={animationTarget.time ? animationTarget.time : null}
                onChange={(value) => updateAnimationSetOption("time", value)}
                help={<DocLink />}
              />

              <div className="gspb-selector-input-with-text">
                <TextControl
                  value={animationTarget.obj ? animationTarget.obj : null}
                  onChange={(value) => updateAnimationSetOption("obj", value)}
                  label={__("Custom action object")}
                />
                <div className="gspb-selector-popup-in-textfield">
                  <RuleBuilder
                    enableJS={false}
                    enableTriggerIndex={false}
                    hoverClasses={false}
                    currentLayer={false}
                    applyStyle={(value) => {
                      updateAnimationSetOption("obj", value);
                    }}
                  >
                    <i className="rhicon rhi-cog"></i>
                  </RuleBuilder>
                </div>
              </div>

              <hr style={{ marginBottom: 25, marginTop: 15 }} />
            </>
          )}
        </>
      </div>
    </>
  );
};
export default AnimationSet;

const DocLink = () => {
  return (
    <>
      <a href="https://greensock.com/docs/v3/GSAP/Timeline" target="__blank">
        {" "}
        Documentation{" "}
      </a>
    </>
  );
};

const OriginDocLink = () => {
  return (
    <>
      left, right, top, bottom -{" "}
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin"
        target="__blank"
      >
        {" "}
        Check documentation{" "}
      </a>
    </>
  );
};
