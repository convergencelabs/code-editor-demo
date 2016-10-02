import React from 'react';
import { autobind } from 'core-decorators';

import ActionButton from './ActionButton.jsx';
import FileNode from './FileNode.jsx';
import TreeView from './TreeView.jsx';

const files = [{
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
}];

export default class FileTree extends React.Component {
  static propTypes = {
    data: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  @autobind
  newFile() {
    
  }
  @autobind
  newFolder() {
    
  }

  @autobind
  handleSelect(key) {
    this.setState({selected: key});
  }
  @autobind
  handleRename(key, name) {
    console.log('renamed', key, 'to', name);
  }
  @autobind
  handleDelete(key) {
    console.log('deleted', key);
  }
  @autobind
  handleNewChild(key, type) {
    if(type === 'file') {
      this.newFile();
    } else if(type === 'folder') {
      this.newFolder();
    }
  }

  renderNode(node, index) {
    const name = node.name;

    if(!node.children) {
      return (
        <FileNode 
          id={index}
          key={index}
          name={node.name} 
          onClick={this.handleSelect} 
          onDelete={this.handleDelete}
          onRename={this.handleRename}
          selected={this.state.selected === index} 
        />
      );
    } else {
      return (
        <TreeView 
          defaultCollapsed={false} 
          key={index}   
          id={index}
          nodeLabel={name} 
          onFolderDelete={this.handleDelete}
          onFolderRename={this.handleRename}
          onFolderSelect={this.handleSelect}
          onNewChild={this.handleNewChild}
          selected={this.state.selected === index} 
        >
          {node.children.map((child, childIndex) => {
            return this.renderNode(child, '' + index + childIndex);
          })}
        </TreeView>
      );
    }
  }

  render() {
    return (
      <div className="file-tree">
        {files.map((node, i) => {
          return this.renderNode(node, i);
        })}
      </div>
    );
  }
}


