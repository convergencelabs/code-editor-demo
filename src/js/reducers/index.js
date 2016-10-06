import { ADD_NEW_NODE, CANCEL_NEW_NODE, SELECT_NODE } from '../constants/ActionTypes';

function replaceFolderNode(state, folderId, newFolder) { 

}

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_NODE:
      let folderNode = state.folders.byId[action.payload.folderId];
      let newFolder = {...folderNode, newNode: action.payload.type};
      
      return {
        ...state,
        folders: {
          ...state.folders,
          byId: {
            ...state.folders.byId,
            [action.payload.folderId]: newFolder
          }
        }
      }
    case CANCEL_NEW_NODE:
      folderNode = state.folders.byId[action.payload.folderId];
      newFolder = {...folderNode};
      delete newFolder.newNode;

      return {
        ...state,
        folders: {
          ...state.folders,
          byId: {
            ...state.folders.byId,
            [action.payload.folderId]: newFolder
          }
        }
      }
    case SELECT_NODE:
      return {
        ...state,
        folders: {
          ...state.folders,
          selectedId: action.payload.id
        }
      } 
    default:
      return state;
  }
}
