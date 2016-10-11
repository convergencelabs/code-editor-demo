import React, {PropTypes} from 'react';
import classNames from 'classnames';

import * as actions from '../../js/actions';
import EditorPane from './EditorPane.jsx';

export default class EditorTabs extends React.Component {
  static propTypes = {
    activeFile: PropTypes.string,
    editors: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
  }

  handleTabClick = (fileId) => {
    actions.selectTab(fileId);
    actions.selectNode(fileId);
  }

  handleTabClose = (fileId) => {
    actions.closeTab(fileId);
  }

  render() {
    const tabButtons = this.props.editors.map(editor => {
      return (<EditorTabButton
        key={editor.modelId}
        id={editor.modelId}
        title={editor.title}
        active={editor.modelId === this.props.activeFile}
        onClick={this.handleTabClick}
        onClose={this.handleTabClose}
      />);
    });

    const editors = this.props.editors.map(editor => {
      const className = classNames('editor-container', (editor.modelId === this.props.activeFile ? 'active' : 'inactive'));
      return (
        <div key={editor.modelId} className={className}>
          <EditorPane fileModel={editor.model} />
        </div>
      );
    });

    return (
      <div className="editor-tabs-container">
        <div className="editor-tab-buttons">
          {tabButtons}
        </div>
        <div className="editor-tab-contents">
          {editors}
        </div>
      </div>
    );
  }
}

function EditorTabButton(props) {
  const className = 'editor-tab-button' + (props.active ? ' active' : '');

  function handleClick() {
    props.onClick(props.id);
  }

  return (
    <div className={className} onClick={handleClick}>
      <span className="editor-tab-title">{props.title}</span>
      <EditorCloseButton fileId={props.id} onClick={props.onClose} />
    </div>
  );
}
EditorTabButton.propTypes = {
  active: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

function EditorCloseButton(props) {
  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    props.onClick(props.fileId);
  }

  return <i className="close fa fa-times" onClick={handleClick} />;
}
EditorCloseButton.propTypes = {
  fileId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

