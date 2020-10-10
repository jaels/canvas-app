import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

import Slider from './Slider';
import './rightMenu.css';

const CanvasRightMenu: React.FC<{
  backgroundColor: string;
  handleChangeColor: any;
}> = ({ backgroundColor, handleChangeColor }) => {
  return (
    <div className='canvasRightWrapper'>
      <ChromePicker
        color={backgroundColor}
        onChangeComplete={handleChangeColor}
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
