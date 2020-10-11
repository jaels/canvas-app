export type Action =
  | { type: 'CHANGE_COLOR'; payload: string }
  | { type: 'CHANGE_OPACITY'; payload: string };

export const changeColor = (color: string): Action => ({
  type: 'CHANGE_COLOR',
  payload: color,
});

export const changeOpacity = (opacity: string): Action => ({
  type: 'CHANGE_OPACITY',
  payload: opacity,
});
