import ace from 'brace';
const AceRange = ace.acequire('ace/range').Range;
import {AceMultiCursorManager} from 'ace-collab-ext';
import {AceMultiSelectionManager} from 'ace-collab-ext';
import {AceRadarView} from 'ace-collab-ext';
import {AceViewportUtil} from 'ace-collab-ext';
import colorAssigner from '../../js/color-util.js';

const cursorKey = "cursor";
const selectionKey = "selection";
const viewKey = "view";

export default class AceBinder {

  constructor(editor, model, collaborative, radarViewElement) {
    this._editor = editor;
    this._radarViewElement = radarViewElement;
    this._model = model;

    this._session = editor.getSession();
    this._document = this._session.getDocument();

    this._cursorManager = null;
    this._cursorReference = null;

    this._selectionManager = null;
    this._selectionReference = null;

    this._radarView = null;
    this._viewReference = null;

    this._suppressEvents = false;

    this._collaborative = collaborative || false;
  }

  bind() {
    this._bindModel();
    if (this._collaborative) {
      this._bindRadarView();
      this._bindCursor();
      this._bindSelection();
    }
  }

  /////////////////////////////////////////////////////////////////////////////
  // Selection Binding
  /////////////////////////////////////////////////////////////////////////////

  _bindModel() {
    const doc = this._editor.getSession().getDocument();

    this._model.on("insert", (e) => {
      this._suppressEvents = true;
      doc.insert(doc.indexToPosition(e.index), e.value);
      this._suppressEvents = false;
    });

    this._model.on("remove", (e) => {
      const start = doc.indexToPosition(e.index);
      const end = doc.indexToPosition(e.index + e.value.length);
      this._suppressEvents = true;
      doc.remove(new AceRange(start.row, start.column, end.row, end.column));
      this._suppressEvents = false;
    });

    this._model.on("value", function (e) {
      this._suppressEvents = true;
      doc.setValue(e.value);
      this._suppressEvents = false;
    });

    this._editor.on('change', (delta) => {
      if (this._suppressEvents) {
        return;
      }

      const pos = doc.positionToIndex(delta.start);
      switch (delta.action) {
        case "insert":
          this._model.insert(pos, delta.lines.join("\n"));
          break;
        case "remove":
          this._model.remove(pos, delta.lines.join("\n").length);
          break;
        default:
          throw new Error("unknown action: " + delta.action);
      }
    });
  }

  /////////////////////////////////////////////////////////////////////////////
  // Cursor Binding
  /////////////////////////////////////////////////////////////////////////////
  _bindCursor() {
    this._cursorManager = new AceMultiCursorManager(this._editor);
    this._cusorReference = this._model.indexReference(cursorKey);

    const references = this._model.references({key: cursorKey});
    references.forEach((reference) => {
      if (!reference.isLocal()) {
        this._addCursor(reference);
      }
    });

    this._setLocalCursor();
    this._cusorReference.publish();

    this._session.selection.on('changeCursor', () => this._setLocalCursor());

    this._model.on("reference", (e) => {
      if (e.reference.key() === cursorKey) {
        this._addCursor(e.reference);
      }
    });
  }

  _setLocalCursor() {
    const position = this._editor.getCursorPosition();
    const index = this._document.positionToIndex(position);
    this._cusorReference.set(index);
  }

  _addCursor(reference) {
    const color = colorAssigner.getColorAsHex(reference.sessionId());
    const remoteCursorIndex = reference.value();
    this._cursorManager.addCursor(reference.sessionId(), reference.username(), color, remoteCursorIndex);

    reference.on("cleared", () => this._cursorManager.clearCursor(reference.sessionId()));
    reference.on("disposed", () => this._cursorManager.removeCursor(reference.sessionId()));
    reference.on("set", () => {
      const cursorIndex = reference.value();
      const cursorRow = this._document.indexToPosition(cursorIndex).row;
      this._cursorManager.setCursor(reference.sessionId(), cursorIndex);
      if (this._radarView.hasView(reference.sessionId())) {
        this._radarView.setCursorRow(reference.sessionId(), cursorRow);
      }
    });
  }

  /////////////////////////////////////////////////////////////////////////////
  // Selection Binding
  /////////////////////////////////////////////////////////////////////////////

