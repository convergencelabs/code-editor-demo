import React, {PropTypes} from 'react';

import {addNewNode} from '../../js/actions/actionCreator';
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

  render() {
    const folder = this.props.treeNodes.get(this.rootId);

    return (
      <div className="file-manager">
        <div className="section-title">Project</div>
        <div className="file-actions">
          <ActionButton bigIcon="fa-file-text-o" onClick={this.handleNewFile} />
          <ActionButton 
            bigIcon="fa-folder-o fa-flip-horizontal" 
            className="add-folder" 
            onClick={this.handleNewFolder} />
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

