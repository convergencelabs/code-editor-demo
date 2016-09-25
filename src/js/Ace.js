export default class Ace {
  constructor(ace) {
    this.editor = ace.edit("editor");
    this.editor.setReadOnly(true);
    this.session = this.editor.getSession();
    this.document = this.session.getDocument();

    this.session.setMode("ace/mode/javascript");
    this.editor.setTheme("ace/theme/monokai");

    this.cursorManager = new AceMultiCursorManager(this.session);
    this.selectionManager = new AceMultiSelectionManager(this.session);
  }

  initialize(rtString) {
    this.editor.setReadOnly(false);

    // Initialize editor with current text.
    suppressEvents = true;
    this.document.setValue(rtString.data());
    suppressEvents = false;
  }

  onRemoteInsert(e) {
    suppressEvents = true;
    this.document.insert(this.document.indexToPosition(e.index), e.value);
    suppressEvents = false;
  }

  onRemoteDelete(e) {
    var start = this.document.indexToPosition(e.index);
    var end = this.document.indexToPosition(e.index + e.value.length);
    suppressEvents = true;
    this.document.remove(new AceRange(start.row, start.column, end.row, end.column));
    suppressEvents = false;
  }

  onRemoteAdd(e) {
    suppressEvents = true;
    this.document.setValue(e.value);
    suppressEvents = false;
  }

  setSelection(id, value) {
    this.selectionManager.setSelection(id, this.toAceRange(value));
  }

  toAceRange(value) {
    if (value === null || value === undefined) {
      return null;
    }

    var start = value.start;
    var end = value.end;

    if (start > end) {
      var temp = start;
      start = end;
      end = temp;
    }

    var selectionAnchor = this.document.indexToPosition(start);
    var selectionLead = this.document.indexToPosition(end);
    return new AceRange(selectionAnchor.row, selectionAnchor.column, selectionLead.row, selectionLead.column);
  }

  reset() {
    this.editor.setValue("");
    this.editor.setReadOnly(true);
  }
}