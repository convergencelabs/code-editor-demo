import React, {PropTypes} from 'react';
import Dialog from 'rc-dialog';
import {autobind} from 'core-decorators';

export default class ProjectsDialog extends React.Component {

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

  @autobind
  handleNameInput(e) {
    this.setState({projectName: e.target.value});
  }

  @autobind
  handleCancel() {
    this.props.onCancel();
  }

  @autobind
  handleOk() {
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
