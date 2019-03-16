import React from 'react';
import PropTypes from 'prop-types';
import ProjectItem from './ProjectItem.jsx';

export default class ProjectsList extends React.Component {

  static propTypes = {
    loaded: PropTypes.bool.isRequired,
    onOpen: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedId: null
    };
  }

  handleProjectClick = (projectId) => {
    this.setState({selectedId: projectId});
    this.props.onSelect(projectId);
  }

  handleProjectDoubleClick = (projectId) => {
    this.props.onOpen(projectId);
  }

  render() {
    let contents = null;

    if (this.props.loaded) {
      contents = this.props.projects.map((project) => {
        return (<ProjectItem
          key={project.id}
          project={project}
          selected={this.state.selectedId === project.id}
          onClick={this.handleProjectClick}
          onDoubleClick={this.handleProjectDoubleClick}
        />);
      });
    } else {
      contents = <div>Loading...</div>;
    }

    return (<div className="projects-list">{contents}</div>);
  }
}
