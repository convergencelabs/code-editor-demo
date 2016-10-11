export default class EditorData {
  constructor(id, title) {
    this.modelId = id;
    this.title = title;
  }

  setModel(model) {
    this.model = model;
  }
}