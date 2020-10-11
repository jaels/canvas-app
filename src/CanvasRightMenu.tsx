import React from 'react';
import { ChromePicker } from 'react-color';

import { useDispatch, useSelector } from 'react-redux';
import { canvasState } from './canvasReducer';
import { changeColor, changeOpacity } from './actions';

import Slider from './Slider';
import './rightMenu.css';

const CanvasRightMenu: React.FC<{}> = () => {
  const color = useSelector<canvasState, string>((state) => state.color);
  const opacity = useSelector<canvasState, string>((state) => state.opacity);

  const dispatch = useDispatch();

  const onChangeColor = (color: string) => {
    dispatch(changeColor(color));
  };

  const onChangeOpacity = (e: React.ChangeEvent<HTMLInputElement>): any => {
    dispatch(changeOpacity(e.target.value));
  };

  return (
    <div className='canvasRightWrapper'>
      <ChromePicker
        color={color}
        onChangeComplete={(event) => onChangeColor(event.hex)}
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
    </div>
  );
};

export default CanvasRightMenu;
