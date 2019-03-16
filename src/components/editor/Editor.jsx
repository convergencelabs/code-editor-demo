import React from 'react';
import PropTypes from 'prop-types';
import * as ace from 'ace-builds';
import AceBinder from './AceBinder.js';

// require('brace/mode/javascript');
// require('brace/mode/java');
// require('brace/mode/text');
// require('brace/mode/html');
//
// require('brace/theme/monokai');


export default class Editor extends React.Component {
  static propTypes = {
    fileMode: PropTypes.string.isRequired,
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
    this._editor.getSession().setMode(this.props.fileMode);
    this._editor.getSession().setValue(contentModel.value());

    this._editor.getSession().selection.on('changeCursor', () => {
      const cursorPosition = this._editor.getCursorPosition();
      this.props.onCursorMove(cursorPosition);
    });

    this._editor.setReadOnly(this.props.historical);

    const aceBinder = new AceBinder(this._editor, contentModel, !this.props.historical, this._radarViewElement);
    aceBinder.bind();
  }

  render() {
    return (
      this.props.model !== undefined ?
        <div className="editor-container">
          <div className="editor" ref={(div) => {
            this._container = div;
          }} />
          <div className="radar-view" ref={(div) => {
            this._radarViewElement = div;
          }} />
        </div> :
        <div>loading...</div>
    );
  }
}
