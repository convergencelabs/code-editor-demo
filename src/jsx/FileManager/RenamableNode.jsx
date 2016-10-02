import React, {PropTypes} from 'react';
import { autobind } from 'core-decorators';
import listensToClickOutside from 'react-onclickoutside/decorator';

@listensToClickOutside()
export default class RenamableNode extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onCancel: PropTypes.func,
    onComplete: PropTypes.func.isRequired,
    renaming: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {value: props.name};
  }


  componentWillReceiveProps(nextProps) {
    if(!this.props.renaming && nextProps.renaming) {
      this.setState({value: nextProps.name});
      setTimeout(() => {
        this._input.select();
        this._input.focus();
      });
    }
  }

  handleClickOutside() {
    if (this.props.renaming) {
      this.props.onCancel();
    }
  }

  @autobind
  handleKeyUp(event) {
    if (event.key === 'Enter') {
      this.handleBlur(event);
    } else if(event.key === 'Escape') {
      this.props.onCancel();
    }
  }
  @autobind
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  @autobind
  handleBlur() {
    this.props.onComplete(this.state.value);
  }

  render() {
    var labelStyle = {display: this.props.renaming ? 'none' : 'inline-block'};
    var inputStyle = {display: this.props.renaming ? 'inline-block' : 'none'};

    return (
      <span>
        <span style={labelStyle}>{this.props.name}</span>
        <span style={inputStyle}>
          <input ref={(c) => this._input = c} type="text" value={this.state.value} 
            onBlur={this.handleBlur} onChange={this.handleChange} onKeyUp={this.handleKeyUp} />
        </span>
      </span>
    );
  }  
}
