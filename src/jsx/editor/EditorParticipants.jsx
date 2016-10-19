import React from 'react';
import colorAssigner from '../../js/color-util';

const EditorParticipants = function (props) {
  var participants = props.participants.map((participant) => {
    return (<div
      key={participant.sessionId}
      title={participant.username}
      className="participant-indicator"
      style={{background: colorAssigner.getColorAsHex(participant.sessionId)}} />);
  });

  return (
    <div className="status-bar-participants">
      <span>{props.participants.length}</span>
      <i className="fa fa-users" />
      <div className="participant-indicators">{participants}</div>
    </div>
  );
};

EditorParticipants.propTypes = {
  participants: React.PropTypes.array
};

export default EditorParticipants;
