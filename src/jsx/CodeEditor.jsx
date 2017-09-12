import React from 'react';
import {autobind} from 'core-decorators';
import Home from './Home.jsx';
import Login from './Login.jsx';
import ProjectsDialog from './project/ProjectsDialog.jsx';
import {closeAll} from '../js/actions/actionCreator';
import IdentityCache from '../js/identity-cache.js';
import {Convergence} from '@convergence/convergence';

export default class CodeEditor extends React.Component {
  static propTypes = {
    domainUrl: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    var autoLoginUser = false;
    var userMatch = location.search.match(/\?user=(\w+)/);
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

  @autobind
  handleLogin(domain) {
    this.setState({domain});
  }

  @autobind
  handleClose() {
    const projData = this.state.projectData;
    projData.model.close();
    projData.activity.leave();
    projData.chatRoom.leave();

    closeAll();

    this.setState({projectData: null});
  }

  @autobind
  handleLogout() {
    this.state.domain.dispose();
    this.setState({domain: null, projectData: null});
  }

  @autobind
  handleOpenProject(model) {
    const domain = this.state.domain;
    const identityCache = new IdentityCache(domain.identity());

    let activity = null;
    let chatRoom = null;
    let user = null;

    Promise.all([
      domain.activities().join(model.modelId()).then(a => activity = a),
      domain.chat()
        .create({id: model.modelId(), type: "room", membership: "public", ignoreExistsError: true})
        .then(channelId => domain.chat().join(channelId))
        .then(c => chatRoom = c),
      identityCache.user(model.session().username()).then(u => user = u)
    ]).then(() => {
      const projectData = {model, activity, chatRoom, user, identityCache};
      this.setState({projectData});
    }).catch((e) => {
      console.log(e);
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
          identityCache={this.state.projectData.identityCache}
          onLogout={this.handleLogout}
          onClose={this.handleClose}
        />);
    }

    return component;
  }
}
