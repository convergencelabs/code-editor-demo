import React, {PropTypes} from 'react';
import CenteredPanel from '../CenteredPanel.jsx';
import ProjectsList from './ProjectsList.jsx';
import {autobind} from 'core-decorators';
import NewProjectDialog from './NewProjectDialog.jsx';

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
      selected: null
    };

    props.modelService
      .query()
      .collection("projects")
      .execute().subscribe((result) => {
      // fixme we need some projections here so I can get back specific data.
      const projects = result.map((model) => {
        return {
          name: model.modelId,
          id: model.modelId
        };
      });

      this.setState({projects: projects, loaded: true});
    });
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

  @autobind
  handleNew() {
    this.setState({newProjectVisible: true});
  }

  render() {
    const newProjectDialog = this._createNewProjectDialog();

    return (
      <div>
        <CenteredPanel>
          <div className="projects-dialog">
            <div className="title">
              <img src="assets/img/cl_logo.png"/>
              <span>Projects</span>
              <i className="fa fa-power-off" onClick={this.props.onLogout}/>
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
      </div>
    );
  }

  @autobind
  handleNewProjectCancel() {
    this.setState({newProjectVisible: false});
  }

  @autobind
  handleNewProjectOk(projectName) {
    this.setState({newProjectVisible: false});
    this.props.modelService.create('projects', projectName,
      {
        "tree": {
          "nodes": {
            "root": {
              "name": projectName,
              "children": []
            }
          }
        }
      }).then(() => {
      this.handleOpenProject(projectName);
    });

  }

  _createNewProjectDialog() {
    if (this.state.newProjectVisible) {
      return (<NewProjectDialog
        onCancel={this.handleNewProjectCancel}
        onOk={this.handleNewProjectOk}
      />);
    }

    return;
  }
}
