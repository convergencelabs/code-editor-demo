import React from 'react';
import {render} from 'react-dom';

export default class ParticipantsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="status-bar">
        <div className="status-bar-content">
          <span className="status-bar-cursor-indicator">[3, 10]</span>
        </div>
      </div>
    );
  }
}


