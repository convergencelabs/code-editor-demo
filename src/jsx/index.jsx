import React from 'react';
import {render} from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from "./containers/App.jsx";
import reducer from '../js/reducers'

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

const store = createStore(reducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('code-editor')
);