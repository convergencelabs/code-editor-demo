export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0;
    let v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function appendIdsToObjects(objectsById) { 
  for(let id in objectsById) {
    objectsById[id].id = id;
  }
}

export function findChildParentId(folders, childId) {
  // fixme this is a O(n) operation super inefficient.
  let folderIds = folders.keys();
  for(let i = 0; i < folderIds.length; i++) {
    let folder = folders.get(folderIds[i]);
    if(folder.hasKey('children')) {
      // fixme this is super inefficient
      let found = folder.get('children').value().some(id => { return id === childId; });
      if(found) {
        return folderIds[i];
      }
    }
  }
}

export function isNodeFolder(nodes, nodeId) {
  const rtNode = nodes.get(nodeId);
  return rtNode.hasKey('children');
}