
import React, {useState} from 'react';
import { SketchPicker } from 'react-color';
import './App.scss';

const CanvasRightMenu: React.FC<{}> = () => {

  const [background, setBackground] = useState('#fff')

  const handleChangeComplete = (color: any) => {
    console.log(color)
    setBackground(color.hex)
  }

  return (
    <div className="canvasRightWrapper">
      <SketchPicker 
        color={background}
        onChangeComplete={ handleChangeComplete }
      />
    </div>
  );
}

export default CanvasRightMenu;
