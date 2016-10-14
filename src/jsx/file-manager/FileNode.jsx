import React, {PropTypes} from 'react';
import classNames from 'classnames';

import {openFile, deleteFile, renameFile, selectNode, openHistory} from '../../js/actions/actionCreator';
import RemoteFileActionCreator from '../../js/actions/RemoteFileActionCreator';
import {FileContextMenu} from './ContextMenu.jsx';
import RenamableNode from './RenamableNode.jsx';

export default class FileNode extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    model: PropTypes.object.isRequired,
    selected: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.remoteActionCreator = new RemoteFileActionCreator(props.id, props.model);
    this.remoteActionCreator.listenFor(['changed']);

    this.state = {
      showContextMenu: false
    };
  }

  componentWillUnmount() {
    this.remoteActionCreator.cleanUp();
  }

  handleClick = () => {
    selectNode(this.props.id);
  };
  handleOpen = () => {
    openFile(this.props.id);
  };
  handleDelete = () => {
    deleteFile(this.props.id);
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

  render() {
    const nodeClasses = classNames("node", "file", this.props.selected ? 'selected' : '');

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
    const nodeName = this.props.model.get('name').data();

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
      </div>
    );
  }  
}
