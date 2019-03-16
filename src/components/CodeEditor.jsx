import React from 'react';
import Home from './Home.jsx';
import Login from './Login.jsx';
import ProjectsDialog from './project/ProjectsDialog.jsx';
import {closeAll} from '../actions/actionCreator';
import {Convergence} from '@convergence/convergence';
import PropTypes from 'prop-types';

export default class CodeEditor extends React.Component {
  static propTypes = {
    domainUrl: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    const userMatch = window.location.search.match(/\?user=(\w+)/);
    if (userMatch && userMatch.length > 1) {
      Convergence.connectAnonymously(props.domainUrl, userMatch[1]).then(d => {
        this.setState({domain: d});
      });
    }

    this.state = {
      domain: null,
      projectData: null
    };
  }

  handleLogin = (domain) => {
    this.setState({domain});
  }

  handleClose = () => {
    const projData = this.state.projectData;
    projData.model.close();
    projData.activity.leave();
    projData.chatRoom.leave();

    closeAll();

    this.setState({projectData: null});
  }

  handleLogout = () => {
    this.state.domain.dispose();
    this.setState({domain: null, projectData: null});
  }

  handleOpenProject = (model) => {
    const domain = this.state.domain;

    let activity = null;
    let chatRoom = null;

    Promise.all([
      domain.activities().join(model.modelId()).then(a => activity = a),
      domain.chat()
        .create({id: model.modelId(), type: "room", membership: "public", ignoreExistsError: true})
        .then(channelId => domain.chat().join(channelId))
        .then(c => chatRoom = c)
    ]).then(() => {
      const projectData = {model, activity, chatRoom, user: model.session().user()};
      this.setState({projectData});
    }).catch((e) => {
      console.error(e);
    });
  }

  render() {
    let component = null;
    if (this.state.domain === null) {
      component =
        (<Login
          domainUrl={this.props.domainUrl}
          onLogin={this.handleLogin}
        />);
    } else if (this.state.projectData === null) {
      component =
        (<ProjectsDialog
          collectionId={'projects'}
          onOpen={this.handleOpenProject}
          modelService={this.state.domain.models()}
          onLogout={this.handleLogout}
        />);
    } else {
      component =
        (<Home
          rtModel={this.state.projectData.model}
          chatRoom={this.state.projectData.chatRoom}
          domain={this.state.domain}
          activity={this.state.projectData.activity}
          user={this.state.projectData.user}
          onLogout={this.handleLogout}
          onClose={this.handleClose}
        />);
    }

    return component;
  }
}
