import React from 'react';

export default function CenteredPanel(props) {
  return (<div className="centered-panel">{props.children}</div>);
}

CenteredPanel.propTypes = {
  children: React.PropTypes.element
};