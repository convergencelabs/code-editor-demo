/** 
 * A generic class for handling actions.  Some are passed on to Redux, some
 * trigger a change in the RealtimeModel, and some both.
 */
export default class ActionCreator {
  constructor(rtModel, actions) {
    this.rtModel = rtModel;
    this.actions = actions;

    this.mapActions(actions);
  }

  // pass through those actions that don't interact with the RealtimeModel
  mapActions(actions) {
    this.openFile = actions.openFile;
    this.addNewNode = actions.addNewNode;
    this.cancelNewNode = actions.cancelNewNode;
    this.selectNode = actions.selectNode;
    this.moveCursor = actions.moveCursor;
  }

  createFile(name, parentId) {

  }
  deleteFile(id) {

  }
  renameFile(id, newName) {
    const rtFile = this.rtModel.valueAt(['files', id]);
    rtFile.set('name', newName);

    this.actions.renameFile.apply(this, arguments);
  }

  createFolder(newId, name, parentId) {
    const folders = this.rtModel.valueAt(['tree', 'folders']);
    folders.set(newId, {name: name, childIds: []});
    folders.valueAt([parentId, 'childIds']).push(newId);

    this.actions.createFolder.apply(this, arguments);
  }
  deleteFolder(id) {
    const folders = this.rtModel.valueAt(['tree', 'folders']);
    const childIds = findChildParent(folders, id).get('childIds');
    childIds.forEach((childId, index) => { 
      if(childId.data() === id) {
        childIds.remove(index);
      }
    });
    folders.remove(id);

    this.actions.deleteFolder.apply(this, arguments);
  }
  renameFolder(id, newName) {
    const rtFolder = this.rtModel.valueAt(['tree', 'folders', id]);
    rtFolder.set('name', newName);

    this.actions.renameFolder.apply(this, arguments);
  }

}

function findChildParent(folders, childId) {
  let folderIds = folders.keys();
  for(let i = 0; i < folderIds.length; i++) {
    let folder = folders.get(folderIds[i]);
    let found = folder.get('childIds').data().some(id => {return id === childId});
    if(found) {
      return folder;
    }
  }
}
