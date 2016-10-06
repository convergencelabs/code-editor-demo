import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SplitPanel from 'react-split-pane';

import * as Actions from '../../js/actions'

import FileManager from '../file-manager/FileManager.jsx';
import EditorTabs from '../editor/EditorTabs.jsx';
import ParticipantsList from '../ParticipantsList.jsx';
import GroupChatPane from '../GroupChatPane.jsx';
import Banner from '../Banner.jsx';

function App({actions, files, folders, editors}) {
  return (
    <div className="code-editor">
      <Banner className="status-bar" username="Test User"/>
      <div className="top-pane">
        <SplitPanel direction="horizontal" defaultSize={200}>
          <FileManager folders={folders} files={files} actions={actions} />
          <SplitPanel direction="horizontal" defaultSize={200} primary="second">
            <EditorTabs editors={editors} />
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

App.propTypes = {
  actions: PropTypes.object.isRequired,
  editors: PropTypes.object.isRequired,
  files: PropTypes.object.isRequired,
  folders: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  files: state.files,
  editors: state.editors,
  folders: state.folders
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)