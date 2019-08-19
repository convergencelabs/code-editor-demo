import React from 'react';
import PropTypes from 'prop-types';
import Editor from './Editor.jsx';
import StatusBar from './StatusBar.jsx';
import PlaybackBar from './PlaybackBar.jsx';
import * as ace from 'ace-builds';

import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/ext-modelist";

export default class EditorPane extends React.Component {
  static propTypes = {
    fileModel: PropTypes.object.isRequired,
    fileName: PropTypes.string.isRequired,
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
  };

  /* todo deduce fileType from file suffix. Note: Ace has a module for this. */
  render() {
    const modeList = ace.require("ace/ext/modelist");
    const mode = modeList.getModeForPath(this.props.fileName);

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
          historical={this.props.historical}
          fileMode={mode.mode}
        />
        <StatusBar
          fileType={mode.caption}
          cursor={this.state.cursor}
          multiUser={!this.props.historical}
          participants={this.state.participants}
        />
      </div>
    );
  }
}
