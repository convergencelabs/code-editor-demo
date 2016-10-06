import React, {PropTypes} from 'react';

import TreeView from './TreeView.jsx';

export default class FileTree extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    files: PropTypes.object.isRequired,
    folders: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.rootId = 'root';
  }


  render() {
    let {folders, files, actions} = this.props;
    return (
      <div className="file-tree">
        <TreeView 
          actions={actions}
          defaultCollapsed={false} 
          files={files}
          folder={folders.byId.root} 
          folders={folders}
          selectedId={folders.selectedId} />
      </div>
    );
  }
}


