import React from 'react';
import {render} from 'react-dom';

export default class GroupChatPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
  }

  sendMessage(message) {
    var messages = this.state.messages.slice(0);
    messages.push(
      <ChatMessage
        username="local user"
        color="blue"
        message={message}
        timestamp={new Date()}
        local={true}
        key={messages.length}
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
          onSubmit={this.sendMessage.bind(this)}
        />
      </div>
    );
  }
}

class ChatContainer extends React.Component {
  constructor(props) {
    super(props);


  }

  render() {
    var messages = this.props.messages;
    return (
      <div className="chat-container">
        {messages}
      </div>
    );
  }
}

class ChatMessage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var className = "chat-message " +
      (this.props.local ? "local-chat-message" : "remote-chat-message");

    return (
      <div className={className}>{this.props.message}</div>
    );
  }
}


class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this._input = null;
    this.state = {
      message: ""
    }
  }

  _handleKeyDown(event) {
    if (event.keyCode === 13 && !event.shiftKey && this._input.value !== "") {
      this.props.onSubmit(this._input.value);
      this._input.value = "";
    }
  }

  render() {
    return (
      <div className="chat-input">
        <input
          type="text"
          placeholder="Send Message"
          ref={(e) => this._input = e}
          onKeyDown={this._handleKeyDown.bind(this)}
        />
      </div>
    );
  }
}
