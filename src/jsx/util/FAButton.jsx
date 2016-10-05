import React from 'react';

export default class FAButton extends React.Component {
  static propTypes = {
    enabled: React.PropTypes.bool,
    onClick: React.PropTypes.func.isRequired,
    tooltip: React.PropTypes.string,
    icon: React.PropTypes.string
  };

  render() {
    const enabled = (this.props.enabled ? "enabled" : "disabled");
    const className = `fa ${this.props.icon} fabutton ${enabled}`;

    return (
      <i
        title={this.props.title}
        className={className}
        onClick={() => {
          if (this.props.enabled) {
            this.props.onClick();
          }
        }}
      />
    );
  }
}
