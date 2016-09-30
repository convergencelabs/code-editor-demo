import React, {PropTypes} from 'react';
import classNames from 'classnames';

function FileNode(props) {
  const nodeClasses = classNames(props.nodeClasses, props.selected ? 'selected' : '');
  const iconClasses = classNames('fa', props.iconClass);

  function handleClick() {
    props.onClick(props.id);
  }

  return (
    <div className={nodeClasses} onClick={handleClick}>
      <i className={iconClasses} /> {props.name}
    </div>
  );
}

FileNode.propTypes = {
  iconClass: PropTypes.string.isRequired,
  id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  nodeClasses: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

export default FileNode;