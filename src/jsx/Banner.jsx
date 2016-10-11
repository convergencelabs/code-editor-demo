import React, {PropTypes} from 'react';

const Banner = function(props) {
  return (
    <div className="banner">
      <img className="logo" src="../img/cl_logo.png" />
      <span className="title">Convergence Code Editor</span>
      <div className="tray">
        <i className="user-icon fa fa-user" />
        <span className="username">{props.username}</span>
        <i className="logout-icon fa fa-power-off" />
      </div>
    </div>
  );
};

Banner.propTypes = {
  username: PropTypes.string
};

export default Banner;
