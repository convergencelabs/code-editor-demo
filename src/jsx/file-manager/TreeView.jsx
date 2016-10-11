import React, {PropTypes} from 'react';
import classNames from 'classnames';

import {generateUUID} from '../../js/utils';
import * as actions from '../../js/actions';

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
    selected: PropTypes.string,
    treeNodes: PropTypes.object.isRequired,
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
    actions.cancelNewNode(this.props.folderId);
  }
  handleEntityNamed = (name) => {
    const newId = generateUUID();
    if(this.props.folder.newNode === 'file') {
      actions.createFile(newId, name, this.props.folder.id);
    } else if(this.props.folder.newNode === 'folder') {
      actions.createFolder(newId, name, this.props.folder.id);
    }
    actions.cancelNewNode(this.props.folder.id);
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
            selectedId={this.props.selected} />
        );
      } else {
        childNodes.push(
          <FileNode 
            id={id}
            key={id}
            name={node.get('name').data()} 
            selected={this.props.selected === id} />
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
      selected
    } = this.props;

    let containerClasses = classNames('node-children', collapsed ? 'collapsed' : 'open');

    let placeholderNode;
    if(folder.hasKey('newNode')) {
      placeholderNode = (
        <NewNodePlaceholder 
          name={''} 
          onCancel={this.handleNewChildCancel} 
          onComplete={this.handleEntityNamed} 
          type={folder.get('newNode').data()} />
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
            selected={selected === folderId}
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

