import React, {PropTypes} from 'react';
import {autobind} from 'core-decorators';
import CenteredPanel from './CenteredPanel.jsx';

export default class ProjectSelector extends React.Component {

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
      projects: ['example1', 'example2']
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

  render() {
    var projects = this.state.projects.map((projectId) => {
      return (<li key={projectId} onClick={() => {
        if (!this.state.opening) {
          this.handleOpenProject(projectId);
        }
      }}>{projectId}</li>);
    });

    return (
      <CenteredPanel>
        <ul>{projects}</ul>
      </CenteredPanel>
    );
  }
}
