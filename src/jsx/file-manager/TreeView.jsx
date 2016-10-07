import React, {PropTypes} from 'react';
import { autobind } from 'core-decorators';
import classNames from 'classnames';

import Collapser from './Collapser.jsx';
import InlineInput from './InlineInput.jsx';
import FileNode from './FileNode.jsx';
import FolderNode from './FolderNode.jsx';

export default class TreeView extends React.Component {
  static propTypes = {
    actionCreator: PropTypes.object.isRequired,
    collapsed: PropTypes.bool,
    defaultCollapsed: PropTypes.bool,
    folder: PropTypes.object.isRequired,
    selectedId: PropTypes.string,
    tree: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      collapsed: props.collapsed || props.defaultCollapsed
    };
  }

  @autobind
  handleCollapserClick() {
    this.setState({collapsed: !this.state.collapsed});
  }

  @autobind
  newFile() {
    this.setState({newEntity: true, type: 'file', newEntityName: ''});
  }
  @autobind
  newFolder() {
    this.setState({newEntity: true, type: 'folder', newEntityName: ''});
  }

  @autobind
  handleNewChild(key, type) {
    if(type === 'file') {
      this.newFile();
    } else if(type === 'folder') {
      this.newFolder();
    }
  }
  @autobind
  handleNewChildCancel() {
    this.props.actionCreator.cancelNewNode(this.props.folder.id);
  }
  @autobind
  handleEntityNamed(name) {
    console.log(this.state.type, 'created', 'name=' + name);
    this.setState({
      newEntity: false,
      newEntityName: ''
    });
  }

  renderChildren = (childIds, tree, files, actionCreator) => {
    return childIds.map(id => {
      let folder = tree.folders[id];
      if(folder) {
        return (
          <TreeView 
            actionCreator={actionCreator}
            defaultCollapsed={this.props.defaultCollapsed} 
            files={files}
            folder={folder} 
            tree={tree}
            key={id}
            selectedId={tree.selectedId} />
        ) 
      } else {
        const file = files[id];
        return (
          <FileNode 
            actionCreator={actionCreator}
            id={file.id}
            key={id}
            name={file.name} 
            selected={tree.selectedId === file.id} />
        );
      }
    });
  }

  render() {
    const {
      actionCreator,
      collapsed = this.state.collapsed,
      files,
      folder,
      tree,
      selectedId
    } = this.props;

    let containerClasses = classNames('node-children', collapsed ? 'collapsed' : 'open');

    let placeholderNode;
    if(folder.hasOwnProperty('newNode')) {
      placeholderNode = (
        <NewNodePlaceholder 
          name={''} 
          onCancel={this.handleNewChildCancel} 
          onComplete={this.handleEntityNamed} 
          type={folder.newNode} />
      );
    }

    return (
      <div className="sub-tree">
        <div className="node">
          <Collapser onClick={this.handleCollapserClick} collapsed={collapsed} />
          <FolderNode 
            actionCreator={actionCreator}
            collapsed={collapsed}
            id={folder.id}
            name={folder.name} 
            selected={selectedId === folder.id}
          />
        </div>
        <div className={containerClasses}>
          {placeholderNode}
          {this.renderChildren(folder.childIds, tree, files, actionCreator)}
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

