import React from 'react';
import colorAssigner from '../../js/color-util';

// fixme we wanted a tooltip, but getting identity for the display name is
// async which requires this to be refactored a bit
const EditorParticipants = function (props) {
  var participants = props.participants.map((participant) => {
    return (<div
      key={participant.sessionId()}
      className="participant-indicator"
      style={{background: colorAssigner.getColorAsHex(participant.sessionId())}} />);
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
  identityCache: React.PropTypes.object.isRequired,
  participants: React.PropTypes.array
};

export default EditorParticipants;
