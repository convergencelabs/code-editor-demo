import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SplitPanel from 'react-split-pane';

import * as actions from '../../js/actions'
import ActionCreator from '../../js/actions/ActionCreator';

import FileManager from '../file-manager/FileManager.jsx';
import EditorTabs from '../editor/EditorTabs.jsx';
import ParticipantsList from '../ParticipantsList.jsx';
import GroupChatPane from '../GroupChatPane.jsx';
import Banner from '../Banner.jsx';

function App({actions, editors, files, rtModel, tree}) {
  const actionCreator = new ActionCreator(rtModel, actions);

  return (
    <div className="code-editor">
      <Banner className="status-bar" username="Test User" />
      <div className="top-pane">
        <SplitPanel direction="horizontal" defaultSize={200}>
          <FileManager tree={tree} files={files} actionCreator={actionCreator} />
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
  rtModel: PropTypes.object.isRequired,
  tree: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  files: state.files,
  editors: state.editors,
  tree: state.tree
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)