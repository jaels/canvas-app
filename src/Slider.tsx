import React from 'react';
import './App.scss';

const Slider: React.FC<{ type: string }> = ({ type }) => {
  const getValues = (type: string) => {
    switch (type) {
      case 'opacity':
        return { min: 0, max: 100, defaultValue: 50, units: '%' };
        break;
      case 'brushSize':
        return { min: 1, max: 50, defaultValue: 4, units: 'px' };
        break;
      default:
        return { min: 0, max: 100, defaultValue: 50 };
    }
  };

  const values = getValues(type);

  return (
    <div className='sliderWrapper'>
      <p>{values.defaultValue}</p>
      <input
        type='range'
        min={values.min}
        max={values.max}
        value={values.defaultValue}
      />
    </div>
  );
};

export default Slider;
