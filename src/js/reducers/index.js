import { ADD_NEW_NODE } from '../constants/ActionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_NODE:
      const newState = {...state};
      let folderNode = state.folders.byId[action.payload.folderId];
      if(folderNode) {
        let newFolder = {...folderNode, newNode: action.payload.type};
        newState.folders.byId[action.payload.folderId] = newFolder;
      }
      return newState;
    default:
      return state;
  }
}
