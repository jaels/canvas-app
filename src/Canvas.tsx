import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { canvasState } from './canvasReducer';
import {
  saveCanvasData,
  updateColorArray,
  exportCanvas,
  resetCanvas,
} from './actions';
import './canvas.scss';

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

  const exportActive = useSelector<canvasState, boolean>(
    (state) => state.exportActive
  );

  const fileLoaded = useSelector<canvasState, any>((state) => state.fileLoaded);

  const isResetActive = useSelector<canvasState, boolean>(
    (state) => state.isResetActive
  );

  const dispatch = useDispatch();
  const onSaveCanvasData = (canvasData: any) => {
    dispatch(saveCanvasData(canvasData));
  };

  const onUpdateColorArray = () => {
    if (colorArray.indexOf(color) === -1) {
      dispatch(updateColorArray(color));
    }
  };

  const onFinishCanvasExport = () => {
    dispatch(exportCanvas(false));
  };

  const createImageOnCanvas = (imageSrc: string) => {
    let img = new Image();
    img.onload = () => {
      if (contextRef.current && canvasRef.current) {
        contextRef.current.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        contextRef.current.drawImage(img, 0, 0);
      }
    };
    img.src = imageSrc;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const context = canvas.getContext('2d');
      if (context) {
        context.lineCap = 'round';
        context.strokeStyle = color;
        context.globalAlpha = parseInt(opacity) / 100;
        context.lineWidth = parseInt(brushSize);
        contextRef.current = context;
      }
    }
    if (localStorage.getItem('imageData')) {
      //@ts-ignore
      createImageOnCanvas(localStorage.getItem('imageData'));
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
    if (isResetActive && contextRef.current && canvasRef.current) {
      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      dispatch(resetCanvas(false));
      console.log('here');
      localStorage.setItem('colorArray', '');
    }
  }, [isResetActive]);

  useEffect(() => {
    if (exportActive && canvasRef.current) {
      const canvasDataUrl = canvasRef.current.toDataURL();
      const data = { image: canvasDataUrl, date: Date.now() };
      const string = JSON.stringify(data);

      const file = new Blob([string], {
        type: 'application/json',
      });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(file);
      a.download = 'data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      onFinishCanvasExport();
    }
  }, [exportActive]);

  useEffect(() => {
    if (fileLoaded) {
      const reader = new FileReader();
      const handleFileRead = (e: any) => {
        //@ts-ignore
        const data = JSON.parse(reader.result);
        let img = new Image();
        createImageOnCanvas(data.image);
      };
      reader.onloadend = handleFileRead;
      reader.readAsText(fileLoaded);
    }
  }, [fileLoaded]);

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
      localStorage.setItem('colorArray', JSON.stringify(colorArray));
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
