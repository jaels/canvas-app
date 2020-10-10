import React, { useState } from 'react';
import Canvas from './Canvas';
import CanvasTopMenu from './CanvasTopMenu';
import CanvasRightMenu from './CanvasRightMenu';

import './App.scss';

const Draw: React.FC<{}> = () => {
  const [strokeColor, setStrokeColor] = useState<string>('#00000');

  const handleChangeColor = (color: any) => {
    setStrokeColor(color.hex);
  };

  return (
    <div className='drawWrapper'>
      <CanvasTopMenu />
      <div className='canvasAndSides'>
        <Canvas strokeColor={strokeColor} />
        <CanvasRightMenu
          backgroundColor={strokeColor}
          handleChangeColor={handleChangeColor}
        />
      </div>
    </div>
  );
};

export default Draw;
