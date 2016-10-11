import React, {PropTypes} from 'react';

import TreeView from './TreeView.jsx';

export default class FileTree extends React.Component {
  static propTypes = {
    selected: PropTypes.string,
    treeNodes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.rootId = 'root';
  }


  render() {
    const folder = this.props.treeNodes.get(this.rootId);

    return (
      <div className="file-tree">
        <TreeView 
          defaultCollapsed={false} 
          folder={folder} 
          folderId={this.rootId}
          {...this.props} />
      </div>
    );
  }
}


