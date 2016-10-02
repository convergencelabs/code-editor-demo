import React, {PropTypes} from 'react';
import { autobind } from 'core-decorators';
import classNames from 'classnames';

import Collapser from './Collapser.jsx';
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

  render() {
    const {
      children,
      collapsed = this.state.collapsed,
      id,
      nodeLabel
    } = this.props;

    let containerClasses = classNames('node-children', collapsed ? 'collapsed' : 'open');

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
            onNewChild={this.props.onNewChild}
            onRename={this.props.onFolderRename}
          />
        </div>
        <div className={containerClasses}>
          {children}
        </div>
      </div>
    );
  }
}
