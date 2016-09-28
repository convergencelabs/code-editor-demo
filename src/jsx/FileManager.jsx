import React from 'react';
import {render} from 'react-dom';

export default class FileManager extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="file-manager">
        <div className="file-actions">
          <button type="button">
            <span className="fa-stack fa-lg icon">
              <i className="fa fa-file-text-o"></i> 
              <i className="fa fa-plus-circle"></i>
            </span>
          </button>
          <button type="button">
            <span className="fa-stack fa-lg icon add-folder">
              <i className="fa fa-folder-o fa-flip-horizontal"></i> 
              <i className="fa fa-plus-circle"></i> 
            </span>
          </button>
        </div>
      </div>
    );
  }
}


