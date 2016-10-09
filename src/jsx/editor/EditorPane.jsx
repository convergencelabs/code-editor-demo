import React, {PropTypes} from 'react';
import Editor from './Editor.jsx';
import StatusBar from './StatusBar.jsx';
import PlaybackBar from './PlaybackBar.jsx';

export default class EditorPane extends React.Component {
  static propTypes = {
    historical: PropTypes.bool.isRequired
  };

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
        {(() => {if (this.props.historical) return <PlaybackBar />; })()}
        <Editor
          onCursorChanged={(c) => this._cursorChanged(c)}
          historical={this.props.historical}
        />
        <StatusBar
          fileType="JavaScript"
          cursor={this.state.cursor}
          multiUser={!this.props.historical}
          participants={[{username: "test1", color: 'green'}, {username: "test2", color: 'blue'}]}
        />
      </div>
    );
  }
}
