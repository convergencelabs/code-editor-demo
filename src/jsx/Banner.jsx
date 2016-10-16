import React, {PropTypes} from 'react';

const Banner = function(props) {
  return (
    <div className="banner">
      <img className="logo" src="../assets/img/cl_logo.png" />
      <span className="title">Convergence Code Editor</span>
      <div className="tray">
        <i className="user-icon fa fa-user" />
        <span className="username">{props.username}</span>
        <i className="logout-icon fa fa-power-off" onClick={props.onLogout} />
      </div>
    </div>
  );
};

Banner.propTypes = {
  onLogout: PropTypes.func.isRequired,
  username: PropTypes.string
};

export default Banner;
