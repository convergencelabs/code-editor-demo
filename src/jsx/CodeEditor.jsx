import React from 'react';

import FileManager from './file-manager/FileManager.jsx';
import EditorTabs from './editor/EditorTabs.jsx';
import ParticipantsList from './ParticipantsList.jsx';
import GroupChatPane from './GroupChatPane.jsx';
import SplitPanel from 'react-split-pane';

import Banner from './Banner.jsx';

export default class CodeEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleFileSelect(fileId) {
    this.setState({selectedFile: fileId});
  }

  render() {
    return (
      <div className="code-editor">
        <Banner className="status-bar"/>
        <div className="top-pane">
          <SplitPanel direction="horizontal" defaultSize={200}>
            <FileManager onFileSelect={this.handleFileSelect} selectedFile={this.state.selectedFile }/>
            <SplitPanel direction="horizontal" defaultSize={200} primary="second">
              <EditorTabs />
              <div className="right-pane">
                <div className="section-title">Participants</div>
                <ParticipantsList />
                <div className="section-title">Group Chat</div>
                <GroupChatPane />
              </div>
            </SplitPanel>
          </SplitPanel>
        </div>
      </div>
    );
  }
}


