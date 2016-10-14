import React, {PropTypes} from 'react';
import ace from 'brace';
import AceBinder from './AceBinder.js';

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

    if (this.props.historical) {
      this._editor.setReadOnly(true);
    } else {
      const aceBinder = new AceBinder(this._editor, contentModel, this._radarViewElement);
      aceBinder.bind();
    }
  }

  render() {
    return (
      this.props.model !== undefined ?
        <div className="editor-container">
          <div className="editor" ref={(div) => {this._container = div;}} />
          <div className="radar-view" ref={(div) => {this._radarViewElement = div;}} />
        </div> :
        <div>loading...</div>
    );
  }
}
