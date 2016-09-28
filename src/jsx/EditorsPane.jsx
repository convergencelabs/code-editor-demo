import React from 'react';
import {render} from 'react-dom';
import Editor from './Editor.jsx'

export default class EditorsPane extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="editors-pane">
        <Editor></Editor>
      </div>
    );
  }
}


