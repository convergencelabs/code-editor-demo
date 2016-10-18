import React from 'react';
import {render} from 'react-dom';
import ConvergenceDomain from 'convergence-client';

import CodeEditor from "./CodeEditor.jsx";

const domainUrl = 'https://localhost/realtime/domain/test/Examples';
ConvergenceDomain.debugFlags.protocol.messages = true;

render(
  <CodeEditor domainUrl={domainUrl} />,
  document.getElementById('code-editor')
);

