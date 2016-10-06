import React, {PropTypes} from 'react';

import ActionButton from './ActionButton.jsx';
import FileTree from './FileTree.jsx';

export default class FileManager extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    files: PropTypes.object.isRequired,
    folders: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  handleNewFile = () => {
    this.props.actions.addNewNode('file', this.props.folders.selectedId || 'root');
  }
  handleNewFolder = () => {
    this.props.actions.addNewNode('folder', this.props.folders.selectedId || 'root');
  } 

  render() {
    let {actions, files, folders} = this.props;

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
        <FileTree actions={actions} files={files} folders={folders} />
      </div>
    );
  }
}


