import React, {PropTypes} from 'react';

import InlineInput from './InlineInput.jsx';

export default class RenamableNode extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onCancel: PropTypes.func,
    onComplete: PropTypes.func.isRequired,
    renaming: PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }

  handleClick(e) { e.stopPropagation(); }

  render() {
    var labelStyle = {display: this.props.renaming ? 'none' : 'inline-block'};
    
    let {name, ...rest} = this.props;

    let inputField;
    if(this.props.renaming) {
      inputField = (
        <span onClick={this.handleClick}>
          <InlineInput value={name} {...rest} />
        </span>
      );
    }

    return (
      <span>
        <span style={labelStyle}>{this.props.name}</span>
        {inputField}
      </span>
    );
  }  
}
