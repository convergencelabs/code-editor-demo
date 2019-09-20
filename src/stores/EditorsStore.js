import {UserActions} from '../constants/ActionTypes';
import {BaseStore} from './BaseStore';
import EditorData from '../editorData';

export default class EditorsStore extends BaseStore {

  constructor(rtModel) {
    super();

    this.modelService = rtModel.session().domain().models();
    this.collectionId = "files";
    this.username = rtModel.session().user().username;
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
        if (this.isFileOpen(payload.id)) {
          this.activateTab(payload.id, false);
          this.emitChange();
        }
        break;
      case UserActions.CLOSE_TAB:
        this.removeEditor(payload.editor);
        this.emitChange();
        break;
      case UserActions.OPEN_FILE:
        if (!this.isFileOpen(payload.id)) {
          this.openModel(payload.id).then(model => {
            this.createEditor(payload.id, model, false);
            this.emitChange();
          });
        }
        break;
      case UserActions.OPEN_HISTORY:
        if (!this.isFileHistoryOpen(payload.id)) {
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
          const editor = this.getEditor(payload.id);
          this.removeEditor(editor);
        }).then(() => {
          this.emitChange();
        });
        break;
      case UserActions.RENAME_FILE:
        if (this.setTabTitle(payload.id, payload.newName)) {
          this.emitChange();
        }
        break;
      case UserActions.CLOSE_ALL: {
        const editors = this.getEditors().slice(0);
        editors.forEach(editor => {
          this.removeEditor(editor);
          this.emitChange();
        });
        break;
      }
      default:
    }
  }

  activateTab(id, historical) {
    const editor = this.editors.find((editor) => {
      return editor.modelId === id && editor.historical === historical;
    });
    this.activeEditor = editor;
  }

  createModel(id) {
    return this.modelService.create({
      collection: this.collectionId,
      id,
      data: {
        content: ''
      }
    });
  }

  openModel(modelId) {
    return this.modelService.open(modelId);
  }

  openHistoricalModel(modelId) {
    return this.modelService.history(modelId);
  }

  deleteModel(modelId) {
    return this.modelService.remove(modelId);
  }

  createEditor(id, model, historical) {
    const editor = new EditorData(id, this.getFileName(id), model, historical);
    this.editors.push(editor);
    this.activeEditor = editor;
  }

  getEditorIndex(editor) {
    return this.editors.findIndex((e) => {
      return e === editor;
    });
  }

  getEditor(id) {
    return this.editors.find(e => e.modelId === id);
  }

  isFileOpen(id) {
    return this.editors.some(editor => {
      return editor.modelId === id && editor.historical === false;
    });
  }

  isFileHistoryOpen(id) {
    return this.editors.some(editor => {
      return editor.modelId === id && editor.historical === true;
    });
  }

  removeEditor(editor) {
    const index = this.getEditorIndex(editor);

    if (index >= 0) {
      if (!editor.historical) {
        console.log('closing model', editor.modelId);
        try {
          editor.model.close();
        } catch (e) {
          console.log('caught', e);
        }
      }

      this.editors.splice(index, 1);

      if (this.editors.length > 0) {
        this.activeEditor = this.editors[0];
      } else {
        delete this.activeEditor;
      }
    }
  }

  getFileName(fileId) {
    return this.rtModel.elementAt(['tree', 'nodes', fileId]).get('name').value();
  }

  setTabTitle(id, title) {
    const editor = this.getEditor(id);
    const index = this.getEditorIndex(editor);
    if (editor) {
      editor.title = title;
    }
    return index >= 0;
  }

  getHistoryId(id) {
    return `history:${id}`;
  }
}
