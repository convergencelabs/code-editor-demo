import {UserActions} from '../constants/ActionTypes';
import {BaseStore} from './BaseStore';
import EditorData from '../editorData';

export default class EditorsStore extends BaseStore {

  constructor(rtModel) {
    super();

    this.modelService = rtModel.session().domain().models();
    this.collectionId = rtModel.collectionId();
    this.username = rtModel.session().username();
    this.rtModel = rtModel;

    this.initState();
  }

  initState() {
    this.editors = [];
  }

  getEditors() {
    return this.editors;
  }

  getActiveEditor() {
    return this.activeEditor;
  }

  actionHandler(action) {
    const payload = action.payload;
    switch (action.type) {
      case UserActions.SELECT_TAB:
        this.activateTab(payload.id, payload.historical);
        this.emitChange();
        break;
      case UserActions.SELECT_NODE:
        if(this.isFileOpen(payload.id)) {
          this.activateTab(payload.id, false);
          this.emitChange();
        }
        break;
      case UserActions.CLOSE_TAB:
        this.removeEditor(payload.editor).then(() => {
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
          this.createEditor(payload.id, model, false);
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

  activateTab(id, historical) {
    const editor = this.editors.find((editor) => { return editor.modelId === id && editor.historical === historical; });
    this.activeEditor = editor;
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
    const editor = new EditorData(id, this.getFileName(id), model, historical);
    this.editors.push(editor);
    this.activeEditor = editor;
  }

  getEditorIndex(editor) {
    return this.editors.findIndex((e) => { return e === editor; });
  }

  isFileOpen(id) {
    return this.editors.some(editor => { return editor.modelId === id && editor.historical === false; });
  }

  isFileHistoryOpen(id) {
    return this.editors.some(editor => { return editor.modelId === id && editor.historical === true; });
  }

  removeEditor(editor) {
    const index = this.getEditorIndex(editor);
    if(index >= 0) {
      if (!editor.historical) {
        this.editors[index].model.close();
      }
      this.editors.splice(index, 1);
      if(this.editors.length > 0) {
        this.activeEditor = this.editors[0];
      } else {
        delete this.activeEditor;
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
