import React from 'react';

const Participant = function (props) {
  return (
    <div className="participant">
      <div
        className="participant-username"
        style={{borderLeftColor: props.color}}
      >{props.displayName}</div>
    </div>
  );
};

Participant.propTypes = {
  color: React.PropTypes.string,
  displayName: React.PropTypes.string
};

export default Participant;
