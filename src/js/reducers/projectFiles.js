import { ADD_NEW_NODE } from '../constants/ActionTypes';

function findFolderInTree(tree, nodeId) {
  let found;
  for(let i = 0; !found && i < tree.length; i++) {
    let node = tree[i];
    if(node.id === nodeId) {
      found = node;
    } else if(node.hasOwnProperty('children')) {
      let result = findFolderInTree(node.children, nodeId);
      found = result.found;
      if(found) {
        tree = result.tree;
      }
    }
  }
  return {found, tree};
}

export default function projectFiles(state, action) {
  switch (action.type) {
    case ADD_NEW_NODE:
      let folderNode = findFolderInTree(state.tree, action.payload.folderId);
      if(folderNode) {
        let newFolder = {...folderNode}
      }
      return state;
    default:
      return state;
  }
}