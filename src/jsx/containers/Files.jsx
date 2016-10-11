import React, {PropTypes} from 'react';

import TreeStore from '../../js/stores/TreeStore';
import FileManager from '../file-manager/FileManager.jsx';

export default class Files extends React.Component {
  static propTypes = {
    rtModel: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.store = new TreeStore(props.rtModel);

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
  }
  getStateFromStore = () => {
    return this.store.getTree();
  }

  render() {
    return <FileManager treeNodes={this.state.nodes} selected={this.state.selected} />;
  }
}


