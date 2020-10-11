import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { canvasState } from './canvasReducer';
import './App.scss';

const Canvas: React.FC<{}> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const color = useSelector<canvasState, string>((state) => state.color);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight * 2;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const context = canvas.getContext('2d');
      if (context) {
        context.scale(2, 2);
        context.lineCap = 'round';
        context.strokeStyle = color;
        context.globalAlpha = 1;
        context.lineWidth = 3;
        contextRef.current = context;
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    let context;
    if (canvas) {
      context = canvas.getContext('2d');
      // console.log(canvas.toDataURL());
    }
    if (context) {
      context.strokeStyle = color;
    }
  }, [color]);

  const startDrawing = ({ nativeEvent }: any) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef && contextRef.current && contextRef.current.beginPath();
    contextRef &&
      contextRef.current &&
      contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef && contextRef.current && contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }: any) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef &&
      contextRef.current &&
      contextRef.current.lineTo(offsetX, offsetY);
    contextRef && contextRef.current && contextRef.current.stroke();
  };

  return (
    <div className='canvasWrapper'>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
      />
    </div>
  );
};

export default Canvas;
