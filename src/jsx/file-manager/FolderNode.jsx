import React, {PropTypes} from 'react';
import classNames from 'classnames';

import {addNewNode, deleteFolder, renameFolder, selectNode} from '../../js/actions/actionCreator';
import RemoteFolderActionCreator from '../../js/actions/RemoteFolderActionCreator';
import {FolderContextMenu} from './ContextMenu.jsx';
import RenamableNode from './RenamableNode.jsx';
import ConfirmationDialog from '../util/ConfirmationDialog.jsx';
import {autobind} from 'core-decorators';

export default class FolderNode extends React.Component {
  static propTypes = {
    collapsed: PropTypes.bool,
    id: PropTypes.string.isRequired,
    model: PropTypes.object.isRequired,
    onCollapse: PropTypes.func.isRequired,
    selected: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.remoteActionCreator = new RemoteFolderActionCreator(props.id, props.model);
    this.remoteActionCreator.listenFor(['changed']);

    this.state = {
      showContextMenu: false,
      showDeleteConfirm: false
    };
  }

  handleClick = () => {
    selectNode(this.props.id);
  }

  handleRename = (newName) => {
    renameFolder(this.props.id, newName);
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
    this.setState({showDeleteConfirm: true});
  }

  handleNewFile = () => {
    addNewNode('file', this.props.id);
  }

  handleNewFolder = () => {
    addNewNode('folder', this.props.id);
  }

  @autobind
  handleDeleteFolderCancel() {
    this.setState({showDeleteConfirm: false});
  }


  @autobind
  handleDeleteFolderOk() {
    deleteFolder(this.props.id);
    this.setState({showDeleteConfirm: false});
  }

  _createDeleteConfirm() {
    if (this.state.showDeleteConfirm) {
      const nodeName = this.props.model.get('name').value();
      const title = "Confirm Delete";
      const message = `Delete folder "${nodeName}"?`;
      return (<ConfirmationDialog
        onCancel={this.handleDeleteFolderCancel}
        onOk={this.handleDeleteFolderOk}
        title={title}
        message={message}
      />);
    }
  }

  render() {
    const deleteConfirm = this._createDeleteConfirm();
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
    const folderName = this.props.model.get('name').value();

    return (
      <div 
        className={nodeClasses} 
        onClick={this.handleClick} 
        onDoubleClick={this.props.onCollapse}
        onContextMenu={this.handleContextMenu}
      >
        <i className={iconClasses} />
        <RenamableNode name={folderName} renaming={this.state.renaming} 
          onCancel={this.handleRenameCancel} onComplete={this.handleRename} />
        {contextMenu}
        {deleteConfirm}
      </div>
    );
  }  
}
