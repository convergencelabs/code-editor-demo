import React from 'react';
import PropTypes from 'prop-types';
import EditorParticipants from './EditorParticipants.jsx';

export default class StatusBar extends React.Component {

  static propTypes = {
    cursor: PropTypes.object.isRequired,
    fileType: PropTypes.string.isRequired,
    multiUser: PropTypes.bool,
    participants: PropTypes.array
  };

  static defaultProps = {
    historical: true
  };

  render() {
    const line = this.props.cursor.row;
    const col = this.props.cursor.column;

    let participantsList = null;
    if (this.props.multiUser) {
      participantsList = (
        <EditorParticipants
          participants={this.props.participants}
        />);
    }

    return (
      <div className="status-bar">
        <div className="status-bar-content">
          <span className="status-bar-file-type">{this.props.fileType}</span>
          <span className="status-bar-cursor-indicator">Line: {line}, Column: {col}</span>
          {participantsList}
        </div>
      </div>
    );
  }
}


