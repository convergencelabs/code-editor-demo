import {render} from 'react-dom';
import CodeEditor from "./CodeEditor.jsx";
import React from 'react';

require("!style!css!sass!../sass/application.scss");
require("!style!css!sass!../sass/code-editor.scss");
require("!style!css!sass!../sass/editor.scss");
require("!style!css!sass!../sass/editors-pane.scss");
require("!style!css!sass!../sass/file-manager.scss");
require("!style!css!sass!../sass/group-chat.scss");
require("!style!css!sass!../sass/participants-list.scss");
require("!style!css!sass!../sass/status-bar.scss");

render(
  <CodeEditor></CodeEditor>,
  document.getElementById('code-editor')
);