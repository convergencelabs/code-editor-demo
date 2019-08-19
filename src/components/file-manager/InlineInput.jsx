import React from 'react';
import PropTypes from 'prop-types';
import listensToClickOutside from 'react-onclickoutside';

export class InlineInput extends React.Component {
  static propTypes = {
    onCancel: PropTypes.func,
    onComplete: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {value: props.value};
  }

  componentDidMount() {
    this._input.select();
    this._input.focus();
  }

  handleClickOutside() {
    this._input.blur();
  }

  handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      this._input.blur();
    } else if(event.key === 'Escape') {
      this.cancelled = true;
      this._input.blur();
    }
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleBlur = () => {
    if(!this.cancelled && this.props.value !== this.state.value) {
      this.props.onComplete(this.state.value);
    } else {
      this.props.onCancel();
    }
  }

  render() {
    return (
      <input
        className="inline-input"
        ref={(c) => this._input = c}
        type="text" value={this.state.value}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyUp} />
    );
  }  
}

export default listensToClickOutside(InlineInput);
