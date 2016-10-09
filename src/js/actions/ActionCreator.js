/** 
 * A generic class for handling actions.  Some are passed on to redux, some
 * trigger a change in the RealtimeModel, and some both.
 */
export default class ActionCreator {
  constructor(rtModel, actions) {
    this.rtModel = rtModel;
    this.actions = actions;

    this.mapActions(actions);
  }

  mapActions(actions) {
    // add proxies in front of these actions in order to interact with the RealtimeModel
    // once all the actions are mapped we won't need this anymore
    const {renameFile, renameFolder, ...passThroughActions} = actions;
    Object.assign(this, passThroughActions);
  }

  renameFile(id, newName) {
    let rtFile = this.rtModel.valueAt(['files', id]);
    rtFile.set('name', newName);
    this.actions.renameFile(id, newName);
  }

  renameFolder(id, newName) {
    let rtFile = this.rtModel.valueAt(['tree', 'folders', id]);
    rtFile.set('name', newName);
    this.actions.renameFolder(id, newName);
  }
}