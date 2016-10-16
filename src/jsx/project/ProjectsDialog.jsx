import React, {PropTypes} from 'react';
import CenteredPanel from '../CenteredPanel.jsx';
import ProjectsList from './ProjectsList.jsx';
import {autobind} from 'core-decorators';

export default class ProjectsDialog extends React.Component {

  static propTypes = {
    collectionId: PropTypes.string.isRequired,
    modelService: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired,
    onOpen: PropTypes.func.isRequired,
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
  handleOpen() {
    this.handleOpenProject(this.state.selected);
  }

  @autobind
  handleDelete() {
    console.log("delete clicked");
  }

  handleNew() {
    console.log("new clicked");
  }

  render() {
    return (
      <CenteredPanel>
        <div className="projects-dialog">
          <div className="title">
            <img src="../assets/img/cl_logo.png" />
            <span>Projects</span>
            <i className="fa fa-power-off" onClick={this.props.onLogout} />
          </div>
          <ProjectsList
            projects={this.state.projects}
            onOpen={this.handleOpenProject}
            onSelect={this.handleSelectProject}
          />
          <div className="buttons">
            <button disabled={this.state.selected === null} className="app-button" onClick={this.handleOpen}>Open
            </button>
            <button className="app-button" onClick={this.handleNew}>New</button>
            <button disabled={this.state.selected === null} className="app-button" onClick={this.handleDelete}>Delete
            </button>
          </div>
        </div>
      </CenteredPanel>
    );
  }
}
