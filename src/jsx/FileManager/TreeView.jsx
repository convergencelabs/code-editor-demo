import React, {PropTypes} from 'react';
import { autobind } from 'core-decorators';
import classNames from 'classnames';

export default class TreeView extends React.Component {
  static propTypes = {
    collapsed: PropTypes.bool,
    defaultCollapsed: PropTypes.bool,
    nodeLabel: PropTypes.node.isRequired,
    onClick: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      collapsed: props.defaultCollapsed
    };
  }

  @autobind
  handleClick(...args) {
    this.setState({collapsed: !this.state.collapsed});
    if (this.props.onClick) {
      this.props.onClick(...args);
    }
  }

  render() {
    const {
      collapsed = this.state.collapsed,
      nodeLabel,
      children,
      defaultCollapsed, 
      ...rest,
    } = this.props;

    let arrowClassName = classNames('arrow', collapsed ? 'collapsed' : 'open');
    let containerClassName = classNames('node-children', collapsed ? 'collapsed' : 'open');
    let folderClassName = classNames('fa', collapsed ? 'fa-folder-o' : 'fa-folder-open-o');

    const arrow = (
      <div 
        {...rest} 
        className={arrowClassName} 
        onClick={this.handleClick}
      >
        <span className="caret">▾</span><i className={folderClassName} />
      </div>);

    return (
      <div className="tree-view">
        <div className="node-label">
          {arrow}
          {nodeLabel}
        </div>
        <div className={containerClassName}>
          {children}
        </div>
      </div>
    );
  }
}
