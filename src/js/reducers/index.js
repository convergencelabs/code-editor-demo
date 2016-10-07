import { 
  ADD_NEW_NODE, CANCEL_NEW_NODE, 
  RENAME_FILE,
  RENAME_FOLDER, 
  SELECT_NODE 
} from '../constants/ActionTypes';

const replaceFolderNode = function(state, folderId, translationFn) {
  return {
    ...state,
    tree: {
      ...state.trees,
      folders: {
        ...state.tree.folders,
        [folderId]: translationFn(state.tree.folders[folderId])
      }
    }
  };
}

const replaceFile = function(state, fileId, translationFn) {
  return {
    ...state,
    files: {
      ...state.files,
      [fileId]: translationFn(state.files[fileId])
    }
  };
}

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_NODE: 
      return replaceFolderNode(state, action.payload.folderId, (folderNode) => {
        return {...folderNode, newNode: action.payload.type};
      });
    case CANCEL_NEW_NODE:
      return replaceFolderNode(state, action.payload.folderId, (folderNode) => {
        let newFolder = {...folderNode};
        delete newFolder.newNode;
        return newFolder;
      });
    case RENAME_FOLDER:
      return replaceFolderNode(state, action.payload.id, (folderNode) => {
        return {...folderNode, name: action.payload.newName};
      });
    case RENAME_FILE: 
      return replaceFile(state, action.payload.id, (fileNode) => {
        return {...fileNode, name: action.payload.newName};
      });
    case SELECT_NODE:
      return {
        ...state,
        tree: {
          ...state.tree,
          selectedId: action.payload.id
        }
      };
    default:
      return state;
  }
}
