import React, {PropTypes} from 'react';
import classNames from 'classnames';

function ActionButton(props) {
  let bigIconClasses = classNames('fa', props.bigIcon.split(' '));

  return (
    <button type="button" onClick={props.onClick}>
      <span className="fa-stack fa-lg icon">
        <i className={bigIconClasses} /> 
        <i className="fa fa-plus-circle" />
      </span>
    </button>
  );
}

ActionButton.propTypes = {
  bigIcon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ActionButton;