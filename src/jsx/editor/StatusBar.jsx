import React, {PropTypes} from 'react';
import EditorParticipants from './EditorParticipants.jsx';

export default class StatusBar extends React.Component {

  static propTypes = {
    multiUser: PropTypes.bool,
    participants: PropTypes.array
  };

  static defaultProps = {
    historical: true
  };

  render() {
    var line = this.props.cursor.row;
    var col = this.props.cursor.column;
    return (
      <div className="status-bar">
        <div className="status-bar-content">
          <span className="status-bar-file-type">{this.props.fileType}</span>
          <span className="status-bar-cursor-indicator">Line: {line}, Column: {col}</span>
          {(() => {
            if (this.props.multiUser) {
              return <EditorParticipants participants={this.props.participants}/>;
            }
          })()}
        </div>
      </div>
    );
  }
}


