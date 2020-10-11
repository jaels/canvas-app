export type Action = { type: 'CHANGE_COLOR'; payload: string };

export const changeColor = (color: string): Action => ({
  type: 'CHANGE_COLOR',
  payload: color,
});
