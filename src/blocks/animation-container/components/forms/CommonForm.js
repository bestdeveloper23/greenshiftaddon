import { __ } from "@wordpress/i18n";
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import {
  PanelBody,
  TextControl,
  SelectControl,
  ToggleControl,
  BaseControl,
  __experimentalNumberControl as NumberControl,
  Button,
  __experimentalAlignmentMatrixControl as AlignmentMatrixControl,
  Dropdown,
  TextareaControl,
  DropdownMenu,
} from "@wordpress/components";

const { Shadow } = gspblib.collections;
const {
  GsbpFormLabel,
  OptionsGroupSet,
  StylesforBlock,
  BlpgeColorPicker,
  RadioAdvanced,
  UnitControl,
  AddRemoveItemButton,
} = gspblib.components;
import {
  rtransform,
  ttransform,
  svgtransform,
  svgdraw,
  staggertransform,
  svgmorph,
  batchicon,
  threedmodel,
} from "../icons.js";

const CommonForm = (props) => {
  const {
    attributes: {
      animation_type,
      x,
      y,
      z,
      xo,
      yo,
      r,
      rx,
      ry,
      rz,
      s,
      sx,
      sy,
      sz,
      o,
      background,
      origin,
      custom_origin,
      strandom,
      stchild,
      text,
      stagger,
      stdelay,
      path,
      path_align,
      path_orient,
      path_align_x,
      path_align_y,
      path_start,
      path_end,
      morphend,
      morphstart,
      morphorigin,
      id,
      batchint,
      batchchild,
      batchrandom,
      customtrigger,
      batchonce,
      textmask,
      skewX,
      skewY,
      xM,
      yM,
      zM,
      xoM,
      yoM,
      rM,
      rxM,
      ryM,
      rzM,
      sM,
      sxM,
      syM,
      szM,
      oM,
      skewXM,
      skewYM,
      useMobile,
      triggerstartM,
      triggerendM,
      varwidth,
      varheight,
      winwidth,
      winheight,
      videoplay,
      color,
      clipInit,
      clipFinal,
      customProps,
      customPropsM,
      model_url,
      variables,
      splineApp,
      splinezoom,
      zoomIn
    },
    setAttributes,
  } = props;

  function animationReset() {
    setAttributes({
      x: "",
      y: "",
      z: "",
      xo: "",
      yo: "",
      s: "",
      sx: "",
      sy: "",
      r: "",
      rx: "",
      ry: "",
      skewX: "",
      skewY: "",
      background: "",
      origin: "",
      shadow: "",
      o: null,
      xM: "",
      yM: "",
      zM: "",
      xoM: "",
      yoM: "",
      sM: "",
      sxM: "",
      syM: "",
      rM: "",
      rxM: "",
      ryM: "",
      skewXM: "",
      skewYM: "",
      oM: null,
    });
  }

  let mobileOptions = (
    <div
      className="gspb_inspector_advancedOptionsWrraper gspb_inspector"
      style={{ minWidth: 220 }}
    >
      <div className="gspb_row gspb_row--no-padding-col">
        <div className="gspb_row__col--9">
          <span className="gspb_inspector_property-title">
            {__("Mobile Options", "greenshiftgsap")}
          </span>
        </div>
        <div className="gspb_row__col--2" style={{ marginTop: "5px" }}>
          <ToggleControl
            checked={useMobile}
            onChange={(value) => setAttributes({ useMobile: value })}
          />
        </div>
      </div>
      <div className="gspb_inspector_inputs-row__title gspb_row gspb_row--gutter-20">
        <div class="gspb_row__col--4">
          <BaseControl>
            <UnitControl
              units={[
                { value: "px", label: "px" },
                { value: "%", label: "%" },
                { value: "em", label: "em" },
                { value: "rem", label: "rem" },
                { value: "vw", label: "vw" },
                { value: "vh", label: "vh" },
                { value: "ch", label: "ch" },
              ]}
              onChange={(value) => setAttributes({ xM: value })}
              label={__("Shift X", "greenshiftgsap")}
              value={xM}
            />
          </BaseControl>
        </div>
        <div class="gspb_row__col--4">
          <BaseControl>
            <UnitControl
              units={[
                { value: "px", label: "px" },
                { value: "%", label: "%" },
                { value: "em", label: "em" },
                { value: "rem", label: "rem" },
                { value: "vw", label: "vw" },
                { value: "vh", label: "vh" },
                { value: "ch", label: "ch" },
              ]}
              onChange={(value) => setAttributes({ yM: value })}
              label={__("Y")}
              value={yM}
            />
          </BaseControl>
        </div>
        <div class="gspb_row__col--4">
          <BaseControl>
            <UnitControl
              units={[
                { value: "px", label: "px" },
                { value: "%", label: "%" },
                { value: "em", label: "em" },
                { value: "rem", label: "rem" },
                { value: "vw", label: "vw" },
                { value: "vh", label: "vh" },
                { value: "ch", label: "ch" },
              ]}
              onChange={(value) => setAttributes({ zM: value })}
              label={__("Z")}
              value={zM}
            />
          </BaseControl>
        </div>
      </div>
      <div className="gspb_inspector_inputs-row__title gspb_row gspb_row--gutter-20">
        <div class="gspb_row__col--4">
          <BaseControl>
          
            <NumberControl
              onChange={(value) => setAttributes({ rxM: parseInt(value) })}
              label={__("Rotation X", "greenshiftgsap")}
              isDragEnabled
              isShiftStepEnabled
              shiftStep={10}
              step={1}
              value={rxM}
            />
          </BaseControl>
        </div>
        <div class="gspb_row__col--4">
          <BaseControl>
            <NumberControl
              onChange={(value) => setAttributes({ ryM: parseInt(value) })}
              label={__("Y")}
              isDragEnabled
              isShiftStepEnabled
              shiftStep={10}
              step={1}
              value={ryM}
            />
          </BaseControl>
        </div>
        <div class="gspb_row__col--4">
          <BaseControl>
            <NumberControl
              onChange={(value) => setAttributes({ rzM: parseInt(value) })}
              label={__("Z")}
              isDragEnabled
              isShiftStepEnabled
              shiftStep={10}
              step={1}
              value={rzM}
            />
          </BaseControl>
        </div>
      </div>
      <div className="gspb_inspector_inputs-row__title gspb_row gspb_row--gutter-20">
        <div class="gspb_row__col--4">
          <BaseControl>
            <NumberControl
              onChange={(value) => setAttributes({ sxM: parseFloat(value) })}
              label={__("Scale X", "greenshiftgsap")}
              isDragEnabled
              isShiftStepEnabled
              shiftStep={1}
              min={0}
              max={30}
              step={0.1}
              value={sxM}
            />
          </BaseControl>
        </div>
        <div class="gspb_row__col--4">
          <BaseControl>
            <NumberControl
              onChange={(value) => setAttributes({ syM: parseFloat(value) })}
              label={__("Y")}
              isDragEnabled
              isShiftStepEnabled
              shiftStep={1}
              min={0}
              max={30}
              step={0.1}
              value={syM}
            />
          </BaseControl>
        </div>
        <div class="gspb_row__col--4">
          <BaseControl>
            <NumberControl
              onChange={(value) => setAttributes({ szM: parseFloat(value) })}
              label={__("Z")}
              isDragEnabled
              isShiftStepEnabled
              shiftStep={1}
              min={0}
              max={30}
              step={0.1}
              value={szM}
            />
          </BaseControl>
        </div>
      </div>
      <hr style={{ margin: "1em 0" }} />
      {customPropsM &&
        customPropsM.map((item, index) => {
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
                    let argscustomPropsM = customPropsM
                      ? customPropsM.slice()
                      : [];
                    argscustomPropsM[index].name = value;
                    setAttributes({ customPropsM: argscustomPropsM });
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
                    let argscustomPropsM = customPropsM
                      ? customPropsM.slice()
                      : [];
                    argscustomPropsM[index].value = value;
                    setAttributes({ customPropsM: argscustomPropsM });
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
            let argscustomPropsM = customPropsM ? customPropsM.slice() : [];
            argscustomPropsM.push({ name: "", value: "" });
            setAttributes({ customPropsM: argscustomPropsM });
          }}
          handleRemoveClick={() => {
            let argscustomPropsM = customPropsM ? customPropsM.slice() : [];
            argscustomPropsM.pop();
            setAttributes({ customPropsM: argscustomPropsM });
          }}
        />
      </div>
      <div style={{ marginTop: 10 }}></div>
      <hr style={{ marginBottom: 15, marginTop: 15 }} />
      <>
        <span className="gspb_inspector_property-title">
          {__("Trigger start", "greenshiftgsap")}
        </span>
        <TextControl
          value={triggerstartM}
          onChange={(value) => setAttributes({ triggerstartM: value })}
        />
      </>
      <>
        <span className="gspb_inspector_property-title">
          {__("Trigger end")}
        </span>
        <TextControl
          value={triggerendM}
          onChange={(value) => setAttributes({ triggerendM: value })}
        />
      </>
      <div style={{ marginTop: 10 }}>
        {__(
          "Mobile options currently work only on frontend side",
          "greenshiftgsap"
        )}
      </div>
    </div>
  );

  let varwidthopen = (
    <div style={{ minWidth: 220 }}>
      <span className="gspb_inspector_property-title">
        {__("Attach width of element", "greenshift")}{" "}
      </span>
      <RadioAdvanced
        value={varwidth}
        label={""}
        fluid={"yes"}
        onChange={(value) => {
          setAttributes({
            varwidth: value,
          });
        }}
        options={[
          { label: "No", value: null, title: __("No", "greenshift") },
          {
            label: "+ Width",
            value: "width",
            title: __("Attach Width", "greenshift"),
          },
          {
            label: "- Width",
            value: "minuswidth",
            title: __("Attach Negative width", "greenshift"),
          },
        ]}
      />
      <span className="gspb_inspector_property-title">
        {__("Attach width of window", "greenshift")}{" "}
      </span>
      <RadioAdvanced
        value={winwidth}
        label={""}
        fluid={"yes"}
        onChange={(value) => {
          setAttributes({
            winwidth: value,
          });
        }}
        options={[
          { label: "No", value: null, title: __("No", "greenshift") },
          {
            label: "+ Width",
            value: "width",
            title: __("Attach Width", "greenshift"),
          },
          {
            label: "- Width",
            value: "minuswidth",
            title: __("Attach Negative width", "greenshift"),
          },
        ]}
      />
    </div>
  );

  let varheightopen = (
    <div style={{ minWidth: 220 }}>
      <span className="gspb_inspector_property-title">
        {__("Attach height of element", "greenshift")}{" "}
      </span>
      <RadioAdvanced
        value={varheight}
        label={""}
        fluid={"yes"}
        onChange={(value) => {
          setAttributes({
            varheight: value,
          });
        }}
        options={[
          { label: "No", value: null, title: __("No", "greenshift") },
          {
            label: "+ Height",
            value: "height",
            title: __("Attach Height", "greenshift"),
          },
          {
            label: "- Height",
            value: "minusheight",
            title: __("Attach Negative Height", "greenshift"),
          },
        ]}
      />
      <span className="gspb_inspector_property-title">
        {__("Attach height of window", "greenshift")}{" "}
      </span>
      <RadioAdvanced
        value={winheight}
        label={""}
        fluid={"yes"}
        onChange={(value) => {
          setAttributes({
            winheight: value,
          });
        }}
        options={[
          { label: "No", value: null, title: __("No", "greenshift") },
          {
            label: "+ Height",
            value: "height",
            title: __("Attach Height", "greenshift"),
          },
          {
            label: "- Height",
            value: "minusheight",
            title: __("Attach Negative Height", "greenshift"),
          },
        ]}
      />
    </div>
  );

  return (
    <div className="gs-inspector-form-inspector">
      <PanelBody initialOpen={true} title={__("Spline model loader")}>
        <div
          className={`${
            props.attributes.loading ? " gspb_loader_line_label" : ""
          }`}
        >
          <TextControl
            label={__("File URL")}
            value={model_url}
            onChange={(value) => {
              setAttributes({
                model_url: value,
              });
            }}
          />
        </div>
        <MediaUploadCheck>
          <MediaUpload
            onSelect={(media) => setAttributes({ model_url: media.url })}
            allowedTypes={["glb", "gltf"]}
            value={model_url}
            render={({ open }) => (
              <Button isSecondary onClick={open}>
                {__("Upload spline file")}
              </Button>
            )}
          />
        </MediaUploadCheck>
      </PanelBody>
      
      <>
        <div className="gspb_inspector_inputs-row__title gspb_row gspb_row--gutter-20">
          <div class="gspb_row__col--4">
            <BaseControl>
              <NumberControl
                onChange={(value) => setAttributes({ rx: parseInt(value) })}
                label={__("Rotation X", "greenshiftgsap")}
                isDragEnabled
                isShiftStepEnabled
                shiftStep={10}
                step={1}
                value={rx}
              />
            </BaseControl>
          </div>
          <div class="gspb_row__col--4">
            <BaseControl>
              <NumberControl
                onChange={(value) => setAttributes({ ry: parseInt(value) })}
                label={__("Y")}
                isDragEnabled
                isShiftStepEnabled
                shiftStep={10}
                step={1}
                value={ry}
              />
            </BaseControl>
          </div>
          <div class="gspb_row__col--4">
            <BaseControl>
              <NumberControl
                onChange={(value) => setAttributes({ rz: parseInt(value) })}
                label={__("Z")}
                isDragEnabled
                isShiftStepEnabled
                shiftStep={10}
                step={1}
                value={rz}
              />
            </BaseControl>
          </div>
        </div>
        <div className="gspb_inspector_inputs-row__title gspb_row gspb_row--gutter-20">
          <div className="gspb_row__col--6" style={{ padding: 0 }}>
            <span className="gspb_inspector_property-title">
            {__("Zoom", "greenshiftgsap")}
            </span>
          </div>
          <div className="gspb_row__col--6" style={{ padding: 0 }}>
            <BaseControl>
              {/* <NumberControl
                onChange={(value) => setAttributes({ splinezoom: parseInt(value) })}
                label={__("Scale")}
                isDragEnabled
                isShiftStepEnabled
                shiftStep={10}
                step={0.1}
                value={splinezoom ? splinezoom : 1}
                min={0.00000001}
                max={100}
              /> */}
              <button
                className="components-button components-icon-button components-toolbar__control"
                onClick={() => {let zoom = zoomIn*1.1; setAttributes({splinezoom: 1.1, zoomIn: zoom})}}
              >
                <i
                  class="rhicon rhi-plus"
                  style={{
                    margin: "auto",
                    fontSize: "20px",
                  }}
                />
              </button>
              <button
                className="components-button components-icon-button components-toolbar__control"
                onClick={() => {let zoom = zoomIn*0.9; setAttributes({splinezoom: 0.9, zoomIn: zoom})}}
              >
                <i
                  class="rhicon rhi-minus"
                  style={{
                    margin: "auto",
                    fontSize: "20px",
                  }}
                />
              </button>
            </BaseControl>
          </div>
          {/* <div class="gspb_row__col--4">
            <BaseControl>
              <NumberControl
                onChange={(value) => setAttributes({ sx: parseFloat(value) })}
                label={__("Scale X", "greenshiftgsap")}
                isDragEnabled
                isShiftStepEnabled
                shiftStep={1}
                min={0}
                max={1000}
                step={0.1}
                value={sx}
              />
            </BaseControl>
          </div>
          <div class="gspb_row__col--4">
            <BaseControl>
              <NumberControl
                onChange={(value) => setAttributes({ sy: parseFloat(value) })}
                label={__("Y")}
                isDragEnabled
                isShiftStepEnabled
                shiftStep={1}
                min={0}
                max={1000}
                step={0.1}
                value={sy}
              />
            </BaseControl>
          </div>
          <div class="gspb_row__col--4">
            <BaseControl>
              <NumberControl
                onChange={(value) => setAttributes({ sz: parseFloat(value) })}
                label={__("Z")}
                isDragEnabled
                isShiftStepEnabled
                shiftStep={1}
                min={0}
                max={1000}
                step={0.1}
                value={sz}
              />
            </BaseControl>
          </div> */}
        </div>
      
        <div
          className="gspb_row gspb_row--no-padding-col"
          style={{ marginTop: "10px", width: "100%" }}
        >
          <div
            className="gspb_row__col--10"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div>{__("Use separate for mobile", "greenshiftgsap")}</div>
          </div>
          <div className="gspb_row__col--2">
            <Dropdown
              position="bottom left"
              renderToggle={({ onToggle }) => (
                <div>
                  <button
                    className="components-button components-icon-button components-toolbar__control"
                    style={{ color: useMobile ? "#2184f9" : "#111111" }}
                    onClick={onToggle}
                  >
                    <i
                      class="rhicon rhi-cog"
                      style={{
                        margin: "auto",
                        fontSize: "20px",
                      }}
                    />
                  </button>
                </div>
              )}
              renderContent={({ onToggle }) => mobileOptions}
            />
          </div>
        </div>

        <PanelBody initialOpen={true} title={__("Spline variables")}>
          {variables &&
            variables.map((item, index) => {
              return (
                <div
                  className="gspb_row gspb_row--gutter-20"
                  style={{ marginBottom: 5 }}
                >
                  <div className="gspb_row__col--6" style={{ padding: 0 }}>
                    <span className="gspb_inspector_property-title">
                      {item.name}
                    </span>
                  </div>
                  <div className="gspb_row__col--6" style={{ padding: 0 }}>
                    <TextControl
                      value={item.value}
                      autocomplete="off"
                      onChange={(value) => {
                        let argsvariables = variables
                          ? variables.slice()
                          : [];
                        argsvariables[index].value = value;
                        setAttributes({ variables: argsvariables });
                      }}
                      placeholder={__(
                        "value",
                        "greenshift-animation-and-page-builder-blocks"
                      )}
                    />
                  </div>
                </div>
              );
            })}
          {splineApp && (
            <div style={{ marginBottom: 10 }}>
              {__("Spline App id", "greenshiftgsap")} <br />
              <br />
              <i style={{ color: "#2184f9" }}>{splineApp}</i>
            </div>
          )}
        </PanelBody>
        <hr style={{ margin: "1em 0" }} />
        {customProps &&
          customProps.map((item, index) => {
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
                      let argscustomProps = customProps
                        ? customProps.slice()
                        : [];
                      argscustomProps[index].name = value;
                      setAttributes({ customProps: argscustomProps });
                      console.log(customProps);
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
                      let argscustomProps = customProps
                        ? customProps.slice()
                        : [];
                      argscustomProps[index].value = value;
                      setAttributes({ customProps: argscustomProps });
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
              let argscustomProps = customProps ? customProps.slice() : [];
              argscustomProps.push({ name: "", value: "" });
              setAttributes({ customProps: argscustomProps });
            }}
            handleRemoveClick={() => {
              let argscustomProps = customProps ? customProps.slice() : [];
              argscustomProps.pop();
              setAttributes({ customProps: argscustomProps });
            }}
          />
        </div>
        <div style={{ marginTop: 10 }}></div>
      </>
    </div>
  );
};

export default CommonForm;

const OriginDocLink = () => {
  return (
    <>
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin"
        target="__blank"
      >
        {__("Check documentation", "greenshiftgsap")}
      </a>
    </>
  );
};
