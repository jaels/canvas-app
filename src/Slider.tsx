import React from 'react';
import './App.scss';

interface SliderProps {
  type: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): string;
  currentValue: string;
}

const Slider: React.FC<SliderProps> = ({ type, onChange, currentValue }) => {
  const getValues = (type: string) => {
    switch (type) {
      case 'opacity':
        return { min: '0', max: '100', units: '%' };
      case 'brushSize':
        return { min: '1', max: '50', units: 'px' };
      default:
        return { min: '0', max: '100' };
    }
  };

  const values = getValues(type);

  return (
    <div className='sliderWrapper'>
      <p className='sliderValue'>
        {currentValue}
        {values.units}
      </p>
      <input
        type='range'
        min={values.min}
        max={values.max}
        value={currentValue}
        onChange={onChange}
      />
    </div>
  );
};

export default Slider;
