import React, {PropTypes} from 'react';
import { autobind } from 'core-decorators';
import classNames from 'classnames';

import {FileContextMenu} from './ContextMenu.jsx';

export default class FileNode extends React.Component {
  static propTypes = {
    id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    onRename: PropTypes.func,
    selected: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      showContextMenu: false
    };
  }

  @autobind
  handleClick() {
    this.props.onClick(this.props.id);
  }

  @autobind
  handleContextMenu(e) {
    this.setState({showContextMenu: true});
    e.preventDefault();
  }

  @autobind
  handleHideContextMenu() {
    this.setState({showContextMenu: false});
  }

  @autobind
  handleRename(e) {
    this.handleHideContextMenu(e);
    e.stopPropagation();
  }

  @autobind
  handleDelete(e) {
    this.handleHideContextMenu(e);
    e.stopPropagation();
  }

  render() {
    const nodeClasses = classNames("node", "file", this.props.selected ? 'selected' : '');

    return (
      <div className={nodeClasses} onClick={this.handleClick} onContextMenu={this.handleContextMenu}>
        <i className="fa fa-file-code-o" /> {this.props.name}
        <FileContextMenu 
          display={this.state.showContextMenu} 
          onSelectRename={this.handleRename} 
          onSelectDelete={this.handleDelete} 
          onHide={this.handleHideContextMenu}
        />
      </div>
    );
  }  
}
