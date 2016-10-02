import React, {PropTypes} from 'react';

import Popover from '../util/Popover.jsx';

export function FileContextMenu(props) { 
  return (
    <Popover display={props.display} onHide={props.onHide}>
      <div className="context-menu">
        <ul>
          <li onClick={props.onSelectRename}>Rename...</li>
          <li onClick={props.onSelectDelete}>Delete file</li>
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
};


export function FolderContextMenu(props) {
  const menuStyle = {display: props.display ? 'block' : 'none'};

  return (
    <Popover display={props.display} onHide={props.onHide}>
      <div className="context-menu" style={menuStyle}>
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
  display: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSelectDelete: PropTypes.func.isRequired,
  onSelectNewFile: PropTypes.func.isRequired,
  onSelectNewFolder: PropTypes.func.isRequired,
  onSelectRename: PropTypes.func.isRequired,
};
