import React from 'react';
import {render} from 'react-dom';
import ActionButton from './ActionButton.jsx';

export default class FileManager extends React.Component {
  constructor(props) {
    super(props);
  }

  newFile() {}
  newFolder() {}

  render() {
    return (
      <div className="file-manager">
        <div className="file-actions">
          <ActionButton onClick={this.newFile} bigIcon="fa-file-text-o" />
          <ActionButton className="add-folder" onClick={this.newFolder} bigIcon="fa-folder-o fa-flip-horizontal" />
        </div>
      </div>
    );
  }
}


