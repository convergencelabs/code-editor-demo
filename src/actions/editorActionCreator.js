import {UserActions} from '../constants/ActionTypes';
import appDispatcher from '../appDispatcher';

export const selectTab = (modelId, historical) => {
  appDispatcher.dispatch({
    type: UserActions.SELECT_TAB, 
    payload: {id: modelId, historical: historical}
  });
};
export const closeTab = editor => {
  appDispatcher.dispatch({
    type: UserActions.CLOSE_TAB, 
    payload: {editor}
  });
};