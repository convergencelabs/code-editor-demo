import React from 'react';
import {render} from 'react-dom';
import ConvergenceDomain from 'convergence-client';

import App from "./containers/App.jsx";
import data from '../js/data';

require("!style!css!sass!../sass/application.scss");
require("!style!css!sass!../sass/banner.scss");
require("!style!css!sass!../sass/code-editor.scss");
require("!style!css!sass!../sass/editor.scss");
require("!style!css!sass!../sass/editor-pane.scss");
require("!style!css!sass!../sass/file-manager.scss");
require("!style!css!sass!../sass/group-chat.scss");
require("!style!css!sass!../sass/participants-list.scss");
require("!style!css!sass!../sass/status-bar.scss");
require("!style!css!sass!../sass/editor-tabs.scss");
require("!style!css!sass!../../node_modules/rc-slider/assets/index.css");

const domainUrl = 'https://localhost/realtime/domain/test/Examples';

const hardCodedProjectId = 'main';

let modelsMetadata = {};
let domain = null;
let chatRoom = null;
let modelService = null;

ConvergenceDomain.debugFlags.protocol.messages = true;

ConvergenceDomain.connect(domainUrl, 'test1', 'password').then(d => {
  domain = d;
  chatRoom = domain.chat().room(hardCodedProjectId);
  chatRoom.join();
  modelService = domain.models();
  modelService.open('code-editor', hardCodedProjectId, () => {
    return data;
  }).then(model => {

    modelsMetadata = {
      modelService,
      username: 'test1',
      collectionId: 'code-editor'
    };

    render(
      <App
        rtModel={model}
        modelsMetadata={modelsMetadata}
        chatRoom={chatRoom}
        username={domain.session().username()} />,
      document.getElementById('code-editor')
    );
  });
});
