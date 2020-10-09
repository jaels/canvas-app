import React, {useRef, useEffect, useState} from 'react';
import './App.scss';

const Canvas: React.FC<{}> = () => {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight * 2;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const context = canvas.getContext("2d")
      if(context) {
        context.scale(2,2)
        context.lineCap = "round"
        context.strokeStyle = "#000000"
        context.lineWidth = 4
        contextRef.current = context;
      }
    }
  }, [])

  const startDrawing = ({nativeEvent} : any) => {
    const {offsetX, offsetY} = nativeEvent;
    contextRef && contextRef.current && contextRef.current.beginPath()
    contextRef && contextRef.current && contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const finishDrawing = () => {
    contextRef && contextRef.current && contextRef.current.closePath()
    setIsDrawing(false)
  }

  const draw = ({nativeEvent}: any) => {
    if(!isDrawing){
      return;
    }
    const {offsetX, offsetY} = nativeEvent;
    contextRef && contextRef.current && contextRef.current.lineTo(offsetX, offsetY)
    contextRef && contextRef.current && contextRef.current.stroke()
  }


  return (
    <div className="canvasWrapper">
      <canvas 
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
      />
    </div>
  );
}

export default Canvas;
