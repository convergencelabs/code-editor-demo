import React, {PropTypes} from 'react';

import ActionButton from './ActionButton.jsx';
import FileTree from './FileTree.jsx';

export default class FileManager extends React.Component {
  static propTypes = {
    actionCreator: PropTypes.object.isRequired,
    files: PropTypes.object.isRequired,
    tree: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  handleNewFile = () => {
    this.props.actionCreator.addNewNode('file', this.props.tree.selectedId || 'root');
  }
  handleNewFolder = () => {
    this.props.actionCreator.addNewNode('folder', this.props.tree.selectedId || 'root');
  } 

  render() {
    let {actionCreator, files, tree} = this.props;

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
        <FileTree actionCreator={actionCreator} files={files} tree={tree} />
      </div>
    );
  }
}


