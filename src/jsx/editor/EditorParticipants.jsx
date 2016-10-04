import React from 'react';

export default class EditorParticipants extends React.Component {
  render() {
    return (
      <div className="status-bar-participants">
        <i className="fa fa-users"/>
        <span className="">{this.props.participants.length}</span>
      </div>
    );
  }
}


