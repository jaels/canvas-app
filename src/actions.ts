import { bindActionCreators } from 'redux';

export type Action =
  | { type: 'CHANGE_COLOR'; payload: string }
  | { type: 'CHANGE_OPACITY'; payload: string }
  | { type: 'CHANGE_BRUSH_SIZE'; payload: string }
  | { type: 'SAVE_CANVAS_DATA'; payload: [] }
  | { type: 'UPDATE_COLOR_ARRAY'; payload: string }
  | { type: 'EXPORT_CANVAS'; payload: boolean }
  | { type: 'LOAD_CANVAS'; payload: any }
  | { type: 'RESET_CANVAS'; payload: boolean };

export const changeColor = (color: string): Action => ({
  type: 'CHANGE_COLOR',
  payload: color,
});

export const changeOpacity = (opacity: string): Action => ({
  type: 'CHANGE_OPACITY',
  payload: opacity,
});

export const changeBrushSize = (brushSize: string): Action => ({
  type: 'CHANGE_BRUSH_SIZE',
  payload: brushSize,
});

export const saveCanvasData = (canvasData: []): Action => ({
  type: 'SAVE_CANVAS_DATA',
  payload: canvasData,
});

export const updateColorArray = (color: string): Action => ({
  type: 'UPDATE_COLOR_ARRAY',
  payload: color,
});

export const resetCanvas = (isResetActive: boolean): Action => ({
  type: 'RESET_CANVAS',
  payload: isResetActive,
});

export const exportCanvas = (exportActive: boolean): Action => ({
  type: 'EXPORT_CANVAS',
  payload: exportActive,
});

export const loadCanvas = (loadActive: any): Action => ({
  type: 'LOAD_CANVAS',
  payload: loadActive,
});
