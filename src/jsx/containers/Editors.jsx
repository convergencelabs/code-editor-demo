import React, {PropTypes} from 'react';

import EditorsStore from '../../js/stores/EditorsStore';
import EditorTabs from '../editor/EditorTabs.jsx';

export default class Editors extends React.Component {
  static propTypes = {
    modelsMetadata: PropTypes.object.isRequired,
    rtModel: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.store = new EditorsStore(props.modelsMetadata, props.rtModel);

    this.state = this.getStateFromStore();
  }

  componentDidMount() {
    this.store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    this.store.removeChangeListener(this.onChange);
  }

  onChange = () => {
    this.setState(this.getStateFromStore());
  };

  getStateFromStore = () => {
    return {
      editors: this.store.getEditors(),
      activeEditor: this.store.getActiveEditor()
    };
  };

  render() {
    return (
      <EditorTabs editors={this.state.editors} activeEditor={this.state.activeEditor} />
    );
  }
}
