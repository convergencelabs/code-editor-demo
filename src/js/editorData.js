export default class EditorData {
  constructor( modelId, title, model, historical) {
    this.modelId = modelId;
    this.title = title;
    this.model = model;
    this.historical = historical;
  }

  setModel(model) {
    this.model = model;
  }
}
