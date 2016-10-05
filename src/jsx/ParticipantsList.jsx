import React from 'react';

export default class ParticipantsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      participants: [
        <Participant key="user1" username="user1" displayName="User One" color="blue"/>,
        <Participant key="user2" username="user2" displayName="User Two" color="green"/>
      ]
    }
  }

  render() {
    return (
      <div className="participants-list">
        {this.state.participants}
      </div>
    );
  }
}

class Participant extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="participant">
        <div
          className="participant-username"
          style={{borderLeftColor: this.props.color}}
        >{this.props.displayName}</div>
      </div>
    );
  }
}

