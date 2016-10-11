import React from 'react';
import ChatContainer from './ChatContainer.jsx';
import ChatInput from './ChatInput.jsx';
import ChatMessage from './ChatMessage.jsx';
import {autobind} from 'core-decorators';

export default class GroupChatPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };

    this.state.messages.push(
      <ChatMessage
        username="remote user"
        color="#F67421"
        message="A test messages"
        timestamp={new Date()}
        key={this.state.messages.length}
        local={false}
      />
    );
  }

  @autobind
  _onRemoteMessage(message) {
    this.state.messages.push(
      <ChatMessage
        username={message.username}
        color={message.color}
        message={message.message}
        timestamp={message.timestamp}
        key={this.state.messages.length}
        local={false}
      />
    );
    this.setState({messages: this.state.messages});
  }

  @autobind
  handleChatSubmit(message) {
    var messages = this.state.messages.slice(0);
    messages.push(
      <ChatMessage
        username="local user"
        color="#66D9EF"
        message={message}
        timestamp={new Date()}
        local
        key={this.state.messages.length}
      />
    );

    this.setState({messages: messages});
  }

  render() {
    return (
      <div className="group-chat">
        <ChatContainer
          messages={this.state.messages}
        />
        <ChatInput
          onSubmit={this.handleChatSubmit}
        />
      </div>
    );
  }
}
