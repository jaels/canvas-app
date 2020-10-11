import { Action } from './actions';

export interface canvasState {
  color: string;
}

const initialState = {
  color: '000000',
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
    default:
      return state;
  }
};
