import React, {PropTypes} from 'react';
import ace from 'brace';

require('brace/mode/javascript');
require('brace/theme/monokai');

export default class Editor extends React.Component {

  static propTypes = {
    file: PropTypes.object.isRequired,
    onCursorMove: PropTypes.func.isRequired
  };

  componentDidMount() {
    this._editor = ace.edit(this._container);
    this._editor.setTheme('ace/theme/monokai');
    this._editor.getSession().setMode('ace/mode/javascript');
    this._editor.getSession().setValue(this.props.file.content);

    this._editor.getSession().selection.on('changeCursor', () => {
      const cursorPosition = this._editor.getCursorPosition();
      this.props.onCursorMove(cursorPosition);
    });

    this._editor.setReadOnly(this.props.file.historical);
  }

  render() {
    return (
      <div className="editor" ref={(div) => { this._container = div}} />
    );
  }
}
