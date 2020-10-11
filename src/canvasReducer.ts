import { Action } from './actions';

export interface canvasState {
  color: string;
  opacity: string;
}

const initialState = {
  color: '000000',
  opacity: '100',
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
    default:
      return state;
  }
};
