import React from 'react';
import { ChromePicker } from 'react-color';

import { useDispatch, useSelector } from 'react-redux';
import { canvasState } from './canvasReducer';
import { changeColor } from './actions';

import Slider from './Slider';
import './rightMenu.css';

const CanvasRightMenu: React.FC<{}> = () => {
  const color = useSelector<canvasState, string>((state) => state.color);

  const dispatch = useDispatch();

  const onChangeColor = (color: string) => {
    dispatch(changeColor(color));
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
        <Slider type='opacity' />
      </div>
    </div>
  );
};

export default CanvasRightMenu;
