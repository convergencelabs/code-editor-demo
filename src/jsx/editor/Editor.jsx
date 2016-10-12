import React, {PropTypes} from 'react';
import ace from 'brace';
const AceRange = ace.acequire('ace/range').Range;
import {AceMultiCursorManager} from 'ace-collab-ext';
import colorAssigner from '../../js/color-util.js';


require('brace/mode/javascript');
require('brace/theme/monokai');

export default class Editor extends React.Component {
  static propTypes = {
    historical: PropTypes.bool.isRequired,
    model: PropTypes.object,
    onCursorMove: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.initEditor();
  }

  initEditor() {
    const contentModel = this.props.model.root().get('content');

    this._editor = ace.edit(this._container);
    this._editor.setTheme("ace/theme/monokai");
    this._editor.getSession().setMode('ace/mode/javascript');
    this._editor.getSession().setValue(contentModel.data());

    this._editor.getSession().selection.on('changeCursor', () => {
      const cursorPosition = this._editor.getCursorPosition();
      this.props.onCursorMove(cursorPosition);
    });

    this._editor.setReadOnly(this.props.historical);

    bindAceToModel(this._editor, contentModel);
    bindAceToCursor(this._editor, contentModel, "cursor");
  }

  render() {
    return (
      this.props.model !== undefined ?
        <div className="editor" ref={(div) => {this._container = div;}} /> :
        <div>loading...</div>
    );
  }
}


let suppressEvents = false;

function bindAceToModel(editor, rtString) {
  const doc = editor.getSession().getDocument();

  rtString.on("insert", (e) => {
    suppressEvents = true;
    doc.insert(doc.indexToPosition(e.index), e.value);
    suppressEvents = false;
  });

  rtString.on("remove", (e) => {
    var start = doc.indexToPosition(e.index);
    var end = doc.indexToPosition(e.index + e.value.length);
    suppressEvents = true;
    doc.remove(new AceRange(start.row, start.column, end.row, end.column));
    suppressEvents = false;
  });

  rtString.on("value", function (e) {
    suppressEvents = true;
    doc.setValue(e.value);
    suppressEvents = false;
  });

  editor.on('change', (delta) => {
    if (suppressEvents) {
      return;
    }

    var pos = doc.positionToIndex(delta.start);
    switch (delta.action) {
      case "insert":
        rtString.insert(pos, delta.lines.join("\n"));
        break;
      case "remove":
        rtString.remove(pos, delta.lines.join("\n").length);
        break;
      default:
        throw new Error("unknown action: " + delta.action);
    }
  });
}

function bindAceToCursor(editor, rtString, referenceKey) {
  const cursorManager = new AceMultiCursorManager(editor);

  const session = editor.getSession();
  const doc = session.getDocument();

  const references = rtString.references({key: referenceKey});
  references.forEach((reference) => { addCursor(reference); });

  const localReference = rtString.indexReference(referenceKey);
  setLocalReference();
  localReference.publish();

  session.selection.on('changeCursor', () => setLocalReference());

  function setLocalReference() {
    const position = editor.getCursorPosition();
    const index = doc.positionToIndex(position);
    localReference.set(index);
  }

  rtString.on("reference", (e) => {
    if (e.reference.key() === referenceKey) {
      addCursor(e.reference);
    }
  });

  function addCursor(reference) {
    const color = colorAssigner.getColorAsHex(reference.sessionId());
    const remoteCursorIndex = reference.value();
    cursorManager.addCursor(reference.sessionId(), reference.username(), color, remoteCursorIndex);

    reference.on("cleared", e => cursorManager.clearCursor(e.sessionId));
    reference.on("disposed", e =>  cursorManager.removeCursor(e.sessionId));
    reference.on("set", () => {
      cursorManager.setCursor(reference.sessionId(), reference.value());
    });
  }
}
