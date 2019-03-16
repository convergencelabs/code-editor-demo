import {RemoteActions} from '../constants/ActionTypes';
import appDispatcher from '../appDispatcher';

export default class RemoteFolderActionCreator {

  constructor(folderId, model) {
    this.folderId = folderId;
    this.model = model;
    this.listeningOn = [];
  }

  listenFor(actions) {
    actions.forEach(action => {
      this.listeningOn.push(action);
      switch(action) {
        case 'changed':
          this.model.on('model_changed', this.folderChanged);
          break;
        default:
      }
    });
  }

  folderChanged = () => {
    appDispatcher.dispatch({
      type: RemoteActions.FOLDER_CHANGED,
      payload: {id: this.folderId}
    });
  };

  cleanUp() {
    this.listeningOn.forEach(action => {
      switch(action) {
        case 'changed':
          this.model.off('model_changed', this.folderChanged);
          break;
        default:
      }
    });
  }
}
