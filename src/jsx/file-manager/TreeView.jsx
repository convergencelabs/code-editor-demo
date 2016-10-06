import React, {PropTypes} from 'react';
import { autobind } from 'core-decorators';
import classNames from 'classnames';

import Collapser from './Collapser.jsx';
import InlineInput from './InlineInput.jsx';
import FileNode from './FileNode.jsx';
import FolderNode from './FolderNode.jsx';

export default class TreeView extends React.Component {
  static propTypes = {
    collapsed: PropTypes.bool,
    defaultCollapsed: PropTypes.bool,
    folder: PropTypes.object.isRequired,
    selectedId: PropTypes.string
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
    this.setState({
      newEntity: false,
      newEntityName: ''
    });
  }
  @autobind
  handleEntityNamed(name) {
    console.log(this.state.type, 'created', 'name=' + name);
    this.setState({
      newEntity: false,
      newEntityName: ''
    });
  }

  renderChildren = (childIds, folders, files, actions) => {
    return childIds.map(id => {
      let folder = folders.byId[id];
      if(folder) {
        return (
          <TreeView 
            actions={actions}
            defaultCollapsed={this.props.defaultCollapsed} 
            files={files}
            folder={folder} 
            folders={folders}
            selectedId={folders.selectedId} />
        ) 
      } else {
        const file = files.byId[id];
        return (
          <FileNode 
            id={file.id}
            name={file.name} 
            selected={folders.selectedId === file.id} />
        );
      }
    });
  }

  render() {
    const {
      actions,
      collapsed = this.state.collapsed,
      files,
      folder,
      folders,
      selectedId
    } = this.props;

    let containerClasses = classNames('node-children', collapsed ? 'collapsed' : 'open');

    let placeholderNode;
    if(folder.hasOwnProperty('newNode')) {
      placeholderNode = (
        <NewNodePlaceholder 
          name={this.state.newEntityName} 
          onCancel={this.handleNewChildCancel} 
          onComplete={this.handleEntityNamed} 
          type={this.folder.newNode} />
      );
    }

    return (
      <div className="sub-tree">
        <div className="node">
          <Collapser onClick={this.handleCollapserClick} collapsed={collapsed} />
          <FolderNode 
            collapsed={collapsed}
            id={folder.id}
            name={folder.name} 
            selected={selectedId === folder.id}
          />
        </div>
        <div className={containerClasses}>
          {placeholderNode}
          {this.renderChildren(folder.childIds, folders, files, actions)}
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

