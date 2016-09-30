import React from 'react';
import {render} from 'react-dom';
import ActionButton from './ActionButton.jsx';
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
  }

  newFile() {}
  newFolder() {} 

  renderNode(node, index) {
    const name = node.name;
    if(!node.children) {
      return (
        <div key={index} className="node-label file">
          <i className="fa fa-file-code-o" /> {node.name}
        </div>
      );
    }

    return (
      <TreeView key={index} nodeLabel={name} defaultCollapsed={false}>
        {node.children.map((child, childIndex) => {
          return this.renderNode(child, '' + index + childIndex);
        })}
      </TreeView>
    );
  }

  render() {
    return (
      <div className="file-manager">
        <div className="file-actions">
          <ActionButton bigIcon="fa-file-text-o" onClick={ this.handleNewFile } />
          <ActionButton bigIcon="fa-folder-o fa-flip-horizontal" className="add-folder" onClick={ this.handleNewFolder }  />
        </div>
        {files.map((node, i) => {
          return this.renderNode(node, i);
        })}
      </div>
    );
  }
}


