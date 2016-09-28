import React from 'react';
import {render} from 'react-dom';
import FileManager from './FileManager/FileManager.jsx';
import EditorsPane from './EditorsPane.jsx';
import ParticipantsList from './ParticipantsList.jsx';
import GroupChatPane from './GroupChatPane.jsx';
import StatusBar from './StatusBar.jsx';
import Banner from './Banner.jsx';

export default class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="code-editor">
        <Banner className="status-bar"></Banner>
        <div className="top-pane">
          <FileManager></FileManager>
          <EditorsPane></EditorsPane>
          <div className="right-pane">
            <ParticipantsList></ParticipantsList>
            <GroupChatPane></GroupChatPane>
          </div>
        </div>
        <StatusBar className="status-bar"></StatusBar>
      </div>
    );
  }
}


