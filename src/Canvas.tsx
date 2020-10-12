import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { canvasState } from './canvasReducer';
import { saveCanvasData, updateColorArray } from './actions';
import './App.scss';

const Canvas: React.FC<{}> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const color = useSelector<canvasState, string>((state) => state.color);
  const opacity = useSelector<canvasState, string>((state) => state.opacity);
  const brushSize = useSelector<canvasState, string>(
    (state) => state.brushSize
  );
  const colorArray = useSelector<canvasState, Array<string>>(
    (state) => state.colorArray
  );

  const canvasData = useSelector<canvasState, Array<number>>(
    (state) => state.canvasData
  );
  const dispatch = useDispatch();
  const onSaveCanvasData = (canvasData: any) => {
    dispatch(saveCanvasData(canvasData));
  };

  const onUpdateColorArray = () => {
    if (colorArray.indexOf(color) === -1) {
      colorArray.push(color);
      dispatch(updateColorArray(colorArray));
    }
  };

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
        context.globalAlpha = parseInt(opacity) / 100;
        context.lineWidth = parseInt(brushSize);
        contextRef.current = context;
      }
      const prevCanvas = localStorage.getItem('imageData');
      if (prevCanvas && prevCanvas.length && context) {
        let img = new Image();
        img.onload = () => {
          context.drawImage(img, 0, 0);
        };
        img.src = prevCanvas;
      }
    }
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
    }
  }, [color]);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.globalAlpha = parseInt(opacity) / 100;
    }
  }, [opacity]);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.lineWidth = parseInt(brushSize);
    }
  }, [brushSize]);

  useEffect(() => {
    if (!canvasData.length && contextRef.current && canvasRef.current) {
      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }
  }, [canvasData]);

  const startDrawing = ({ nativeEvent }: any) => {
    const { offsetX, offsetY } = nativeEvent;
    if (contextRef.current) {
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
    }
    setIsDrawing(true);
    onUpdateColorArray();
  };

  const finishDrawing = () => {
    contextRef.current && contextRef.current.closePath();
    if (canvasRef.current && contextRef.current) {
      const canvasData = contextRef.current.getImageData(
        0,
        0,
        parseInt(canvasRef.current.style.width),
        parseInt(canvasRef.current.style.height)
      ).data;
      onSaveCanvasData(canvasData);
      const canvasDataUrl = canvasRef.current.toDataURL();
      localStorage.setItem('imageData', canvasDataUrl);
    }

    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }: any) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    if (contextRef.current) {
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
    }
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
