import React from 'react';
import PropTypes from 'prop-types';

export default class ProjectItem extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired
  };

  handleClick = () => {
    this.props.onClick(this.props.project.id);
  }

  handleDoubleClick = () => {
    this.props.onDoubleClick(this.props.project.id);
  }

  render() {
    const className = this.props.selected ? "selected" : null;
    return (
      <div
        className={className}
        onClick={this.handleClick}
        onDoubleClick={this.handleDoubleClick} >{this.props.project.name}</div>
    );
  }
}
