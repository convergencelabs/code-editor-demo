import React from 'react';
import PropTypes from 'prop-types';
import CenteredPanel from '../CenteredPanel.jsx';
import ProjectsList from './ProjectsList.jsx';
import NewProjectDialog from './NewProjectDialog.jsx';
import ConfirmationDialog from '../util/ConfirmationDialog.jsx';
import logo from "../../assets/img/cl_logo.png";

// fixme abstract this to somewhere else.
const PROJECT_COLLECTION_ID = "projects";

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
      loaded: false,
      opening: false,
      projects: [],
      selected: null,
      deleteProjectVisible: false
    };

    this._loadProjects();
  }

  _loadProjects() {
    this.props.modelService.query(`SELECT FROM ${PROJECT_COLLECTION_ID}`).then((result) => {
      // fixme we need some projections here so I can get back specific data.
      const projects = result.map((model) => {
        return {
          name: model.data.name,
          id: model.modelId
        };
      });

      this.setState({projects: projects, loaded: true});
    });
  }

  handleOpenProject = (modelId) => {
    // set opening to true.
    this.props.modelService.open(modelId).then(model => {
      this.props.onOpen(model);
    }).catch((e) => {
      // replace with UI notification.
      console.error(e);
    });
  }

  handleSelectProject = (projectId) => {
    this.setState({selected: projectId});
  }

  handleOpen = () => {
    this.handleOpenProject(this.state.selected);
  }

  handleDelete = () => {
    this.setState({deleteProjectVisible: true});
  }

  handleNew = () => {
    this.setState({newProjectVisible: true});
  }

  handleNewProjectCancel = () => {
    this.setState({newProjectVisible: false});
  }

  handleNewProjectOk = (projectName) => {
    this.setState({newProjectVisible: false});
    this.props.modelService.create({
      collection: PROJECT_COLLECTION_ID,
      data: {
        "name": projectName,
        "tree": {
          "nodes": {
            "root": {
              "name": projectName,
              "children": []
            }
          }
        }
      }
    }).then(modelId => {
      this.handleOpenProject(modelId);
    });

  }

  _createNewProjectDialog() {
    if (this.state.newProjectVisible) {
      return (<NewProjectDialog
        onCancel={this.handleNewProjectCancel}
        onOk={this.handleNewProjectOk}
      />);
    }
  }

  handleDeleteProjectCancel = () => {
    this.setState({deleteProjectVisible: false});
  }

  handleDeleteProjectOk = () => {
    this.props.modelService.remove(this.state.selected).then(() => {
      this.setState({deleteProjectVisible: false});
      this._loadProjects();
    });
  }

  _createDeleteProjectDialog() {
    if (this.state.deleteProjectVisible) {
      const title = "Confirm Delete";
      const message = `Delete project "${this.state.selected}"?`;
      return (<ConfirmationDialog
        onCancel={this.handleDeleteProjectCancel}
        onOk={this.handleDeleteProjectOk}
        title={title}
        message={message}
      />);
    }
  }

  render() {
    const newProjectDialog = this._createNewProjectDialog();
    const deleteProjectDialog = this._createDeleteProjectDialog();
    return (
      <div>
        <CenteredPanel>
          <div className="projects-dialog">
            <div className="title">
              <img src={logo} alt="Convergence" />
              <span>Projects</span>
              <i className="fa fa-power-off" onClick={this.props.onLogout} />
            </div>
            <ProjectsList
              projects={this.state.projects}
              onOpen={this.handleOpenProject}
              onSelect={this.handleSelectProject}
              loaded={this.state.loaded}
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
        {newProjectDialog}
        {deleteProjectDialog}
      </div>
    );
  }
}
