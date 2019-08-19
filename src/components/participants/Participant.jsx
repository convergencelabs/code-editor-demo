import React from 'react';
import PropTypes from 'prop-types';

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
  color: PropTypes.string,
  displayName: PropTypes.string
};

export default Participant;
