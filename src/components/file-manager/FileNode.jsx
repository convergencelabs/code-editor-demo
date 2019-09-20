import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {openFile, deleteFile, renameFile, selectNode, openHistory} from '../../actions/actionCreator';
import RemoteFileActionCreator from '../../actions/RemoteFileActionCreator';
import {FileContextMenu} from './ContextMenu.jsx';
import RenamableNode from './RenamableNode.jsx';
import ConfirmationDialog from '../util/ConfirmationDialog.jsx';

export default class FileNode extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    markedForDelete: PropTypes.bool,
    model: PropTypes.object.isRequired,
    selected: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.remoteActionCreator = new RemoteFileActionCreator(props.id, props.model);
    this.remoteActionCreator.listenFor(['changed']);

    this.state = {
      showContextMenu: false,
      showDeleteConfirm: false
    };
  }

  componentDidUpdate() {
    if (this.props.markedForDelete) {
      deleteFile(this.props.id);
    }
  }

  componentWillUnmount() {
    this.remoteActionCreator.cleanUp();
  }

  handleClick = () => {
    selectNode(this.props.id, false);
  };

  handleOpen = () => {
    openFile(this.props.id);
  };

  handleDelete = () => {
    this.setState({showDeleteConfirm: true});
  };

  handleHistory = () => {
    openHistory(this.props.id);
  };

  handleRename = (newName) => {
    renameFile(this.props.id, newName);
    this.setState({renaming: false});
  };

  handleRenameCancel = () => {
    this.setState({renaming: false});
  };

  handleRenameSelect = () => {
    this.setState({renaming: true});
  };

  handleContextMenu = (e) => {
    this.setState({showContextMenu: true});
    e.preventDefault();
  };

  handleHideContextMenu = () => {
    this.setState({showContextMenu: false});
  };

  handleDeleteFileCancel = () => {
    this.setState({showDeleteConfirm: false});
  }

  handleDeleteFileOk = () => {
    deleteFile(this.props.id);
    this.setState({showDeleteConfirm: false});
  }

  _createDeleteConfirm() {
    if (this.state.showDeleteConfirm) {
      const nodeName = this.props.model.get('name').value();
      const title = "Confirm Delete";
      const message = `Delete file "${nodeName}"?`;
      return (<ConfirmationDialog
        onCancel={this.handleDeleteFileCancel}
        onOk={this.handleDeleteFileOk}
        title={title}
        message={message}
      />);
    }
  }

  render() {
    const nodeClasses = classNames("node", "file", this.props.selected ? 'selected' : '');
    const deleteConfirm = this._createDeleteConfirm();

    let contextMenu;
    if(this.state.showContextMenu) {
      contextMenu = (
        <FileContextMenu 
          onHide={this.handleHideContextMenu}
          onSelectDelete={this.handleDelete} 
          onSelectHistory={this.handleHistory}
          onSelectOpen={this.handleOpen}
          onSelectRename={this.handleRenameSelect} 
        />
      );
    }

    const nodeName = this.props.model.get('name').value();

    return (
      <div 
        className={nodeClasses} 
        onClick={this.handleClick} 
        onContextMenu={this.handleContextMenu} 
        onDoubleClick={this.handleOpen}
      >
        <i className="fa fa-file-code-o" /> 
        <RenamableNode name={nodeName} renaming={this.state.renaming} 
          onCancel={this.handleRenameCancel} onComplete={this.handleRename} />
        {contextMenu}
        {deleteConfirm}
      </div>
    );
  }  
}
