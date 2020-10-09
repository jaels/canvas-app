
import React, {useState} from 'react';
import { SketchPicker } from 'react-color';
import './App.scss';

const CanvasRightMenu: React.FC<{backgroundColor: string, handleChangeColor: any}> = ({backgroundColor, handleChangeColor}) => {

  

  return (
    <div className="canvasRightWrapper">
      <SketchPicker 
        color={backgroundColor}
        onChangeComplete={ handleChangeColor }
      />
    </div>
  );
}

export default CanvasRightMenu;
