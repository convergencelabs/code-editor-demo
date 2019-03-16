import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'rc-dialog';

export default class NewProjectDialog extends React.Component {

  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      projectName: ""
    };
  }

  handleNameInput = (e) => {
    this.setState({projectName: e.target.value});
  }

  handleCancel = () => {
    this.props.onCancel();
  }

  handleOk = () => {
    this.props.onOk(this.state.projectName);
  }


  render() {
    let footer = (
      <div>
        <button className="app-button" onClick={this.handleCancel}>Cancel</button>
        <button className="app-button" onClick={this.handleOk}>Ok</button>
      </div>);

    return (
      <Dialog
        className="new-project-dialog"
        title="New Project"
        footer={footer}
        visible
        wrapClassName=''
        animation=""
        maskAnimation="fade"
        onClose={this.props.onCancel}
      >
        <label>Project Name:</label>
        <input
          type="text"
          onInput={this.handleNameInput}
          value={this.state.projectName}
        />
      </Dialog>
    );
  }
}
