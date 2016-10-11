import React, {PropTypes} from 'react';
import classNames from 'classnames';

import {generateUUID} from '../../js/utils';
import {createFile, createFolder, cancelNewNode} from '../../js/actions/actionCreator';

import Collapser from './Collapser.jsx';
import InlineInput from './InlineInput.jsx';
import FileNode from './FileNode.jsx';
import FolderNode from './FolderNode.jsx';

export default class TreeView extends React.Component {
  static propTypes = {
    collapsed: PropTypes.bool,
    defaultCollapsed: PropTypes.bool,
    folder: PropTypes.object.isRequired,
    folderId: PropTypes.string.isRequired,
    treeNodes: PropTypes.object.isRequired,
    treeState: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      collapsed: props.collapsed || props.defaultCollapsed
    };
  }

  handleCollapserClick = () => {
    this.setState({collapsed: !this.state.collapsed});
  }

  handleNewChildCancel = () => {
    cancelNewNode(this.props.folderId);
  }
  handleEntityNamed = (name) => {
    const newId = generateUUID();
    if(this.props.treeState.newNode.type === 'file') {
      createFile(newId, name, this.props.folderId);
    } else if(this.props.treeState.newNode.type === 'folder') {
      createFolder(newId, name, this.props.folderId);
    }
    cancelNewNode(this.props.folderId);
  }

  renderChildren = (children, nodes) => {
    var childNodes = [];
    children.forEach(child => {
      const id = child.data();
      let node = nodes.get(id);
      if(node.hasKey('children')) {
        childNodes.push(
          <TreeView 
            defaultCollapsed={this.props.defaultCollapsed} 
            folder={node} 
            folderId={id}
            treeNodes={this.props.treeNodes}
            key={id}
            treeState={this.props.treeState} />
        );
      } else {
        childNodes.push(
          <FileNode 
            id={id}
            key={id}
            model={node}
            selected={this.props.treeState.selectedId === id} />
        );
      }
    });
    return childNodes;
  }

  render() {
    const {
      collapsed = this.state.collapsed,
      folder,
      folderId,
      treeNodes,
      treeState
    } = this.props;

    let containerClasses = classNames('node-children', collapsed ? 'collapsed' : 'open');

    let placeholderNode;
    if(treeState.newNode.folderId === folderId) {
      placeholderNode = (
        <NewNodePlaceholder 
          name={''} 
          onCancel={this.handleNewChildCancel} 
          onComplete={this.handleEntityNamed} 
          type={treeState.newNode.type} />
      );
    }

    return (
      <div className="sub-tree">
        <div className="node">
          <Collapser onClick={this.handleCollapserClick} collapsed={collapsed} />
          <FolderNode 
            collapsed={collapsed}
            id={folderId}
            name={folder.get('name').data()} 
            selected={treeState.selectedId === folderId}
          />
        </div>
        <div className={containerClasses}>
          {placeholderNode}
          {this.renderChildren(folder.get('children'), treeNodes)}
        </div>
      </div>
    );
  }
}

function NewNodePlaceholder(props) { 
  const nodeClasses = classNames('new-node node', props.type === 'file' ? 'file' : '');
  const iconClasses = classNames('fa', props.type === 'file' ? 'fa-file-code-o' : 'fa-folder-o');

  return (
    <div className={nodeClasses}>
      <i className={iconClasses} /> 
      <InlineInput onCancel={props.onCancel} onComplete={props.onComplete} 
        value={props.name} /> 
    </div>
  );
}

NewNodePlaceholder.propTypes = {
  name: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  type: PropTypes.string,
};

