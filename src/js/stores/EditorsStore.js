import {UserActions} from '../constants/ActionTypes';
import {BaseStore} from './BaseStore';
import EditorData from '../editorData';

export default class EditorsStore extends BaseStore {
  constructor(modelsMetadata, rtModel) {
    super();

    this.modelService = modelsMetadata.modelService;
    this.collectionId = modelsMetadata.collectionId;
    this.username = modelsMetadata.username;
    this.rtModel = rtModel;

    this.initState();
  }

  initState() {
    this.models = {};
    this.rtModel.valueAt(['editors', this.username, 'tabs']).forEach(editor => {
      const modelId = editor.get('modelId').data();
      if(!this.activeFileId) {
        this.activeFileId = modelId;
      }
      this.openModel(modelId).then(rtModel => {
        this.models[rtModel.modelId()] = rtModel;
        this.emitChange();
      });
    });
  }

  openModel(modelId) {
    // fixme this was a hack, because the current thing assumes some files exist.
    return this.modelService.open(this.collectionId, modelId, () => {return {content: ""};});
  }

  getEditors() {
    let editors = [];
    this.rtModel.valueAt(['editors', this.username, 'tabs']).forEach(editor => {
      const modelId = editor.get('modelId').data();
      // fixme a bit of a hack with the last parameter hard coded to false.
      editors.push(new EditorData(modelId, this.getFileName(modelId), this.models[modelId], false));
    });
    return editors;
  }
  getActive() {
    return this.activeFileId;
  }

  getFileName(fileId) {
    return this.rtModel.valueAt(['tree', 'nodes', fileId]).get('name').data();
  }

  actionHandler(action) {
    const payload = action.payload;
    switch (action.type) {
      case UserActions.SELECT_TAB:
        this.activeFileId = payload.id;
        break;
      case UserActions.SELECT_NODE:
        if(this.models.hasOwnProperty(payload.id)) {
          this.activeFileId = payload.id;
        }
        break;
      case UserActions.OPEN_FILE:
        break;
    }
    this.emitChange();
  }

}
