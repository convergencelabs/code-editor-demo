import React from 'react';
import {autobind} from 'core-decorators';
import Home from './Home.jsx';
import Login from './Login.jsx';
import ProjectSelector from './ProjectSelector.jsx';

export default class CodeEditor extends React.Component {
  static propTypes = {
    domainUrl: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

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
    // todo leave stuff
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
    const activity = domain.activities().activity(model.modelId());
    const chatRoom = domain.chat().room(model.modelId());

    activity.join();
    chatRoom.join();

    const projectData = {model, activity, chatRoom, domain};

    this.setState({projectData});
  }

  render() {
    let component = null;
    if (this.state.domain === null) {
      component = (<Login
        domainUrl={this.props.domainUrl}
        onLogin={this.handleLogin} />);
    } else if (this.state.projectData === null) {
      component = (<ProjectSelector
        collectionId={'projects'} onOpen={this.handleOpenProject}
        modelService={this.state.domain.models()} />);
    } else {
      component =
        (<Home
          rtModel={this.state.projectData.model}
          chatRoom={this.state.projectData.chatRoom}
          domain={this.state.projectData.domain}
          activity={this.state.projectData.activity}
          onLogout={this.handleLogout}
        />);
    }

    return component;
  }
}
