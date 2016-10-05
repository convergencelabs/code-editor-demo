import React from 'react';
import {render} from 'react-dom';

export default class Banner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="banner">
        <img className="logo" src="../img/cl_logo.png"/>
        <span className="title">Convergence Code Editor</span>
        <div className="tray">
          <i className="user-icon fa fa-user" />
          <span className="username">{this.props.username}</span>
          <i className="logout-icon fa fa-power-off" />
        </div>
      </div>
    );
  }
}


