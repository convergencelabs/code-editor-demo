import React from 'react';
import EditorPane from './EditorPane.jsx'

export default class EditorTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [
        {filename: 'Editor.jsx', id: "some path 1", historical: false},
        {filename: 'GroupChatPane.jsx', id: "some path 2", historical: true},
        {filename: 'ParticipantsList.jsx', id: "some path 3", historical: false}
      ]
    };
    if (this.state.files.length > 0) {
      this.state.selectedFile = this.state.files[0].id;
    }
  }

  _handleTabClick(fileId) {
    this.setState({selectedFile: fileId});
  }

  _handleTabClose(fileId) {
    let removedIndex = 0;

    const newFiles = this.state.files.filter((file, index) => {
      if (file.id === fileId) {
        removedIndex = index;
        return false;
      }
      return true;
    });

    let newSelected = null;
    if (newFiles.length > 0) {
      const newIndex = Math.min(removedIndex, newFiles.length - 1);
      newSelected = newFiles[newIndex].id;
    }

    this.setState({files: newFiles, selectedFile: newSelected});
  }

  render() {
    const tabButtons = this.state.files.map((file) => {
      return (<EditorTabButton
        key={file.id}
        id={file.id}
        title={file.filename}
        active={file.id === this.state.selectedFile}
        onClick={this._handleTabClick.bind(this)}
        onClose={this._handleTabClose.bind(this)}
      />);
    });

    const editors = this.state.files.map((file) => {
      const className = "editor-container " + (file.id === this.state.selectedFile ? 'active' : 'inactive');
      return (
        <div
          key={file.id}
          className={className}>
          <EditorPane historical={file.historical}/>
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

class EditorTabButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const className = 'editor-tab-button' + (this.props.active ? ' active' : '');
    return (
      <div
        className={className}
        onClick={() => this.props.onClick(this.props.id)}
      >
        <span className="editor-tab-title">{this.props.title}</span>
        <i
          className="close fa fa-times"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            this.props.onClose(this.props.id)
          }}
        />
      </div>
    );
  }
}


