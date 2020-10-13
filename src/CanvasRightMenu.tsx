import React from 'react';
import { ChromePicker } from 'react-color';

import { useDispatch, useSelector } from 'react-redux';
import { canvasState } from './canvasReducer';
import {
  changeColor,
  changeOpacity,
  resetCanvas,
  exportCanvas,
  loadCanvas,
} from './actions';

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

  const onExportCanvas = () => {
    dispatch(exportCanvas(true));
  };

  const onLoadCanvas = (e: any) => {
    dispatch(loadCanvas(e.target.files[0]));
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
      <div className='buttonsArea'>
        <button className='menuButton' type='button' onClick={clearCanvas}>
          Clear
        </button>
        <button className='menuButton' type='button' onClick={onExportCanvas}>
          Export
        </button>
        <div>
          <p>Load</p>
          <input type='file' id='load' onChange={onLoadCanvas} />
        </div>
      </div>
    </div>
  );
};

export default CanvasRightMenu;
