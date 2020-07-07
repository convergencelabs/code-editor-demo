import React from 'react';
import PropTypes from 'prop-types';
import ChatContainer from './ChatContainer.jsx';
import ChatInput from './ChatInput.jsx';
import ChatMessage from './ChatMessage.jsx';
import colorAssigner from '../../color-util.js';

export default class GroupChatPane extends React.Component {

  static propTypes = {
    chatRoom: PropTypes.object.isRequired,
    displayName: PropTypes.string.isRequired,
    domain: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    this.props.chatRoom.on("message", this._onRemoteMessage);
  }

  componentWillUnmount() {
    this.props.chatRoom.off("message", this._onRemoteMessage);
  }

  _onRemoteMessage = (event) => {
    const messages = this.state.messages.slice(0);
    messages.push(
      <ChatMessage
        username={event.user.displayName}
        color={colorAssigner.getColorAsHex(event.user.username)}
        message={event.message}
        timestamp={new Date(event.timestamp)}
        key={this.state.messages.length}
        local={false}
      />
    );
    this.setState({messages: messages});
  }

  handleChatSubmit = (message) => {
    this.props.chatRoom.send(message);
  }

  render() {
    return (
      <div className="group-chat">
        <ChatContainer
          chatRoom={this.props.chatRoom}
          messages={this.state.messages}
        />
        <ChatInput
          chatRoom={this.props.chatRoom}
          onSubmit={this.handleChatSubmit}
        />
      </div>
    );
  }
}
