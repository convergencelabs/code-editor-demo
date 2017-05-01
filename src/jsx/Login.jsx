import React, {PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {Convergence} from '@convergence/convergence';
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
      password: "",
      anonymous: CodeEditorConfig.ANONYMOUS_LOGIN
    };
  }

  @autobind
  handleLogin() {
    this.setState({inProgress: true});

    let promise = null;

    if (this.state.anonymous) {
      promise = Convergence.connectAnonymously(this.props.domainUrl, this.state.username).then(d => {
        this.props.onLogin(d);
      });
    } else {
      promise = Convergence.connect(this.props.domainUrl, this.state.username, this.state.password).then(d => {
        this.props.onLogin(d);
      });
    }

    promise.catch((e) => {
      this.setState({message: e.message, inProgress: false});
    });
  }

  @autobind
  handleUsername(e) {
    this.setState({username: e.target.value});

  }

  @autobind
  handlePassword(e) {
    this.setState({password: e.target.value});
  }

  @autobind
  handleKeyDown(e) {
    if (e.keyCode === 13 && this.validate()) {
      e.stopPropagation();
      e.preventDefault();
      this.handleLogin();
    }
  }

  @autobind
  validate() {
    return this.state.username.length > 0 &&
      (this.state.password.length > 0 || this.state.anonymous);
  }

  render() {
    return (
      <CenteredPanel>
        <div className="login-dialog">
          <div className="login-title">
            <img src="assets/img/cl_logo.png" />
            <span >Convergence Code Editor</span>
          </div>
          <div className="login-contents">
            <div>
              <label>Display Name</label>
              <input
                type="text"
                value={this.state.username}
                onInput={this.handleUsername}
                onKeyDown={this.handleKeyDown} />
            </div>
            <div style={{display: this.state.anonymous ? "none" : "block"}}>
              <label>Password</label>
              <input
                type="password"
                value={this.state.password}
                onInput={this.handlePassword}
                onKeyDown={this.handleKeyDown} />
            </div>

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
