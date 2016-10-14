export default class EditorData {
  constructor(editorId, modelId, title, model, historical) {
    this.editorId = editorId;
    this.modelId = modelId;
    this.title = title;
    this.model = model;
    this.historical = historical;
  }

  setModel(model) {
    this.model = model;
  }
}
