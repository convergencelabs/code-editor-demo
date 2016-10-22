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
    this.store.dispose();
  }

  onChange = () => {
    this.setState(this.getStateFromStore());
  }

  getStateFromStore = () => {
    return {
      treeNodes: this.store.getNodes(),
      treeState: this.store.getTreeState()
    };
  }

  render() {
    return <FileManager {...this.state} />;
  }
}


