export default class EditorData {
  constructor(id, title, model, historical) {
    this.modelId = id;
    this.title = title;
    this.model = model;
    this.historical = historical;
  }

  setModel(model) {
    this.model = model;
  }
}
