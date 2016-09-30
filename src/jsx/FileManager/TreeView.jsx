import React, {PropTypes} from 'react';

export default class TreeView extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    collapsed: PropTypes.bool,
    defaultCollapsed: PropTypes.bool,
    itemClassName: PropTypes.string,
    nodeLabel: PropTypes.node.isRequired,
    onClick: PropTypes.func
  };

  constructor(props) {
    super(props);
     
    this.state = {collapsed: this.props.defaultCollapsed};
  }

  handleClick(...args) {
    this.setState({collapsed: !this.state.collapsed});
    if (this.props.onClick) {
      this.props.onClick(...args);
    }
  }

  render() {
    const {
      collapsed = this.state.collapsed,
      className = '',
      itemClassName = '',
      nodeLabel,
      children,
      ...rest,
    } = this.props;

    let arrowClassName = 'tree-view_arrow';
    let containerClassName = 'tree-view_children';
    if (collapsed) {
      arrowClassName += ' tree-view_arrow-collapsed';
      containerClassName += ' tree-view_children-collapsed';
    }

    const arrow = (
      <div
        {...rest}
        className={className + ' ' + arrowClassName}
        onClick={this.handleClick}
      />);

    return (
      <div className="tree-view">
        <div className={'tree-view_item ' + itemClassName}>
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
