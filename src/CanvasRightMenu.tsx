import React from 'react';
import { ChromePicker } from 'react-color';

import { useDispatch, useSelector } from 'react-redux';
import { canvasState } from './canvasReducer';
import { changeColor, changeOpacity, resetCanvas } from './actions';

import Slider from './Slider';
import './rightMenu.css';

const CanvasRightMenu: React.FC<{}> = () => {
  const color = useSelector<canvasState, string>((state) => state.color);
  const opacity = useSelector<canvasState, string>((state) => state.opacity);

  const dispatch = useDispatch();

  const onChangeColor = (rgb: any) => {
    const rgbStr = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
    dispatch(changeColor(rgbStr));
  };

  const onChangeOpacity = (e: React.ChangeEvent<HTMLInputElement>): any => {
    dispatch(changeOpacity(e.target.value));
  };

  const clearCanvas = () => {
    localStorage.setItem('imageData', '');
    dispatch(resetCanvas());
  };

  return (
    <div className='canvasRightWrapper'>
      <ChromePicker
        color={color}
        onChangeComplete={(event) => onChangeColor(event.rgb)}
        disableAlpha={true}
      />
      <div className='opacityArea'>
        <p>Opacity</p>
        <Slider
          type='opacity'
          onChange={onChangeOpacity}
          currentValue={opacity}
        />
      </div>
      <button type='button' onClick={clearCanvas}>
        clear
      </button>
    </div>
  );
};

export default CanvasRightMenu;
