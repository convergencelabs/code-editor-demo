import React from 'react';
import {render} from 'react-dom';
import ConvergenceDomain from 'convergence-client';

import CodeEditor from "./CodeEditor.jsx";

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
require("!style!css!sass!../sass/login.scss");
require("!style!css!sass!../sass/projects.scss");
require("!style!css!sass!../../node_modules/rc-slider/assets/index.css");
require("!style!css!sass!../../node_modules/ace-collab-ext/ace-collab.css");


const domainUrl = 'https://localhost/realtime/domain/test/Examples';
ConvergenceDomain.debugFlags.protocol.messages = true;

render(
  <CodeEditor domainUrl={domainUrl} />,
  document.getElementById('code-editor')
);

