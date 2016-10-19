import React, {PropTypes} from 'react';
import classNames from 'classnames';

function ActionButton(props) {
  let bigIconClasses = classNames('fa', props.bigIcon.split(' '));

  return (
    <button type="button" onClick={props.onClick} title={props.title}>
      <span className="fa-stack fa-lg icon">
        <i className={bigIconClasses} /> 
        <i className="fa fa-plus-circle" />
      </span>
    </button>
  );
}

ActionButton.propTypes = {
  bigIcon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string
};

export default ActionButton;