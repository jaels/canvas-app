
import React from 'react';
import Canvas from './Canvas';
import './App.scss';

const Draw: React.FC<{}> = () => {
  return (
    <div className="drawWrapper">
      <Canvas />
    </div>
  );
}

export default Draw;
