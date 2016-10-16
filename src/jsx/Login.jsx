import React, {PropTypes} from 'react';
import {autobind} from 'core-decorators';
import ConvergenceDomain from 'convergence-client';
import CenteredPanel from './CenteredPanel.jsx';

export default class Login extends React.Component {

  static propTypes = {
    domainUrl: PropTypes.string.isRequired,
    onLogin: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      inProgress: false,
      username: "",
      password: ""
    };
  }

  @autobind
  handleLogin() {
    this.setState({inProgress: true});
    ConvergenceDomain.connect(this.props.domainUrl, this.state.username, this.state.password).then(d => {
      this.props.onLogin(d);
    }).catch((e) => {
      this.setState({message: e.message, inProgress: false});
    });
  }

  @autobind
  handleUsername(e) {
    this.setState({username: e.target.value});
    this.validate();
  }

  @autobind
  handlePassword(e) {
    this.setState({password: e.target.value});
    this.validate();
  }

  @autobind
  validate() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  render() {
    return (
      <CenteredPanel>
        <div className="login-dialog">
          <div className="login-title">
            <img src="../assets/img/cl_logo.png" />
            <span >Code Editor Login</span>
          </div>
          <div className="login-contents">
            <label>Username</label>
            <input type="text" value={this.state.username} onInput={this.handleUsername}/>
            <label>Password</label>
            <input type="password" value={this.state.password} onInput={this.handlePassword}/>
          </div>
          <div className="login-buttons">
            <button className="app-button" disabled={!this.validate()} onClick={this.handleLogin}>Login</button>
          </div>
          <div className="login-message">{this.state.message}</div>
        </div>
      </CenteredPanel>
    );
  }
}
