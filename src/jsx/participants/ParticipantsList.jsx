import React from 'react';
import Participant from './Participant.jsx';
import {autobind} from 'core-decorators';
import colorAssigner from '../../js/color-util.js';

export default class ParticipantsList extends React.Component {
  static propTypes = {
    activity: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      participants: []
    };
  }

  componentDidMount() {
    this.subscription = this.props.activity.asObservable().subscribe((participants) => {
      this.setState({participants: participants});
    });
  }

  componentWillUnmount() {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  createParticipant(participant) {
    return (<Participant
      key={participant.sessionId()}
      displayName={participant.username()}
      color={colorAssigner.getColorAsHex(participant.sessionId())} />);
  }

  render() {
    const participants = this.state.participants.map(participant => {
      return this.createParticipant(participant);
    });

    return (<div className="participants-list">{participants}</div>);
  }
}
