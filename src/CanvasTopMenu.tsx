import React from 'react';
import Slider from './Slider';
import { canvasState } from './canvasReducer';
import { useDispatch, useSelector } from 'react-redux';
import { changeBrushSize } from './actions';

import './App.scss';

const CanvasTopMenu: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const onChangeBrushSize = (e: React.ChangeEvent<HTMLInputElement>): any => {
    dispatch(changeBrushSize(e.target.value));
  };

  const brushSize = useSelector<canvasState, string>(
    (state) => state.brushSize
  );

  return (
    <div className='canvasTopWrapper'>
      <p>brush size</p>
      <Slider
        type='brushSize'
        onChange={onChangeBrushSize}
        currentValue={brushSize}
      />
    </div>
  );
};

export default CanvasTopMenu;
