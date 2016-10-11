import {UserActions} from '../constants/ActionTypes';
import appDispatcher from '../appDispatcher';

export const selectNode = (id) => {
  appDispatcher.dispatch({
    type: UserActions.SELECT_NODE, 
    payload: {id}
  });
};
export const openFile = (id) => {
  appDispatcher.dispatch({
    type: UserActions.OPEN_FILE, 
    payload: {id}
  });    
};
export const addNewNode = (type, folderId) => {
  appDispatcher.dispatch({
    type: UserActions.ADD_NEW_NODE, 
    payload: {type, folderId}
  });
};
export const cancelNewNode = (folderId) => {
  appDispatcher.dispatch({
    type: UserActions.CANCEL_NEW_NODE, 
    payload: {folderId}
  });
};

export const createFolder = (id, name, parentId) => {
  appDispatcher.dispatch({
    type: UserActions.CREATE_FOLDER, 
    payload: {id, name, parentId}
  });
};
export const deleteFolder = (id) => {
  appDispatcher.dispatch({
    type: UserActions.DELETE_FOLDER, 
    payload: {id}
  });
};
export const renameFolder = (id, newName) => {
  appDispatcher.dispatch({
    type: UserActions.RENAME_FOLDER, 
    payload: {id, newName}
  });
};

export const createFile = (id, name, parentId) => {
  appDispatcher.dispatch({
    type: UserActions.CREATE_FILE, 
    payload: {id, name, parentId}
  });
};
export const deleteFile = (id) => {
  appDispatcher.dispatch({
    type: UserActions.DELETE_FILE, 
    payload: {id}
  });
};
export const renameFile = (id, newName) => {
  appDispatcher.dispatch({
    type: UserActions.RENAME_FILE, 
    payload: {id, newName}
  });
};