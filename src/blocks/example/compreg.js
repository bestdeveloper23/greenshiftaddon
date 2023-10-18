import { PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';

const CSUnitControls = ({ attributes, setAttributes, handleFontSizeChange, handleUnitChange }) => {
  const [fontSize, setFontSize] = useState(attributes.fontSize || '10');
  const [fontUnit, setFontUnit] = useState(attributes.fontUnit || 'px')
  const unitValue = attributes.unit || 'px';
  
  const handleLocalUnitChange = (newUnit) => {
    handleUnitChange(newUnit);
    setFontUnit(newUnit)
    handleFontSizeChange(fontSize, newUnit);
    if(newUnit === 'var'){
      setFontSize('')
    }
  };

  const handleLocalFontSizeChange = (newFontSize) => {
    setFontSize(newFontSize);
    handleFontSizeChange(newFontSize, fontUnit);
  };
  
  return (
    <>
      <InspectorControls>
        <PanelBody title="Custom Unit Controls" initialOpen>
          <TextControl
            label="Font Size"
            value={fontSize}
            onChange={handleLocalFontSizeChange}
            type={fontUnit === 'var' ? 'text' : 'number'}
          />
          <SelectControl
            label="Unit"
            value={unitValue}
            options={[
              { label: 'px', value: 'px' },
              { label: 'em', value: 'em' },
              { label: 'rem', value: 'rem' },
              { label: 'vh', value: 'vh' },
              { label: 'var', value: 'var' },
            ]}
            onChange={(value) => handleLocalUnitChange(value)}
          />
        </PanelBody>
      </InspectorControls>
    </>
  );
};

export default CSUnitControls;
