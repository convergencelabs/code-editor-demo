import React, {PropTypes} from 'react';
import {autobind} from 'core-decorators';
import CenteredPanel from '../CenteredPanel.jsx';
import ProjectItem from './ProjectItem.jsx';

export default class ProjectsList extends React.Component {

  static propTypes = {
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

  @autobind
  handleProjectClick(projectId) {
    this.setState({selectedId: projectId});
    this.props.onSelect(projectId);
  }

  @autobind
  handleProjectDoubleClick(projectId) {
    this.props.onOpen(projectId);
  }

  render() {
    var projects = this.props.projects.map((project) => {
      return (<ProjectItem
        key={project.id}
        project={project}
        selected={this.state.selectedId === project.id}
        onClick={this.handleProjectClick}
        onDoubleClick={this.handleProjectDoubleClick}
      />);
    });

    return (
      <div className="projects-list">
        {projects}
      </div>
    );
  }
}
