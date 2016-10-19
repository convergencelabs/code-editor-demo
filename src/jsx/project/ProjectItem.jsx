import React, {PropTypes} from 'react';
import {autobind} from 'core-decorators';

export default class ProjectItem extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired
  };

  @autobind
  handleClick() {
    this.props.onClick(this.props.project.id);
  }

  @autobind
  handleDoubleClick() {
    this.props.onDoubleClick(this.props.project.id);
  }

  render() {
    const className = this.props.selected ? "selected" : null;
    return (
      <div
        className={className}
        onClick={this.handleClick}
        onDoubleClick={this.handleDoubleClick} >{this.props.project.id}</div>
    );
  }
}
