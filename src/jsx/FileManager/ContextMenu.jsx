import React, {PropTypes} from 'react';

import Popover from '../util/Popover.jsx';

export function FileContextMenu(props) { 
  return (
    <Popover display={props.display} onHide={props.onHide}>
      <div className="context-menu">
        <ul>
          <ContextMenuOption id="rename" text="Rename..." onClick={props.onSelect} />
          <ContextMenuOption id="delete" text="Delete file" onClick={props.onSelect} />
        </ul>
      </div>
    </Popover>
  );
}
FileContextMenu.propTypes = {
  display: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};


export function FolderContextMenu(props) {
  const menuStyle = {display: props.display ? 'block' : 'none'};

  return (
    <div className="context-menu" style={menuStyle}>
      <ul>
        <ContextMenuOption id="rename" text="Rename..." onClick={props.onSelect} />
        <ContextMenuOption id="delete" text="Delete file" onClick={props.onSelect} />
      </ul>
    </div>
  );
}
FolderContextMenu.propTypes = {
  display: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};


export function ContextMenuOption(props) {
  function handleClick() {
    props.onClick(props.id);
  }

  return <li onClick={handleClick}>{props.text}</li>;
}
ContextMenuOption.propTypes = {
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};