import React, {PropTypes} from 'react';

import Popover from '../util/Popover.jsx';

// FIXME seems like this could be abstracted into something more generic.

export function FileContextMenu(props) { 
  return (
    <Popover display={props.display} onHide={props.onHide}>
      <div className="context-menu">
        <ul>
          <li onClick={props.onSelectOpen}>Open</li>
          <li onClick={props.onSelectHistory}>View History</li>
          <li onClick={props.onSelectRename}>Rename...</li>
          <li onClick={props.onSelectDelete}>Delete...</li>
        </ul>
      </div>
    </Popover>
  );
}
FileContextMenu.propTypes = {
  display: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSelectDelete: PropTypes.func.isRequired,
  onSelectRename: PropTypes.func.isRequired,
  onSelectOpen: PropTypes.func.isRequired,
  onSelectHistory: PropTypes.func.isRequired,
};


export function FolderContextMenu(props) {
  return (
    <Popover onHide={props.onHide}>
      <div className="context-menu">
        <ul>
          <li onClick={props.onSelectRename}>Rename...</li>
          <li onClick={props.onSelectDelete}>Delete folder</li>
          <li onClick={props.onSelectNewFile}>New file</li>
          <li onClick={props.onSelectNewFolder}>New folder</li>
        </ul>
      </div>
    </Popover>
  );
}
FolderContextMenu.propTypes = {
  onHide: PropTypes.func.isRequired,
  onSelectDelete: PropTypes.func.isRequired,
  onSelectNewFile: PropTypes.func.isRequired,
  onSelectNewFolder: PropTypes.func.isRequired,
  onSelectRename: PropTypes.func.isRequired,
};
