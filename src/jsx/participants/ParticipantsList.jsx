import React from 'react';
import Participant from './Participant.jsx';
import {autobind} from 'core-decorators';
import colorAssigner from '../../js/color-util.js';

export default class ParticipantsList extends React.Component {
  static propTypes = {
    activity: React.PropTypes.object.isRequired,
    identityCache: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      participants: []
    };
  }

  componentDidMount() {
    this.subscription = this.props.activity.participantsAsObservable().subscribe(participants => {
      var usernames = participants.map(p => p.username());
      this.props.identityCache.users(usernames).then(users => {
        const resolved = participants.map(participant => {
          const user = users[participant.username()];
          const displayName = user ? user.displayName() : "Unknown";
          return {
            displayName:displayName,
            sessionId: participant.sessionId()
          };
        });
        this.setState({participants: resolved});
      });
    });
  }

  componentWillUnmount() {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  createParticipant(participant) {
    return (<Participant
      key={participant.sessionId}
      displayName={participant.displayName}
      color={colorAssigner.getColorAsHex(participant.sessionId)} />);
  }

  render() {
    const participants = this.state.participants.map(participant => {
      return this.createParticipant(participant);
    });

    return (<div className="participants-list">{participants}</div>);
  }
}
