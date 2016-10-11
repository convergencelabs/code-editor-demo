export default class EditorData {
  constructor(id, title, model) {
    this.modelId = id;
    this.title = title;
    this.model = model;
  }

  setModel(model) {
    this.model = model;
  }
}