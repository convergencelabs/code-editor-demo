import React, {PropTypes} from 'react';

export default class ChatContainer extends React.Component {

  static propTypes = {
    messages: PropTypes.array.isRequired
  };

  componentDidUpdate(prevProps) {
    if (this.props.messages.length != prevProps.messages.length) {
      this._container.scrollTop = this._container.scrollHeight;
    }
  }

  render() {
    return (
      <div className="chat-container" ref={(e) => this._container = e}>
        {this.props.messages}
      </div>
    );
  }
}
