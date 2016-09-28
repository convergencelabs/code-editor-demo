import React from 'react';
import {render} from 'react-dom';
import classNames from 'classnames';

export default class ActionButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let bigIconClasses = classNames('fa', this.props.bigIcon.split(' '));

    return (
      <button type="button" onClick={this.props.onClick}>
        <span className="fa-stack fa-lg icon">
          <i className={bigIconClasses}></i> 
          <i className="fa fa-plus-circle"></i>
        </span>
      </button>
    );
  }
}


