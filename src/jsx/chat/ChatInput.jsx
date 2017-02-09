import React, {PropTypes} from 'react';
import {autobind} from 'core-decorators';

export default  class ChatInput extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this._input = null;
    this.state = {
      message: ""
    };
  }

  @autobind
  handleKeyDown(event) {
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
          onKeyDown={this.handleKeyDown}
          rows="3"
        />
      </div>
    );
  }
}
