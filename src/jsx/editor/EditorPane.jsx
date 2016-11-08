import React, {PropTypes} from 'react';
import Editor from './Editor.jsx';
import StatusBar from './StatusBar.jsx';
import PlaybackBar from './PlaybackBar.jsx';

export default class EditorPane extends React.Component {
  static propTypes = {
    fileModel: PropTypes.object,
    historical: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      cursor: {
        row: 0,
        column: 0
      },
      participants: []
    };
  }

  componentDidMount() {
    if (!this.props.historical) {
      this._participantsSubscription = this.props.fileModel
        .collaboratorsAsObservable()
        .subscribe(participants => {
          this.setState({participants: participants});
        });
    }
  }

  componentWillUnmount() {
    if (this._participantsSubscription !== undefined) {
      this._participantsSubscription.unsubscribe();
    }
  }

  handleCursorMove = (cursor) => {
    this.setState({cursor: cursor});
  }

  /* todo deduce fileType from file suffix. Note: Ace has a module for this. */
  render() {
    let playbackPanel;
    if (this.props.historical) {
      playbackPanel = <PlaybackBar model={this.props.fileModel}/>;
    }

    return (
      <div className="editor-pane">
        {playbackPanel}
        <Editor
          onCursorMove={this.handleCursorMove}
          model={this.props.fileModel}
          historical={this.props.historical}/>
        <StatusBar
          fileType="JavaScript"
          cursor={this.state.cursor}
          multiUser={!this.props.historical}
          participants={this.state.participants}
        />
      </div>
    );
  }
}
