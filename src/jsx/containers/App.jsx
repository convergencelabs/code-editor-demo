import React, { PropTypes } from 'react';
import SplitPanel from 'react-split-pane';

import Files from './Files.jsx';
import Editors from './Editors.jsx';

import ParticipantsList from '../ParticipantsList.jsx';
import GroupChatPane from '../GroupChatPane.jsx';
import Banner from '../Banner.jsx';

export default function App({modelsMetadata, rtModel}) {
  return (
    <div className="code-editor">
      <Banner className="status-bar" username="Test User" />
      <div className="top-pane">
        <SplitPanel direction="horizontal" defaultSize={200}>
          <Files rtModel={rtModel} />
          <SplitPanel direction="horizontal" defaultSize={200} primary="second">
            <Editors rtModel={rtModel} modelsMetadata={modelsMetadata} />
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
  modelsMetadata: PropTypes.object.isRequired,
  rtModel: PropTypes.object.isRequired,
};
