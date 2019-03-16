import React from 'react';
import PropTypes from 'prop-types';
import listensToClickOutside from 'react-onclickoutside';

class Popover extends React.Component {
  static propTypes = {
    display: PropTypes.bool,
    onHide: PropTypes.func.isRequired
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

export default listensToClickOutside(Popover);
