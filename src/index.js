import React from 'react';
import ReactDOM from 'react-dom';
import './assets/sass/code-editor.scss';
import CodeEditor from "./components/CodeEditor";

if (typeof CodeEditorConfig !== "undefined") {
  const domainUrl = window.CodeEditorConfig.CONVERGENCE_URL;
  ReactDOM.render(
    <CodeEditor domainUrl={domainUrl} />,
    document.getElementById('code-editor')
  );
} else {
  throw new Error("Cannot find configuration for the code editor");
}

