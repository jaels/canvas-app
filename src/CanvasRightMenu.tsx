import React from 'react';
import { ChromePicker } from 'react-color';

import { useDispatch, useSelector } from 'react-redux';
import { canvasState } from './canvasReducer';
import {
  changeColor,
  changeOpacity,
  changeBrushSize,
  resetCanvas,
  exportCanvas,
  loadCanvas,
} from './actions';

import Slider from './Slider';
import './rightMenu.css';

const CanvasRightMenu: React.FC<{}> = () => {
  const color = useSelector<canvasState, string>((state) => state.color);
  const opacity = useSelector<canvasState, string>((state) => state.opacity);
  const brushSize = useSelector<canvasState, string>(
    (state) => state.brushSize
  );

  const dispatch = useDispatch();

  const onChangeColor = (rgb: any) => {
    const rgbStr = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
    dispatch(changeColor(rgbStr));
  };

  const onChangeOpacity = (e: React.ChangeEvent<HTMLInputElement>): any => {
    dispatch(changeOpacity(e.target.value));
  };
  const onChangeBrushSize = (e: React.ChangeEvent<HTMLInputElement>): any => {
    dispatch(changeBrushSize(e.target.value));
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
      <div className='sliderArea'>
        <p className='sliderTitle'>Opacity</p>
        <Slider
          type='opacity'
          onChange={onChangeOpacity}
          currentValue={opacity}
        />
      </div>
      <div className='sliderArea'>
        <p className='sliderTitle'>Brush size</p>
        <Slider
          type='brushSize'
          onChange={onChangeBrushSize}
          currentValue={brushSize}
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
          <label htmlFor='load' className='loadButton'>
            Load file
            <input
              type='file'
              className='loadInput'
              id='load'
              onChange={onLoadCanvas}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default CanvasRightMenu;
