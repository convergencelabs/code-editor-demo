import React, {PropTypes} from 'react';
import moment from 'moment';
import ChatText from './ChatText.jsx';

const ChatMessage = function (props) {

  const className = "chat-message " +
    (props.local ? "local-chat-message" : "remote-chat-message");

  const time = moment(props.timestamp).format('h:mma');

  return (
    <div className="chat-message-wrapper">
      <div className={className} style={{borderColor: props.color}}>
        <span className="chat-message-username">{props.username}</span>
        <span className="chat-message-time">{time}</span>
        <ChatText text={props.message} />
      </div>
    </div>
  );
};

ChatMessage.propTypes = {
  color: PropTypes.string.isRequired,
  local: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  timestamp: PropTypes.instanceOf(Date),
  username: PropTypes.string.isRequired
};

export default ChatMessage;
