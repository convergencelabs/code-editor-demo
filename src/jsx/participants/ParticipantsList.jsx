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
    this.subscription = this.props.activity.participants().subscribe((participants) => {
      this.props.activity.on("session_joined", this.handleSessionJoined);
      this.props.activity.on("session_left", this.handleSessionLeft);

      this.setState({participants: participants});
    });
  }

  componentWillUnmount() {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }

    this.props.activity.off("session_joined", this.handleSessionJoined);
    this.props.activity.off("session_left", this.handleSessionLeft);
  }

  @autobind
  handleSessionJoined(e) {
    const newParticipants = this.state.participants.concat(e.participant);
    this.setState({participants: newParticipants});
  }

  @autobind
  handleSessionLeft(e) {
    const newParticipants = this.state.participants.filter((element) => {return element.sessionId() !== e.sessionId;});
    this.setState({participants: newParticipants});
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
