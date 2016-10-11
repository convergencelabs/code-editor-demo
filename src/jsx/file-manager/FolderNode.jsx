import React, {PropTypes} from 'react';
import classNames from 'classnames';

import * as actions from '../../js/actions';
import {FolderContextMenu} from './ContextMenu.jsx';
import RenamableNode from './RenamableNode.jsx';

export default class FolderNode extends React.Component {
  static propTypes = {
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
    actions.selectNode(this.props.id);
  }
  handleRename = (newName) => {
    actions.renameFolder(this.props.id, newName);
    this.setState({renaming: false});
  }
  handleRenameCancel = () => {
    this.setState({renaming: false});
  }
  handleContextMenu = (e) => {
    this.setState({showContextMenu: true});
    e.preventDefault();
  }
  handleHideContextMenu = () => {
    this.setState({showContextMenu: false});
  }

  handleRenameSelect = () => {
    this.setState({renaming: true});
  }
  handleDelete = () => {
    actions.deleteFolder(this.props.id);
  }
  handleNewFile = () => {
    actions.addNewNode('file', this.props.id);
  }
  handleNewFolder = () => {
    actions.addNewNode('folder', this.props.id);
  }


  render() {
    const nodeClasses = classNames("folder-label", this.props.selected ? 'selected' : '');
    const iconClasses = classNames('fa', this.props.collapsed ? 'fa-folder-o' : 'fa-folder-open-o');

    let contextMenu;
    if(this.state.showContextMenu) {
      contextMenu = (
        <FolderContextMenu 
          onHide={this.handleHideContextMenu}
          onSelectDelete={this.handleDelete} 
          onSelectNewFile={this.handleNewFile} 
          onSelectNewFolder={this.handleNewFolder} 
          onSelectRename={this.handleRenameSelect} 
        />
      );
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
