import React from 'react';
import listensToClickOutside from 'react-onclickoutside/decorator';

@listensToClickOutside()
export default class Popover extends React.Component {
  static propTypes = {
    display: React.PropTypes.bool,
    onHide: React.PropTypes.func.isRequired
  }

  handleClickOutside() {
    if (this.props.display) {
      this.props.onHide(false);
    }
  }

  handleClick = (e) => {
    e.stopPropagation();
  }

  render() {
    const menuStyle = {display: this.props.display ? 'block' : 'none'};

    return (
      <div className="popover-menu" style={menuStyle} onClick={this.handleClick}>
        {this.props.children}
      </div>
    );
  }
}