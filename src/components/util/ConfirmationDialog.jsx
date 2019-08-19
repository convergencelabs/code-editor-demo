import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'rc-dialog';

export default class ConfirmationDialog extends React.Component {

  static propTypes = {
    message: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
  };

  handleCancel = () => {
    this.props.onCancel();
  }

  handleOk = () => {
    this.props.onOk();
  }

  render() {
    let footer = (
      <div>
        <button className="app-button" onClick={this.handleCancel}>Cancel</button>
        <button className="app-button" onClick={this.handleOk}>Ok</button>
      </div>);

    return (
      <Dialog
        className="confirm-dialog"
        title={this.props.title}
        footer={footer}
        visible
        wrapClassName=''
        animation=""
        maskAnimation="fade"
        onClose={this.props.onCancel}
      >
        <div className="confirm-message">{this.props.message}</div>
      </Dialog>
    );
  }
}
