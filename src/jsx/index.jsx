import React from 'react';
import {render} from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ConvergenceDomain from 'convergence-client';

import App from "./containers/App.jsx";
import reducer from '../js/reducers'
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

var domainUrl = 'https://localhost/realtime/domain/test/Examples';

ConvergenceDomain.debugFlags.protocol.messages = true;
ConvergenceDomain.connect(domainUrl, 'test1', 'password').then(domain => { 
  var modelService = domain.modelService();
  return modelService.open('code-editor', 'main', () => {
    return data;
  });
}).then(model => {
  const modelData = model.value().data();
  appendIdsToObjects(modelData.files);
  appendIdsToObjects(modelData.tree.folders);
  const store = createStore(reducer, modelData);

  render(
    <Provider store={store}>
      <App rtModel={model} />
    </Provider>,
    document.getElementById('code-editor')
  );
});


function appendIdsToObjects(objectsById) { 
  for(let id in objectsById) {
    objectsById[id].id = id;
  }
}