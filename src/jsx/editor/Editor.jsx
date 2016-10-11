import React, {PropTypes} from 'react';
import ace from 'brace';

import {AceMultiCursorManager} from 'ace-collab-ext';

require('brace/mode/javascript');
require('brace/theme/monokai');

export default class Editor extends React.Component {
  static propTypes = {
    fileModel: PropTypes.object,
    historical: PropTypes.bool.isRequired,
    onCursorMove: PropTypes.func.isRequired
  };

   componentDidMount() {
     this.initEditor();
   }

  initEditor() {
    this._editor = ace.edit(this._container);
    this._editor.setTheme("ace/theme/monokai");
    this._editor.getSession().setMode('ace/mode/javascript');
    this._editor.getSession().setValue(this.props.fileModel.root().get('content').data());

    this._editor.getSession().selection.on('changeCursor', () => {
      const cursorPosition = this._editor.getCursorPosition();
      this.props.onCursorMove(cursorPosition);
    });

    this._editor.setReadOnly(this.props.historical);
  }

  render() {
    return (
      this.props.fileModel !== undefined ?
        <div className="editor" ref={(div) => { this._container = div; }} /> :
        <div>loading...</div>
    );
  }
}
