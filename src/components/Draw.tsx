import React from 'react';
import Canvas from './Canvas';
import CanvasRightMenu from './CanvasRightMenu';

import '../canvas.scss';

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
