import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';
import blockIcon from './icon';
import './styles.editor.scss';
import edit from './edit';
import attributes from './attributes';
import CSUnitControls from './compreg';

registerBlockType('greenshift-blocks/exampledev', {
  category: 'greenShiftAddondev',
  icon: blockIcon,
  title: __('Example Block', 'greenshiftaddon'),
  description: __('Example block', 'greenshiftaddon'),
  keywords: [],
  attributes,
  edit: function (props) {
    const { attributes, setAttributes } = props;

    const handleFontSizeChange = (newFontSize, newUnit) => {
      if (newUnit === 'var') {
      document.documentElement.style.setProperty(`--${newFontSize}`, newFontSize);
      const rootStyles = getComputedStyle(document.documentElement);
      const customPropertyValue = rootStyles.getPropertyValue(newFontSize);
      const element = document.querySelector('.gspb_example_value')
      element.style.fontSize = customPropertyValue;

      } else {
        const element = document.querySelector('.gspb_example_value')
        
        const fontSizeValue = `${newFontSize}${newUnit}`;
        element.style.fontSize = fontSizeValue;
      }
      setAttributes({ ...attributes, fontSize: newFontSize, unit: newUnit });
    };

    const handleUnitChange = (newUnit) => {
      setAttributes({ ...attributes, unit: newUnit });
    };

    return (
      <>
        {/* Your edit component */}
        {edit(props)}

        {/* Your CSUnitControls component */}
        <CSUnitControls
          attributes={attributes}
          setAttributes={setAttributes}
          handleFontSizeChange={handleFontSizeChange}
          handleUnitChange={handleUnitChange}
        />
      </>
    );
  },

  save: () => null,
});
