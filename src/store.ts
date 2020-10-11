import { createStore } from 'redux';
import { canvasReducer } from './canvasReducer';

export const store = createStore(canvasReducer);
