import { 
  ADD_NEW_NODE, CANCEL_NEW_NODE, 
  CREATE_FILE, DELETE_FILE, RENAME_FILE,
  CREATE_FOLDER, DELETE_FOLDER, RENAME_FOLDER, 
  SELECT_NODE, SELECT_TAB
} from '../constants/ActionTypes';

const replaceFolderNode = function(state, folderId, translationFn) {
  return {
    ...state,
    tree: {
      ...state.tree,
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

const getFolderOfNodeCopy = function(state, nodeId) {
  for(let folderId in state.tree.folders) {
    const folder = state.tree.folders[folderId];
    let found = folder.childIds.some(id => { return id === nodeId; });
    if(found) {
      return {...folder};
    }
  }
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
    case CREATE_FOLDER: {
      const newFolder = {
        id: action.payload.id,
        name: action.payload.name, 
        childIds: []
      };
      const parentFolder = state.tree.folders[action.payload.parentId];
      return {
        ...state, 
        tree: {
          ...state.tree,
          folders: {
            ...state.tree.folders,
            [parentFolder.id]: {
              ...parentFolder,
              childIds: [...parentFolder.childIds, newFolder.id]
            },
            [newFolder.id]: newFolder
          }
        }
      };
    }
    case DELETE_FOLDER: {
      const parentFolder = getFolderOfNodeCopy(state, action.payload.id);
      const childIndex = parentFolder.childIds.findIndex(id => { 
        return id === action.payload.id;
      });
      parentFolder.childIds.splice(childIndex, 1);
      const newFolders = {...state.tree.folders};
      delete newFolders[parentFolder.id];
      return {
        ...state, 
        tree: {
          ...state.tree,
          folders: {
            ...newFolders,
            [parentFolder.id]: parentFolder,
          }
        }
      };
    }
    case RENAME_FOLDER:
      return replaceFolderNode(state, action.payload.id, (folderNode) => {
        return {...folderNode, name: action.payload.newName};
      });
    case CREATE_FILE: {
      const newFile = {
        id: action.payload.id,
        name: action.payload.name, 
        content: ''
      };
      const parentFolder = state.tree.folders[action.payload.parentId];
      return {
        ...state, 
        tree: {
          ...state.tree,
          folders: {
            ...state.tree.folders,
            [parentFolder.id]: {
              ...parentFolder,
              childIds: [...parentFolder.childIds, newFile.id]
            }
          }
        },
        files: {
          ...state.files,
          [newFile.id]: newFile
        }
      };
    }
    case DELETE_FILE: {
      const parentFolder = getFolderOfNodeCopy(state, action.payload.id);
      const childIndex = parentFolder.childIds.findIndex(id => { 
        return id === action.payload.id;
      });
      parentFolder.childIds.splice(childIndex, 1);

      const files = {...state.files};
      delete files[action.payload.id];

      return {
        ...state, 
        tree: {
          ...state.tree,
          folders: {
            ...state.tree.folders,
            [parentFolder.id]: parentFolder,
          }
        },
        files: files
      };
    }
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
    case SELECT_TAB: 
      return {
        ...state,
        editors: {
          ...state.editors,
          activeFile: action.payload.id
        }
      };
    default:
      return state;
  }
}
