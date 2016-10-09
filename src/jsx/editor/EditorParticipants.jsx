import React from 'react';

export default class EditorParticipants extends React.Component {
  render() {
    var participants = this.props.participants.map((participant) => {
      return <div key={participant.username} title={participant.username} className="participant-indicator" style={{background: participant.color}}></div>;
    });

    return (
      <div className="status-bar-participants">
        <span>{this.props.participants.length}</span>
        <i className="fa fa-users"/>
        <div className="participant-indicators">{participants}</div>
      </div>
    );
  }
}


