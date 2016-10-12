import React, {PropTypes} from 'react';

import {addNewNode, deleteFile, deleteFolder} from '../../js/actions/actionCreator';
import {isNodeFolder} from '../../js/utils';

import ActionButton from './ActionButton.jsx';
import TreeView from './TreeView.jsx';

export default class FileManager extends React.Component {
  static propTypes = {
    treeNodes: PropTypes.object.isRequired,
    treeState: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.rootId = 'root';
  }

  handleNewFile = () => {
    addNewNode('file', this.props.treeState.selectedId);
  }
  handleNewFolder = () => {
    addNewNode('folder', this.props.treeState.selectedId);
  }
  handleDeleteNode = () => {
    const id = this.props.treeState.selectedId;
    if(isNodeFolder(this.props.treeNodes, id)) {
      deleteFolder(id);
    } else {
      deleteFile(id);
    }
  }
  render() {
    const folder = this.props.treeNodes.get(this.rootId);
    const deleteBtnStyle = {display: this.props.treeState.selectedId !== 
    'root' ? 'inline' : 'none'};

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
            onClick={this.handleDeleteNode} 
            style={deleteBtnStyle}
            title="Delete selected"
            type="button" 
          >
            <i className="fa fa-lg fa-times" />
          </button>
        </div>
        <div className="file-tree">
          <TreeView 
            defaultCollapsed={false} 
            folder={folder} 
            folderId={this.rootId}
            {...this.props} />
        </div>
      </div>
    );
  }
}

