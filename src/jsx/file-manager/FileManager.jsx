import React, {PropTypes} from 'react';

import * as actions from '../../js/actions';
import ActionButton from './ActionButton.jsx';
import FileTree from './FileTree.jsx';

export default class FileManager extends React.Component {
  static propTypes = {
    selected: PropTypes.string,
    treeNodes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  handleNewFile = () => {
    actions.addNewNode('file', this.props.selected);
  }
  handleNewFolder = () => {
    actions.addNewNode('folder', this.props.selected);
  }

  render() {
    return (
      <div className="file-manager">
        <div className="section-title">Project</div>
        <div className="file-actions">
          <ActionButton bigIcon="fa-file-text-o" onClick={this.handleNewFile} />
          <ActionButton 
            bigIcon="fa-folder-o fa-flip-horizontal" 
            className="add-folder" 
            onClick={this.handleNewFolder} />
        </div>
        <FileTree {...this.props} />
      </div>
    );
  }
}

