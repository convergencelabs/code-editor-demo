import {UserActions} from '../constants/ActionTypes';
import appDispatcher from '../appDispatcher';

export const selectTab = id => {
  appDispatcher.dispatch({
    type: UserActions.SELECT_TAB, 
    payload: {id}
  });
};
export const closeTab = id => {
  appDispatcher.dispatch({
    type: UserActions.CLOSE_TAB, 
    payload: {id}
  });
};