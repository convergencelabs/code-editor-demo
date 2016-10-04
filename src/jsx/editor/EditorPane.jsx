import React from 'react';

import Editor from './Editor.jsx';
import StatusBar from './StatusBar.jsx';

export default class EditorPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cursor: {
        row: 0,
        column: 0
      }
    }
  }

  _cursorChanged(cursor) {
    this.setState({cursor: cursor});
  }

  render() {
    return (
      <div className="editor-pane">
        <Editor
          onCursorChanged={(c) => this._cursorChanged(c)}
        />
        <StatusBar
          fileType="JavaScript"
          cursor={this.state.cursor}
        />
      </div>
    );
  }
}
