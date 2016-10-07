import React, {PropTypes} from 'react';
import { autobind } from 'core-decorators';
import classNames from 'classnames';

import {FileContextMenu} from './ContextMenu.jsx';
import RenamableNode from './RenamableNode.jsx';

export default class FileNode extends React.Component {
  static propTypes = {
    actionCreator: PropTypes.object.isRequired,
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

  @autobind
  handleClick() {
    this.props.actionCreator.selectNode(this.props.id);
  }
  @autobind
  handleOpen() {
    this.props.actionCreator.openFile(this.props.id);
  }

  @autobind
  handleRename(newName) {
    this.props.onRename(this.props.id, newName);
    this.setState({renaming: false});
  }
  @autobind
  handleRenameCancel() {
    this.setState({renaming: false});
  }

  @autobind
  handleContextMenu(e) {
    this.setState({showContextMenu: true});
    e.preventDefault();
  }

  @autobind
  handleHideContextMenu() {
    this.setState({showContextMenu: false});
  }

  @autobind
  handleRenameSelect(e) {
    this.handleHideContextMenu(e);
    e.stopPropagation();
    this.setState({renaming: true});
  }

  @autobind
  handleDelete(e) {
    this.handleHideContextMenu(e);
    e.stopPropagation();
    this.props.onDelete(this.props.id);
  }

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
