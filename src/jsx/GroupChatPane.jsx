import React from 'react';
import moment from 'moment';

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
        local={false}
        key={this.state.messages.length}
      />
    );
  }

  _onRemoteMessage(message) {
    this.state.messages.push(
      <ChatMessage
        username={message.username}
        color={message.color}
        message={message.message}
        timestamp={message.timestamp}
        local={false}
        key={this.state.messages.length}
      />
    );
    this.setState({messages: this.state.messages})
  }

  sendMessage(message) {
    var messages = this.state.messages.slice(0);
    messages.push(
      <ChatMessage
        username="local user"
        color="#66D9EF"
        message={message}
        timestamp={new Date()}
        local={true}
        key={this.state.messages.length}
      />
    );
    this.setState({messages: messages})
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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.messages.length != prevProps.messages.length) {
      this._container.scrollTop = this._container.scrollHeight;
    }
  }

  render() {
    var messages = this.props.messages;
    return (
      <div className="chat-container" ref={(e) => this._container = e}>
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
    const className = "chat-message " +
      (this.props.local ? "local-chat-message" : "remote-chat-message");

    const time = moment(this.props.timestamp).format('h:mma');

    return (
      <div className="chat-message-wrapper">
        <div className={className} style={{borderColor: this.props.color}}>
          <span className="chat-message-username">{this.props.username}</span>
          <span className="chat-message-time">{time}</span>
          <ChatText text={this.props.message} />
        </div>
      </div>
    );
  }
}


class ChatText extends React.Component {
  _breakLines(text) {
    const regex = /(?:\r\n|\r|\n)/g;
    var matches = text.split(regex);
    return this._intersperse(matches, React.createElement('br'));
  }

  _intersperse(arr, el) {
    var res = [], i=0;
    if (i < arr.length)
      res.push(arr[i++]);
    while (i < arr.length)
      res.push(el, arr[i++]);
    return res;
  }

  render() {
    const text = this._breakLines(this.props.text);
    return <div className="chat-message-text">{text}</div>;
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
      event.preventDefault();
    }
  }

  render() {
    return (
      <div className="chat-input">
        <textarea
          placeholder="Send Message"
          ref={(e) => this._input = e}
          onKeyDown={this._handleKeyDown.bind(this)}
          rows="3"
        />
      </div>
    );
  }
}
