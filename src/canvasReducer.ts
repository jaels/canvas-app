import { Action } from './actions';

export interface canvasState {
  color: string;
  opacity: string;
  brushSize: string;
  canvasData: Array<number>;
  colorArray: Array<string>;
  exportActive: boolean;
  fileLoaded: any;
}

const initialState = {
  color: 'rgb(0,0,0)',
  opacity: '100',
  brushSize: '4',
  canvasData: [],
  colorArray: [],
  exportActive: false,
  fileLoaded: null,
};

export const canvasReducer = (
  state: canvasState = initialState,
  action: Action
) => {
  switch (action.type) {
    case 'CHANGE_COLOR':
      return {
        ...state,
        color: action.payload,
      };
    case 'CHANGE_OPACITY':
      return {
        ...state,
        opacity: action.payload,
      };
    case 'CHANGE_BRUSH_SIZE':
      return {
        ...state,
        brushSize: action.payload,
      };
    case 'SAVE_CANVAS_DATA':
      return {
        ...state,
        canvasData: action.payload,
      };
    case 'UPDATE_COLOR_ARRAY':
      return {
        ...state,
        colorArray: action.payload,
      };
    case 'EXPORT_CANVAS':
      return {
        ...state,
        exportActive: action.payload,
      };
    case 'LOAD_CANVAS':
      return {
        ...state,
        fileLoaded: action.payload,
      };
    case 'RESET_CANVAS':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
