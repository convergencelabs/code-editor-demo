import React, {PropTypes} from 'react';
import { autobind } from 'core-decorators';
import classNames from 'classnames';

import Collapser from './Collapser.jsx';
import InlineInput from './InlineInput.jsx';
import FolderNode from './FolderNode.jsx';

export default class TreeView extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    collapsed: PropTypes.bool,
    defaultCollapsed: PropTypes.bool,
    id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
    nodeLabel: PropTypes.node.isRequired,
    onFolderDelete: PropTypes.func,
    onFolderRename: PropTypes.func,
    onFolderSelect: PropTypes.func,
    onNewChild: PropTypes.func,
    selected: PropTypes.bool
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

  render() {
    const {
      children,
      collapsed = this.state.collapsed,
      id,
      nodeLabel
    } = this.props;

    let containerClasses = classNames('node-children', collapsed ? 'collapsed' : 'open');

    let placeholderNode;
    if(this.state.newEntity) {
      placeholderNode = (
        <NewNodePlaceholder 
          name={this.state.newEntityName} 
          onCancel={this.handleNewChildCancel} 
          onComplete={this.handleEntityNamed} 
          type={this.state.type} />
      );
    }

    return (
      <div className="sub-tree">
        <div className="node">
          <Collapser onClick={this.handleCollapserClick} collapsed={collapsed} />
          <FolderNode 
            collapsed={collapsed}
            id={id}
            name={nodeLabel} 
            selected={this.props.selected} 
            onClick={this.props.onFolderSelect} 
            onDelete={this.props.onFolderDelete}
            onNewChild={this.handleNewChild}
            onRename={this.props.onFolderRename}
          />
        </div>
        <div className={containerClasses}>
          {placeholderNode}
          {children}
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

