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
    this.editorId = 0;

    this.initState();
  }

  initState() {
    this.editors = [];
  }

  getEditors() {
    return this.editors;
  }
  getActive() {
    return this.activeFileId;
  }

  actionHandler(action) {
    const payload = action.payload;
    switch (action.type) {
      case UserActions.SELECT_TAB:
        this.activateTab(payload.id);
        this.emitChange();
        break;
      case UserActions.SELECT_NODE:
        if(this.isFileOpen(payload.id)) {
          this.activateTab(payload.id);
          this.emitChange();
        }
        break;
      case UserActions.CLOSE_TAB:
        this.removeEditor(payload.id).then(() => {
          this.emitChange();
        });
        break;
      case UserActions.OPEN_FILE:
        if(!this.isFileOpen(payload.id)) {
          this.openModel(payload.id).then(model => {
            this.createEditor(payload.id, model, false);
            this.emitChange();
          });
        }
        break;
      case UserActions.OPEN_HISTORY:
        if(!this.isFileHistoryOpen(payload.id)) {
          this.openHistoricalModel(payload.id).then(model => {
            this.createEditor(payload.id, model, true);
            this.emitChange();
          });
        }
        break;
      case UserActions.CREATE_FILE:
        this.createModel(payload.id).then(() => {
          return this.openModel(payload.id);
        }).then(model => {
          this.createEditor(payload.id, model);
          this.emitChange();
        });
        break;
      case UserActions.DELETE_FILE:
        this.deleteModel(payload.id).then(() => {
          this.removeEditor(payload.id);
        }).then(() => {
          this.emitChange();
        });
        break;
      case UserActions.RENAME_FILE:
        if(this.setTabTitle(payload.id, payload.newName)) {
          this.emitChange();
        }
        break;
    }
  }

  activateTab(id) {
    this.activeFileId = id;
  }
  createModel(id) {
    return this.modelService.create(this.collectionId, id, {
      content: ''
    });
  }
  openModel(modelId) {
    return this.modelService.open(this.collectionId, modelId);
  }
  openHistoricalModel(modelId) {
    return this.modelService.history(this.collectionId, modelId);
  }
  deleteModel(modelId) {
    return this.modelService.remove(this.collectionId, modelId);
  }
  createEditor(id, model, historical) {
    const editor = new EditorData(this.editorId++, id, this.getFileName(id), model, historical);
    this.editors.push(editor);
    this.activeEditor = editor;
  }
  getEditorIndex(id) {
    return this.editors.findIndex((editor) => { return editor.modelId === id; });
  }
  isFileOpen(id) {
    return this.editors.some(editor => { return editor.modelId === id && editor.historical === false; });
  }
  isFileHistoryOpen(id) {
    return this.editors.some(editor => { return editor.modelId === id && editor.historical === true; });
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
  getFileName(fileId) {
    return this.rtModel.valueAt(['tree', 'nodes', fileId]).get('name').data();
  }
  setTabTitle(id, title) {
    const index = this.getEditorIndex(id);
    if(index >= 0) {
      this.editors[index].title = title;
    }
    return index >= 0;
  }

  getHistoryId(id) {
    return `history:${id}`;
  }
}
