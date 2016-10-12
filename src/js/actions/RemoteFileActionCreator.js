import {RemoteActions} from '../constants/ActionTypes';
import appDispatcher from '../appDispatcher';

export default class RemoteFileActionCreator {

  constructor(fileId, model) {
    this.fileId = fileId;
    this.fileModel = model;
    this.listeningOn = [];
  }

  listenFor(actions) {
    actions.forEach(action => {
      this.listeningOn.push(action);
      switch(action) {
        case 'changed':
          this.fileModel.on('model_changed', this.fileChanged);
          break;
      }
    });
  }

  fileChanged = () => {
    appDispatcher.dispatch({
      type: RemoteActions.FILE_CHANGED,
      payload: {id: this.fileId}
    });
  }

  cleanUp() {
    this.listeningOn.forEach(action => {
      switch(action) {
        case 'changed':
          this.fileModel.off('model_changed', this.fileChanged);
          break;
      }
    });
  }

}
