import React, {PropTypes} from 'react';

import TreeView from './TreeView.jsx';

export default class FileTree extends React.Component {
  static propTypes = {
    actionCreator: PropTypes.object.isRequired,
    files: PropTypes.object.isRequired,
    tree: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.rootId = 'root';
  }


  render() {
    let {tree, files, actionCreator} = this.props;
    return (
      <div className="file-tree">
        <TreeView 
          actionCreator={actionCreator}
          defaultCollapsed={false} 
          files={files}
          folder={tree.folders.root} 
          tree={tree}
          selectedId={tree.selectedId} />
      </div>
    );
  }
}


