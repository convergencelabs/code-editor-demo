import React, {PropTypes} from 'react';
import CenteredPanel from '../CenteredPanel.jsx';
import ProjectsList from './ProjectsList.jsx';
import {autobind} from 'core-decorators';

export default class ProjectsDialog extends React.Component {

  static propTypes = {
    collectionId: PropTypes.string.isRequired,
    modelService: PropTypes.object.isRequired,
    onOpen: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      loaded: true,
      opening: false,
      projects: [
        {name: "Project 1", id: "Project 1"},
        {name: "Project 2", id: "Project 2"}
      ],
      selected: null
    };
  }

  @autobind
  handleOpenProject(projectId) {
    // set opening to true.
    this.props.modelService.open('projects', projectId, () => {
      return {
        "tree": {
          "nodes": {
            "root": {
              "name": projectId,
              "children": []
            }
          }
        }
      };
    }).then((model) => {
      this.props.onOpen(model);
    }).catch((e) => {
      // replace with UI notification.
      console.log(e);
    });
  }

  @autobind
  handleSelectProject(projectId) {
    this.setState({selected: projectId});
  }
  
  @autobind
  onOpenClicked() {

  }

  render() {
    return (
      <CenteredPanel>
        <div className="projects-dialog">
          <div className="title">Projects</div>
          <ProjectsList
            projects={this.state.projects}
            onOpen={this.handleOpenProject}
            onSelect={this.handleSelectProject}
          />
          <div className="buttons">
            <button disabled={this.state.selected === null} className="app-button">Open</button>
            <button className="app-button">New</button>
            <button disabled={this.state.selected === null} className="app-button">Delete</button>
          </div>
        </div>
      </CenteredPanel>
    );
  }
}
