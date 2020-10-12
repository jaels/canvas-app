export type Action =
  | { type: 'CHANGE_COLOR'; payload: string }
  | { type: 'CHANGE_OPACITY'; payload: string }
  | { type: 'CHANGE_BRUSH_SIZE'; payload: string }
  | { type: 'SAVE_CANVAS_DATA'; payload: [] }
  | { type: 'UPDATE_COLOR_ARRAY'; payload: Array<string> }
  | { type: 'RESET_CANVAS' };

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

export const updateColorArray = (colorArray: Array<string>): Action => ({
  type: 'UPDATE_COLOR_ARRAY',
  payload: colorArray,
});

export const resetCanvas = (): Action => ({
  type: 'RESET_CANVAS',
});
