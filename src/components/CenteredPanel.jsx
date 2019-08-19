import React from 'react';
import PropTypes from 'prop-types';

export default function CenteredPanel(props) {
  return (<div className="centered-panel">{props.children}</div>);
}

CenteredPanel.propTypes = {
  children: PropTypes.element
};