  _bindSelection() {
    this._selectionManager = new AceMultiSelectionManager(this._editor);

    this._selectionReference = this._model.rangeReference(selectionKey);
    this._setLocalSelection();
    this._selectionReference.publish();

    this._session.selection.on('changeSelection', () => this._setLocalSelection());

    const references = this._model.references({key: selectionKey});
    references.forEach((reference) => {
      if (!reference.isLocal()) {
        this._addSelection(reference);
      }
    });

    this._model.on("reference", (e) => {
      if (e.reference.key() === selectionKey) {
        this._addSelection(e.reference);
      }
    });
  }

  _setLocalSelection() {
    if (!this._editor.selection.isEmpty()) {
      const aceRanges = this._editor.selection.getAllRanges();
      const indexRanges = aceRanges.map((aceRagne) => {
        var start = this._document.positionToIndex(aceRagne.start);
        var end = this._document.positionToIndex(aceRagne.end);
        return {start: start, end: end};
      });

      this._selectionReference.set(indexRanges);
    } else if (this._selectionReference.isSet()) {
      this._selectionReference.clear();
    }
  }

  _addSelection(reference) {
    // fixme we need the client to handle multi ranges
    const color = colorAssigner.getColorAsHex(reference.sessionId());
    const remoteSelection = reference.values().map(range => this._toAceRange(range));
    this._selectionManager.addSelection(reference.sessionId(), reference.username(), color, remoteSelection);

    reference.on("cleared", () => this._selectionManager.clearSelection(reference.sessionId()));
    reference.on("disposed", () => this._selectionManager.removeSelection(reference.sessionId()));
    reference.on("set", () => {
      this._selectionManager.setSelection(
        reference.sessionId(), reference.values().map(range => this._toAceRange(range)));
    });
  }

  // todo consider moving this into the ace range utils.
  _toAceRange(range) {
    if (typeof range !== 'object') {
      return null;
    }

    let start = range.start;
    let end = range.end;

    if (start > end) {
      var temp = start;
      start = end;
      end = temp;
    }

    const rangeAnchor = this._document.indexToPosition(start);
    const rangeLead = this._document.indexToPosition(end);
    return new AceRange(rangeAnchor.row, rangeAnchor.column, rangeLead.row, rangeLead.column);
  }

  /////////////////////////////////////////////////////////////////////////////
  // Selection Binding
  /////////////////////////////////////////////////////////////////////////////
  _bindRadarView() {
    this._radarView = new AceRadarView(this._radarViewElement, this._editor);
    this._viewReference = this._model.rangeReference(viewKey);

    const references = this._model.references({key: viewKey});
    references.forEach((reference) => {
      if (!reference.isLocal()) {
        this._addView(reference);
      }
    });

    this._session.on('changeScrollTop', () => {
      setTimeout(() => this._setLocalView(), 0);
    });

    this._model.on("reference", (e) => {
      if (e.reference.key() === viewKey) {
        this._addView(e.reference);
      }
    });

    setTimeout(() => {
      this._setLocalView();
      this._viewReference.publish();
    }, 0);
  }

  _setLocalView() {
      const viewportIndices = AceViewportUtil.getVisibleIndexRange(this._editor);
      this._viewReference.set({start: viewportIndices.start, end: viewportIndices.end});
  }

  _addView(reference) {
    const color = colorAssigner.getColorAsHex(reference.sessionId());

    // fixme need the cursor
    let cursorRow = null;
    let viewRows = null;

    if (reference.isSet()) {
      const remoteViewIndices = reference.value();
      viewRows = AceViewportUtil.indicesToRows(this._editor, remoteViewIndices.start, remoteViewIndices.end);
    }

    this._radarView.addView(reference.sessionId(), reference.username(), color, viewRows, cursorRow);

    // fixme need to implement this on the ace collab side
    reference.on("cleared", () => this._radarView.clearView(reference.sessionId()));
    reference.on("disposed", () => this._radarView.removeView(reference.sessionId()));
    reference.on("set", () => {
      const v = reference.value();
      const rows = AceViewportUtil.indicesToRows(this._editor, v.start, v.end);
      this._radarView.setViewRows(reference.sessionId(), rows);
    });
  }
}
