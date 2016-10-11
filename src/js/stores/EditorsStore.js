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
    this.editors = [];
    /*
    this.rtModel.valueAt(['editors', this.username, 'tabs']).forEach(editor => {
      const modelId = editor.get('modelId').data();
      if(!this.activeFileId) {
        this.activeFileId = modelId;
      }
      this.openModel(modelId).then(rtModel => {
        this.models[rtModel.modelId()] = rtModel;
        this.emitChange();
      });
    });*/
  }

  getEditors() {
    return this.editors;
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
        this.emitChange();
        break;
      case UserActions.SELECT_NODE:
        if(this.editors.some((editor) => { return editor.modelId === payload.id; })) {
          this.activeFileId = payload.id;
          this.emitChange();
        }
        break;
      case UserActions.OPEN_FILE:
        this.openModel(payload.id).then(model => {
          this.createEditor(payload.id, model);
          this.emitChange();
        });
        break;
      case UserActions.CREATE_FILE:
        this.createModel(payload.id).then(() => {
          return this.openModel(payload.id);
        }).then(model => {
          this.createEditor(payload.id, model);
          this.emitChange();
        });
        break;
      case UserActions.CLOSE_TAB:
        this.removeEditor(payload.id).then(() => {
          this.emitChange();
        });
        break;
      case UserActions.DELETE_FILE:
        this.deleteModel(payload.id).then(() => {
          this.removeEditor(payload.id);
        }).then(() => {
          this.emitChange();
        });
    }
  }

  createModel(id) {
    return this.modelService.create(this.collectionId, id, {
      content: ''
    });
  }
  openModel(modelId) {
    return this.modelService.open(this.collectionId, modelId);
  }
  deleteModel(modelId) {
    return this.modelService.remove(this.collectionId, modelId);
  }
  createEditor(id, model) {
    const editor = new EditorData(id, this.getFileName(id), model, false);
    this.editors.push(editor);
    this.activeFileId = id;
  }
  getEditorIndex(id) {
    return this.editors.findIndex((editor) => { return editor.modelId === id; });
  }
  removeEditor(id) {
    const index = this.getEditorIndex(id);
    if(index >= 0) {
      this.editors[index].model.close();
      this.editors.splice(index, 1);
      if(this.editors.length > 0) {
        this.activeFileId = this.editors[0].modelId;
      } else {
        delete this.activeFileId;
      }
      return Promise.resolve(index);
    } else {
      return Promise.reject();
    }
  }
}
