import {ExternalEvents} from '../../SapphireConstants';

import ArrayActionCreator from '../ArrayActionCreator';

export default class TreeActionCreator {

  constructor(array) {
    super(dispatcher, array);

    this.onExternalInsert = this.onExternalInsert.bind(this);
    this.onExternalArrayItemRemove = this.onExternalArrayItemRemove.bind(this);
    this.onExternalValueSet = this.onExternalValueSet.bind(this);

    this.arrayModel.on('insert', this.onExternalInsert);
    this.arrayModel.on('remove', this.onExternalArrayItemRemove);
    this.arrayModel.on('value', this.onExternalValueSet);
  }

  onExternalInsert(event) {
    this.dispatcher.dispatch({
      type: ExternalEvents.ARRAY_ITEM_ADDED,
      index: event.index,
      value: event.value.data()
    });
  }
  onExternalArrayItemRemove(event) {
    this.dispatcher.dispatch({
      type: ExternalEvents.ARRAY_ITEM_REMOVED,
      index: event.index
    });
  }
  onExternalValueSet(event) {
    this.dispatcher.dispatch({
      type: ExternalEvents.VALUE_CHANGED,
      value: event.value
    });
  }

  destroy() {
    this.arrayModel.off('insert', this.onExternalInsert);
    this.arrayModel.off('remove', this.onExternalArrayItemRemove);
    this.arrayModel.off('value', this.onExternalValueSet);
  }
}
