import React from 'react';
import {render} from 'react-dom';
import ActionButton from './ActionButton.jsx';

const files = [{
  name: 'js',
  collapsed: false,
  children: [
    { name: 'index.js' }, 
    { name: 'app.js' }, 
    {
      name: 'controllers', 
      collapsed: false, 
      children: [
        { name: 'header.js' }, 
        { name: 'footer.js' }
      ]
    }
  ]
}];

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
          <ActionButton bigIcon="fa-file-text-o" onClick={ this.handleNewFile } />
          <ActionButton bigIcon="fa-folder-o fa-flip-horizontal" className="add-folder" onClick={ this.handleNewFolder }  />
        </div>
      </div>
    );
  }
}


