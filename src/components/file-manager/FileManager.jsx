import React from 'react';
import PropTypes from 'prop-types';
import {addNewNode, deleteFile, deleteFolder} from '../../actions/actionCreator';
import {isNodeFolder} from '../../utils';
import ActionButton from './ActionButton.jsx';
import TreeView from './TreeView.jsx';
import { TREE_ROOT_ID } from '../../constants/tree';
import ConfirmationDialog from '../util/ConfirmationDialog';

export default class FileManager extends React.Component {
  static propTypes = {
    treeNodes: PropTypes.object.isRequired,
    treeState: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.rootId = TREE_ROOT_ID;

    this.state = {
      showDeleteConfirm: false
    };
  }

  handleNewFile = () => {
    addNewNode('file', this.props.treeState.selectedId);
  }

  handleNewFolder = () => {
    addNewNode('folder', this.props.treeState.selectedId);
  }

  handleDelete = () => {
    this.setState({showDeleteConfirm: true});
  }

  handleDeleteFolderCancel = () => {
    this.setState({showDeleteConfirm: false});
  }

  handleDeleteFolderOk = () => {
    const id = this.props.treeState.selectedId;
    if(isNodeFolder(this.props.treeNodes, id)) {
      deleteFolder(id);
    } else {
      deleteFile(id);
    }
    this.setState({showDeleteConfirm: false});
  }

  renderConfirmDeleteNode() {
    if (this.state.showDeleteConfirm) {
      const selectedId = this.props.treeState.selectedId;
      const folder = this.props.treeNodes.get(selectedId);
      const nodeName = folder.get('name').value();
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
    const folder = this.props.treeNodes.get(this.rootId);
    const selectedId = this.props.treeState.selectedId;
    const deleteBtnStyle = {display: !selectedId || selectedId === this.rootId ? 'none' : 'inline'};

    return (
      <div className="file-manager">
        <div className="section-title">Project</div>
        <div className="file-actions">
          <ActionButton 
            bigIcon="fa-file-text-o" 
            onClick={this.handleNewFile} 
            title="New file" />
          <ActionButton 
            bigIcon="fa-folder-o fa-flip-horizontal" 
            className="add-folder" 
            onClick={this.handleNewFolder} 
            title="New folder" />
          <button 
            className="icon-button"
            onClick={this.handleDelete} 
            style={deleteBtnStyle}
            title="Delete selected"
            type="button" 
          >
            <i className="fa fa-lg fa-trash-o" />
          </button>
        </div>
        <div className="file-tree">
          <TreeView 
            defaultCollapsed={false} 
            folder={folder} 
            folderId={this.rootId}
            {...this.props} />
        </div>
        { this.renderConfirmDeleteNode() }
      </div>
    );
  }
}

