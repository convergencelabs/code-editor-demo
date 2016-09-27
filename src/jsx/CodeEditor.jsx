import React from 'react';
import {render} from 'react-dom';
import FileManager from './FileManager.jsx';
import EditorsPane from './EditorsPane.jsx';
import ParticipantsList from './ParticipantsList.jsx';
import GroupChatPane from './GroupChatPane.jsx';

export default class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="code-editor">
        <FileManager></FileManager>
        <EditorsPane></EditorsPane>
        <div className="right-pane">
          <ParticipantsList></ParticipantsList>
          <GroupChatPane></GroupChatPane>
        </div>
      </div>
    );
  }
}


