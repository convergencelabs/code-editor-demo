import React, {PropTypes} from 'react';
import { autobind } from 'core-decorators';
import classNames from 'classnames';

import Collapser from './Collapser.jsx';
import FileNode from './FileNode.jsx';

export default class TreeView extends React.Component {
  static propTypes = {
    collapsed: PropTypes.bool,
    defaultCollapsed: PropTypes.bool,
    id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
    nodeLabel: PropTypes.node.isRequired,
    onSelect: PropTypes.func,
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

  render() {
    const {
      children,
      collapsed = this.state.collapsed,
      id,
      nodeLabel,
    } = this.props;

    let containerClasses = classNames('node-children', collapsed ? 'collapsed' : 'open');
    let folderClasses = classNames('fa', collapsed ? 'fa-folder-o' : 'fa-folder-open-o');

    return (
      <div className="sub-tree">
        <div className="node">
          <Collapser onClick={this.handleCollapserClick} collapsed={collapsed} />
          <FileNode 
            iconClass={folderClasses}
            id={id}
            nodeClasses="folder-label"
            name={nodeLabel} 
            selected={this.props.selected} 
            onClick={this.props.onSelect} 
          />
        </div>
        <div className={containerClasses}>
          {children}
        </div>
      </div>
    );
  }
}
