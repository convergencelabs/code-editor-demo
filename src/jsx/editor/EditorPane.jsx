import React, {PropTypes} from 'react';
import Editor from './Editor.jsx';
import StatusBar from './StatusBar.jsx';
import PlaybackBar from './PlaybackBar.jsx';

export default class EditorPane extends React.Component {
  static propTypes = {
    fileModel: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      cursor: {
        row: 0,
        column: 0
      }
    };
  }

  handleCursorMove = (cursor) => {
    this.setState({cursor: cursor});
  }

  /* todo deduce fileType from file suffix */
  render() {
    let playbackPanel;
    if (this.props.historical) {
      playbackPanel = <PlaybackBar />;
    }

    return (
      <div className="editor-pane">
        {playbackPanel}
        <Editor onCursorMove={this.handleCursorMove} fileModel={this.props.fileModel} />
        <StatusBar
          fileType="JavaScript"
          cursor={this.state.cursor}
          multiUser
          participants={[{username: "test1", color: 'green'}, {username: "test2", color: 'blue'}]}
        />
      </div>
    );
  }
}
