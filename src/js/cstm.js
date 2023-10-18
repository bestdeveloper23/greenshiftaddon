import { PanelBody, RangeControl, TextControl } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";
import { registerPlugin } from "@wordpress/plugins";
import { PluginDocumentSettingPanel } from "@wordpress/edit-post";
import { useState, useEffect } from "@wordpress/element";

const CustomUnitControls = ({label}) => {
  const [customOption, setCustomOption] = useState("");
  const [customValue, setCustomValue] = useState("");

  const handleInputChange = (newValue) => {
    setCustomValue(newValue);
  };

  // Function to fetch variable value from CSS
  const getVariableValue = () => {
    // Implement the logic to fetch the variable value from CSS and return it
    // Example: fetch variable value by parsing CSS or using a CSS-in-JS library
    return "10px"; // Return a sample value for demonstration
  };

  const handleOptionChange = (newOption) => {
    setCustomOption(newOption);
    if (newOption === "var") {
      const value = getVariableValue(); // Fetch value from CSS variable
      setCustomValue(value);
    }
  };

  useEffect(() => {
    // Replace the UnitControl component with CustomUnitControls
    wp.hooks.addFilter("editor.BlockEdit", "my-plugin/replace-unit-control", (BlockEdit) => {
      return (props) => {
        if (props.name === "core/button") {
          return <CustomUnitControls  label = {label}/>;
        }
        return <BlockEdit {...props} />;
      };
    });

    // Cleanup the filter when component is unmounted
    return () => {
      wp.hooks.removeFilter("editor.BlockEdit", "my-plugin/replace-unit-control");
    };
  }, []);

  return (
    <>
      <InspectorControls>
        <PanelBody title="Custom Unit Controls" initialOpen>
          <RangeControl label="Margin" />
          <RangeControl label="Padding" />
          <RangeControl label="Font Size" />

          <TextControl
            label="Variable Option"
            value={customOption}
            onChange={handleOptionChange}
          />

          {customOption === "var" && (
            <TextControl
              label="Variable Value"
              value={customValue}
              onChange={handleInputChange}
            />
          )}
        </PanelBody>
      </InspectorControls>
    </>
  );
};

registerPlugin("custom-unit-controls-kds", {
  render: CustomUnitControls,
});