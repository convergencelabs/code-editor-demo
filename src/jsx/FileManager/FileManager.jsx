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

export default class FileManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleNewFile() {}
  handleNewFolder() {} 

  @autobind
  handleSelect(key) {
    this.setState({selected: key});
  }

  renderNode(node, index) {
    const name = node.name;
    if(!node.children) {
      return (
        <FileNode 
          iconClass="fa-file-code-o"
          id={index}
          key={index}
          nodeClasses="node file"
          name={node.name} 
          onClick={this.handleSelect} 
          selected={this.state.selected === index} 
        />
      );
    }

    return (
      <TreeView 
        defaultCollapsed={false} 
        key={index}   
        id={index}
        nodeLabel={name} 
        onSelect={this.handleSelect}
        selected={this.state.selected === index} 
      >
        {node.children.map((child, childIndex) => {
          return this.renderNode(child, '' + index + childIndex);
        })}
      </TreeView>
    );
  }

  render() {
    return (
      <div className="file-manager">
        <div className="section-title">Project</div>
        <div className="file-actions">
          <ActionButton bigIcon="fa-file-text-o" onClick={ this.handleNewFile } />
          <ActionButton 
            bigIcon="fa-folder-o fa-flip-horizontal" 
            className="add-folder" 
            onClick={ this.handleNewFolder } 
          />
        </div>
        <div className="file-tree">
          {files.map((node, i) => {
            return this.renderNode(node, i);
          })}
        </div>
      </div>
    );
  }
}


