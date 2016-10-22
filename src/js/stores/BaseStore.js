import {EventEmitter} from 'events';
import appDispatcher from '../appDispatcher';

export const CHANGE_EVENT = 'CHANGE_EVENT';

export class BaseStore extends EventEmitter {
  constructor() {
    super();

    this._dispatchToken = appDispatcher.register(this.actionHandler.bind(this));
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  dispose() {
    appDispatcher.unregister(this._dispatchToken);
  }
}
