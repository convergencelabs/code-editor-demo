import {RemoteActions} from '../constants/ActionTypes';
import appDispatcher from '../appDispatcher';
import { RealTimeObject } from '@convergence/convergence';

export default class RemoteFileActionCreator {

  constructor(fileId, treeNode) {
    this.fileId = fileId;
    this.rtTreeNode = treeNode;
    this.listeningOn = [];
  }

  listenFor(actions) {
    actions.forEach(action => {
      this.listeningOn.push(action);
      switch(action) {
        case 'changed':
          this.rtTreeNode.on(RealTimeObject.Events.MODEL_CHANGED, this.fileChanged);
          break;
        case 'deleted':
          this.rtTreeNode.on(RealTimeObject.Events.DETACHED, this.fileDeleted);
          break;
        default:
      }
    });
  }

  fileChanged = () => {
    appDispatcher.dispatch({
      type: RemoteActions.FILE_CHANGED,
      payload: {id: this.fileId}
    });
  };
  
  fileDeleted = () => {
    // this will also be fired on the client that did the 
    // deletion, so it's not actually a remote event and 
    // we can ignore it.
    if (!appDispatcher.isDispatching()) {
      appDispatcher.dispatch({
        type: RemoteActions.FILE_DELETED,
        payload: {id: this.fileId}
      });
    }
  }

  cleanUp() {
    this.listeningOn.forEach(action => {
      switch(action) {
        case 'changed':
          this.rtTreeNode.off('model_changed', this.fileChanged);
          break;
        default:
      }
    });
  }

}
