export default class ReferenceHandler {
  constructor(rtString, ace) {
    this.ace = ace;
    // Create and publish a local cursor.
    this.localCursor = rtString.indexReference("cursor");
    this.localCursor.publish();

    // Create and publish a local selection.
    this.localSelection = rtString.rangeReference("selection");
    this.localSelection.publish();

    this.initializeExistingReferences(rtString, ace);

    // Listen for remote references.
    rtString.on("reference", function (e) {
      this.handleReference(e.reference);
    }.bind(this));

    this.handleAceCursorChanged = this.handleAceCursorChanged.bind(this);
    this.handleAceSelectionChanged = this.handleAceSelectionChanged.bind(this);

    this.ace.session.selection.on('changeCursor', this.handleAceCursorChanged);
    this.ace.session.selection.on('changeSelection', this.handleAceSelectionChanged);
  }

  initializeExistingReferences(rtString) {
    rtString.references().forEach(function (reference) {
      if (!reference.isLocal()) {
        this.handleReference(reference);
        if (reference.key() === "cursor") {
          this.ace.cursorManager.setCursor(reference.sessionId(), reference.value());
        } else if (reference.key() === "selection") {
          this.ace.setSelection(reference.sessionId(), reference.value());
        }
      }
    }.bind(this));
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Incoming events
  ///////////////////////////////////////////////////////////////////////////////
  handleReference(reference) {
    if (reference.key() === "cursor") {
      this.handleRemoteCursorReference(reference);
    } else if (reference.key() === "selection") {
      this.handleRemoteSelectionReference(reference);
    }
  }

  handleRemoteCursorReference(reference) {
    var color = users[reference.sessionId()].color;
    this.ace.cursorManager.addCursor(
      reference.sessionId(),
      reference.username(),
      color);

    reference.on("set", function () {
      this.ace.cursorManager.setCursor(reference.sessionId(), reference.value());
    }.bind(this));

    reference.on("cleared", function () {
      this.ace.cursorManager.clearCursor(reference.sessionId());
    }.bind(this));

    reference.on("disposed", function () {
      this.ace.cursorManager.removeCursor(reference.sessionId());
    }.bind(this));
  }

  handleRemoteSelectionReference(reference) {
    var color = users[reference.sessionId()].color;
    this.ace.selectionManager.addSelection(
      reference.sessionId(),
      reference.username(),
      color);

    reference.on("set", function (e) {
      this.ace.setSelection(reference.sessionId(), e.src.value());
    }.bind(this));

    reference.on("cleared", function () {
      this.ace.selectionManager.clearSelection(reference.sessionId());
    }.bind(this));

    reference.on("disposed", function () {
      this.ace.selectionManager.removeSelection(reference.sessionId());
    }.bind(this));
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Outgoing events
  ///////////////////////////////////////////////////////////////////////////////
  handleAceCursorChanged() {
    if (!suppressEvents) {
      var pos = this.ace.document.positionToIndex(this.ace.editor.getCursorPosition());
      this.localCursor.set(pos);
    }
  }

  handleAceSelectionChanged() {
    if (!suppressEvents) {
      if (!this.ace.editor.selection.isEmpty()) {
        // todo ace has more complex seleciton capabilities beyond a single range.
        var start = this.ace.document.positionToIndex(this.ace.editor.selection.anchor);
        var end = this.ace.document.positionToIndex(this.ace.editor.selection.lead);
        this.localSelection.set({start: start, end: end});
      } else if (this.localSelection.isSet()) {
        this.localSelection.clear();
      }
    }
  }

  detach() {
    this.ace.session.selection.off('changeCursor', this.handleAceCursorChanged);
    this.ace.session.selection.off('changeSelection', this.handleAceSelectionChanged);
  }
}