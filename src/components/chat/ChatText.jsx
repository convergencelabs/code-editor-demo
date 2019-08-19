import React from 'react';
import PropTypes from 'prop-types';

export default class ChatText extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  };

  _breakLines(text) {
    const regex = /(?:\r\n|\r|\n)/g;
    const matches = text.split(regex);
    return this._intersperse(matches, React.createElement('br'));
  }

  _intersperse(arr, el) {
    const res = [];
    let i = 0;

    if (i < arr.length) {
      res.push(arr[i++]);
    }

    while (i < arr.length) {
      res.push(el, arr[i++]);
    }

    return res;
  }

  render() {
    const text = this._breakLines(this.props.text);
    return <div className="chat-message-text">{text}</div>;
  }
}
