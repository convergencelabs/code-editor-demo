import React, {PropTypes} from 'react';
import { autobind } from 'core-decorators';

import ActionButton from './ActionButton.jsx';
import FileTree from './FileTree.jsx';

const files = {
  name: 'js',
  collapsed: false,
  children: [
    { name: 'index.js' }, 
    { name: 'app.js' }, 
    { name: 'controllers', 
      collapsed: false, 
      children: [
        { name: 'header.js' }, 
        { name: 'footer.js' }
      ]
    }
  ]
};

export default class FileManager extends React.Component {
  static propTypes = {
    onFileSelect: PropTypes.func,
    selectedFile: PropTypes.string
  }

  constructor(props) {
    super(props);
  }

  @autobind
  handleNewFile() {
    this._tree.newFile();
  }
  @autobind
  handleNewFolder() {
    this._tree.newFolder();
  } 

  render() {
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
        <FileTree 
          ref={(c) => this._tree = c}
          data={files} 
          onFileSelect={this.props.onFileSelect} 
          selectedFile={this.props.selectedFile} />
      </div>
    );
  }
}


