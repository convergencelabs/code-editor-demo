import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class FAButton extends Component {
  static propTypes = {
    enabled: PropTypes.bool,
    icon: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    tooltip: PropTypes.string,
  };

  render() {
    const enabled = (this.props.enabled ? "enabled" : "disabled");
    const className = `fa ${this.props.icon} fabutton ${enabled}`;

    return (
      <i
        title={this.props.tooltip}
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
