import React from 'react';
import PropTypes from 'prop-types';
import Participant from './Participant.jsx';
import colorAssigner from '../../color-util.js';

export default class ParticipantsList extends React.Component {
  static propTypes = {
    activity: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      participants: []
    };
  }

  componentDidMount() {
    this.subscription = this.props.activity.participantsAsObservable().subscribe(participants => {
      this.setState({participants});
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
      displayName={participant.user.displayName}
      color={colorAssigner.getColorAsHex(participant.sessionId)} />);
  }

  render() {
    const participants = this.state.participants.map(participant => {
      return this.createParticipant(participant);
    });

    return (<div className="participants-list">{participants}</div>);
  }
}
