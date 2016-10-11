import * as types from '../constants/ActionTypes';

export const selectTab = id => ({type: types.SELECT_TAB, payload: {id}});
export const closeTab = id => ({type: types.CLOSE_TAB, payload: {id}});
export const moveCursor = (line, col) => ({type: types.MOVE_CURSOR, payload: {line, col}});
