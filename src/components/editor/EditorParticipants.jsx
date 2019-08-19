import React from 'react';
import PropTypes from 'prop-types';
import colorAssigner from '../../color-util';

const EditorParticipants = function (props) {
  const participants = props.participants.map((participant) => {
    return (<div
      key={participant.sessionId}
      className="participant-indicator"
      style={{background: colorAssigner.getColorAsHex(participant.sessionId)}}
      title={participant.user.displayName} />);
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
  participants: PropTypes.array
};

export default EditorParticipants;
