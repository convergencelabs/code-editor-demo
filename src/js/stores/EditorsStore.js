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
    this.editors = this.getEditors().editors;
    this.rtModel.valueAt(['editors', this.username, 'tabs']).forEach(editor => {
      const modelId = editor.get('modelId').data();
      if(!this.activeFile) {
        this.activeFile = modelId;
      }
      this.openModel(modelId).then(rtModel => {
        const editor = this.editors.find(editor => { 
          return editor.modelId === rtModel.modelId();
        });
        editor.setModel(rtModel);
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
      editors.push(new EditorData(modelId, this.getFileName(modelId)));
    });
    return {
      editors,
      activeFile: this.activeFile
    };
  }

  getFileName(fileId) {
    return this.rtModel.valueAt(['tree', 'nodes', fileId]).get('name').data();
  }

  actionHandler(action) {
    switch (action.type) {
      case UserActions.OPEN_FILE:
        
        break;
    }
    this.emitChange(action);
  }

}
