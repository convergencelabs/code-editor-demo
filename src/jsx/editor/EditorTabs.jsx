import React from 'react';
import EditorPane from './EditorPane.jsx'

export default class EditorTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [
        {filename: 'Editor.jsx', id: "some path 1"},
        {filename: 'GroupChatPane.jsx', id: "some path 2"},
        {filename: 'ParticipantsList.jsx', id: "some path 3"}
      ]
    };
    if (this.state.files.length > 0) {
      this.state.selectedFile = this.state.files[0].id;
    }
  }

  _handleTabClick(fileId) {
    this.setState({selectedFile: fileId});
  }

  render() {
    const tabButtons = this.state.files.map((file) => {
      return (<EditorTabButton
        key={file.id}
        id={file.id}
        title={file.filename}
        active={file.id === this.state.selectedFile}
        onClick={this._handleTabClick.bind(this)}
      />);
    });

    const editors = this.state.files.map((file) => {
      const className = "editor-container " + (file.id === this.state.selectedFile ? 'active' : 'inactive');
      return (
        <div
          key={file.id}
          className={className}>
          <EditorPane/>
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
        <span>{this.props.title}</span>
        <i className="close fa fa-times"/>
      </div>
    );
  }
}


