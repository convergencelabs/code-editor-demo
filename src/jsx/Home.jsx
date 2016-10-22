import React, { PropTypes } from 'react';
import SplitPanel from 'react-split-pane';

import Files from './containers/Files.jsx';
import Editors from './containers/Editors.jsx';

import ParticipantsList from './participants/ParticipantsList.jsx';
import GroupChatPane from './chat/GroupChatPane.jsx';
import Banner from './Banner.jsx';

export default function Home({rtModel, chatRoom, domain, activity, onClose, onLogout}) {
  return (
    <div className="code-editor">
      <Banner
        className="status-bar"
        username={domain.session().username()}
        onClose={onClose}
        onLogout={onLogout} />
      <div className="top-pane">
        <SplitPanel direction="horizontal" defaultSize={200}>
          <Files rtModel={rtModel} />
          <SplitPanel direction="horizontal" defaultSize={200} primary="second">
            <Editors rtModel={rtModel} />
            <div className="right-pane">
              <div className="section-title">Participants</div>
              <ParticipantsList activity={activity} />
              <div className="section-title">Group Chat</div>
              <GroupChatPane chatRoom={chatRoom} domain={domain} />
            </div>
          </SplitPanel>
        </SplitPanel>
      </div>
    </div>
  );
}

Home.propTypes = {
  activity: PropTypes.object.isRequired,
  chatRoom: PropTypes.object.isRequired,
  domain: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  rtModel: PropTypes.object.isRequired
};
