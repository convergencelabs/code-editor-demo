import React, {PropTypes} from 'react';
import classNames from 'classnames';

import {closeTab, selectTab} from '../../js/actions/editorActionCreator';
import EditorPane from './EditorPane.jsx';

export default class EditorTabs extends React.Component {
  static propTypes = {
    activeEditor: PropTypes.object,
    editors: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
  }

  handleTabClick = (editor) => {
    selectTab(editor.modelId, editor.historical);
  }

  handleTabClose = (editor) => {
    closeTab(editor);
  }

  render() {
    const tabButtons = this.props.editors.map(editor => {
      return (<EditorTabButton
        key={editor.modelId + ":" + editor.historical}
        editor={editor}
        active={editor === this.props.activeEditor}
        onClick={this.handleTabClick}
        onClose={this.handleTabClose}
      />);
    });

    const editors = this.props.editors.map(editor => {
      const className = classNames('editor-container', (editor === this.props.activeEditor ? 'active' : 'inactive'));
      return (
        <div key={editor.modelId + ":" + editor.historical} className={className}>
          <EditorPane fileModel={editor.model} historical={editor.historical} />
        </div>
      );
    });

    const placeholderStyle = {display: this.props.editors.length === 0 ? 'flex' : 'none'};

    return (
      <div className="editor-tabs-container">
        <div className="placeholder" style={placeholderStyle}>
          ← Create or open a file in the tree to get started.
        </div>
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
    props.onClick(props.editor);
  }

  const title = props.editor.title + (props.editor.historical ? ' (History)' : '');

  return (
    <div className={className} onClick={handleClick}>
      <span className="editor-tab-title">{title}</span>
      <EditorCloseButton editor={props.editor} onClick={props.onClose} />
    </div>
  );
}
EditorTabButton.propTypes = {
  editor: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

function EditorCloseButton(props) {
  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    props.onClick(props.editor);
  }

  return <i className="close fa fa-times" onClick={handleClick} />;
}
EditorCloseButton.propTypes = {
  editor: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

