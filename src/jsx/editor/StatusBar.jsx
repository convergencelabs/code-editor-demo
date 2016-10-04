import React from 'react';
import EditorParticipants from './EditorParticipants.jsx';

export default class ParticipantsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var line = this.props.cursor.row;
    var col = this.props.cursor.column;
    return (
      <div className="status-bar">
        <div className="status-bar-content">
          <span className="status-bar-file-type">{this.props.fileType}</span>
          <span className="status-bar-cursor-indicator">Line: {line}, Column: {col}</span>
          <EditorParticipants participants={["user1, user2"]}/>
        </div>
      </div>
    );
  }
}


