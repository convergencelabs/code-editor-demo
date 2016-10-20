import React from 'react';
import {render} from 'react-dom';
import ConvergenceDomain from 'convergence-client';

import CodeEditor from "./CodeEditor.jsx";

if (typeof CodeEditorConfig !== 'undefined') {
  const domainUrl = CodeEditorConfig.DOMAIN_URL;
  ConvergenceDomain.debugFlags.protocol.messages = CodeEditorConfig.DEBUG;

  render(
    <CodeEditor domainUrl={domainUrl} />,
    document.getElementById('code-editor')
  );
} else {
  throw new Error("Cannot find configuration for the code editor");
}
