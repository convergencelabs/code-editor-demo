import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Collapser(props) {
  let classes = classNames('arrow', props.collapsed ? 'collapsed' : 'open');

  return (
    <div className={classes} onClick={props.onClick}>
      <span className="caret">▾</span>
    </div>
  );
}

Collapser.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Collapser;