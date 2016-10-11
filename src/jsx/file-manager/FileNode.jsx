import React, {PropTypes} from 'react';
import classNames from 'classnames';

import * as actions from '../../js/actions';
import {FileContextMenu} from './ContextMenu.jsx';
import RenamableNode from './RenamableNode.jsx';

export default class FileNode extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    selected: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      showContextMenu: false
    };
  }

  handleClick = () => {
    actions.selectNode(this.props.id);
  };
  handleOpen = () => {
    actions.openFile(this.props.id);
  };
  handleDelete = () => {
    actions.deleteFile(this.props.id);
  };
  handleHistory = () => {

  };

  handleRename = (newName) => {
    actions.renameFile(this.props.id, newName);
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

    return (
      <div 
        className={nodeClasses} 
        onClick={this.handleClick} 
        onContextMenu={this.handleContextMenu} 
        onDoubleClick={this.handleOpen}
      >
        <i className="fa fa-file-code-o" /> 
        <RenamableNode name={this.props.name} renaming={this.state.renaming} 
          onCancel={this.handleRenameCancel} onComplete={this.handleRename} />
        {contextMenu}
      </div>
    );
  }  
}
