import React from 'react';
import Canvas from './Canvas';
import CanvasTopMenu from './CanvasTopMenu';
import CanvasRightMenu from './CanvasRightMenu';

import './App.scss';

const Draw: React.FC<{}> = () => {
  return (
    <div className='drawWrapper'>
      <div className='canvasAndSides'>
        <Canvas />
        <CanvasRightMenu />
      </div>
    </div>
  );
};

export default Draw;
