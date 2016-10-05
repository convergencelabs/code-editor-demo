import React, {PropTypes} from 'react';
import { autobind } from 'core-decorators';
import classNames from 'classnames';

import {FileContextMenu} from './ContextMenu.jsx';
import RenamableNode from './RenamableNode.jsx';

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
  handleDoubleClick() {
    console.log('double clicked on', this.props.name);
  }

  @autobind
  handleRename(newName) {
    this.props.onRename(this.props.id, newName);
    this.setState({renaming: false});
  }
  @autobind
  handleRenameCancel() {
    this.setState({renaming: false});
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
  handleRenameSelect(e) {
    this.handleHideContextMenu(e);
    e.stopPropagation();
    this.setState({renaming: true});
  }

  @autobind
  handleDelete(e) {
    this.handleHideContextMenu(e);
    e.stopPropagation();
    this.props.onDelete(this.props.id);
  }

  render() {
    const nodeClasses = classNames("node", "file", this.props.selected ? 'selected' : '');

    return (
      <div 
        className={nodeClasses} 
        onClick={this.handleClick} 
        onContextMenu={this.handleContextMenu} 
        onDoubleClick={this.handleDoubleClick}
      >
        <i className="fa fa-file-code-o" /> 
        <RenamableNode name={this.props.name} renaming={this.state.renaming} 
          onCancel={this.handleRenameCancel} onComplete={this.handleRename} />
        <FileContextMenu 
          display={this.state.showContextMenu} 
          onSelectRename={this.handleRenameSelect} 
          onSelectDelete={this.handleDelete}
          onSelectHistory={() => {}}
          onSelectOpen={() => {}}
          onHide={this.handleHideContextMenu}
        />
      </div>
    );
  }  
}
