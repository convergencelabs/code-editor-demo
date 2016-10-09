import React, {PropTypes} from 'react';
import classNames from 'classnames';
import EditorPane from './EditorPane.jsx'

export default class EditorTabs extends React.Component {
  static propTypes = {
    actionCreator: PropTypes.object.isRequired,
    editors: PropTypes.object.isRequired,
    files: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  handleTabClick = (fileId) => {
    this.props.actionCreator.selectTab(fileId);
    this.props.actionCreator.selectNode(fileId);
  }

  handleTabClose = (fileId) => {
    this.props.actionCreator.closeTab(fileId);
  }

  render() {
    const tabButtons = this.props.editors.tabOrder.map((fileId) => {
      const file = this.props.files[fileId];

      return (<EditorTabButton
        key={file.id}
        id={file.id}
        title={file.name}
        active={file.id === this.props.editors.activeFile}
        onClick={this.handleTabClick}
        onClose={this.handleTabClose}
      />);
    });

    const editors = this.props.editors.tabOrder.map((fileId) => {
      const file = this.props.files[fileId];

      const className = classNames('editor-container', (file.id === this.props.editors.activeFile ? 'active' : 'inactive'));
      return (
        <div key={file.id} className={className}>
          <EditorPane file={file} />
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

