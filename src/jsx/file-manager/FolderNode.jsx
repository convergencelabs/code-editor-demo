import React, {PropTypes} from 'react';
import { autobind } from 'core-decorators';
import classNames from 'classnames';

import {FolderContextMenu} from './ContextMenu.jsx';
import RenamableNode from './RenamableNode.jsx';

export default class FolderNode extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    collapsed: PropTypes.bool,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    selected: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      showContextMenu: false
    };
  }

  handleClick = () => {
    this.props.actions.selectNode(this.props.id);
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
  @autobind
  handleNewFile(e) {
    this.handleHideContextMenu(e);
    e.stopPropagation();
    this.props.onNewChild(this.props.id, 'file');
  }
  @autobind
  handleNewFolder(e) {
    this.handleHideContextMenu(e);
    e.stopPropagation();
    this.props.onNewChild(this.props.id, 'folder');
  }


  render() {
    const nodeClasses = classNames("folder-label", this.props.selected ? 'selected' : '');
    const iconClasses = classNames('fa', this.props.collapsed ? 'fa-folder-o' : 'fa-folder-open-o');

    let contextMenu;
    if(this.state.showContextMenu) {
      <FolderContextMenu 
        onHide={this.handleHideContextMenu}
        onSelectDelete={this.handleDelete} 
        onSelectNewFile={this.handleNewFile} 
        onSelectNewFolder={this.handleNewFolder} 
        onSelectRename={this.handleRenameSelect} 
      />
    }

    return (
      <div className={nodeClasses} onClick={this.handleClick} onContextMenu={this.handleContextMenu}>
        <i className={iconClasses} />
        <RenamableNode name={this.props.name} renaming={this.state.renaming} 
          onCancel={this.handleRenameCancel} onComplete={this.handleRename} />
        {contextMenu}
      </div>
    );
  }  
}
