import React from 'react';
import Rcslider from 'rc-slider';
import moment from 'moment';
import FAButton from '../util/FAButton.jsx';
import {autobind} from 'core-decorators';

const dateFormat = 'MM/DD/YYYY @ h:mm:ss a';

export default class PlaybackBar extends React.Component {
  static propTypes = {
    model: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      maxVersion: this.props.model.maxVersion(),
      version: this.props.model.maxVersion(),
      timestamp: this._formatTime(this.props.model.currentTime()),
      hasNext: false,
      hasPrev: true,
      playing: false
    };
  }

  _formatTime(date) {
    return moment(date).format(dateFormat);
  }

  @autobind
  handleSliderChanged(val) {
    this.props.model.playTo(val).then(() => {
      this._onVersionChanged();
    });
  }

  @autobind
  handlePlay() {
    this.setState({playing: true});
    setTimeout(() => {
      this._stepAndSchedule();
    }, 0);
  }

  @autobind
  handleStop() {
    this.setState({playing: false});
  }

  _stepAndSchedule() {
    if (this.state.playing && this.props.model.targetVersion() < this.props.model.maxVersion()) {
      this.handleNext();
      setTimeout(() => {
        this._stepAndSchedule();
      }, 200);
    } else {
      this.setState({playing: false});
    }
  }

  @autobind
  handleNext() {
    this.props.model.forward().then(() => {
      this._onVersionChanged();
    });
  }

  @autobind
  handlePrevious() {
    this.props.model.backward().then(() => {
      this._onVersionChanged();
    });
  }

  _onVersionChanged() {
    const currentTime = this._formatTime(this.props.model.currentTime());
    const currentVersion = this.props.model.version();

    this.setState({
      version: currentVersion,
      hasNext: currentVersion < this.state.maxVersion,
      hasPrev: currentVersion > 0,
      timestamp: currentTime
    });
  }

  render() {
    let playStop = null;

    if (this.state.playing) {
      playStop = (<FAButton
        title="Stop"
        icon="fa-stop"
        onClick={this.handleStop}
        enabled={this.state.hasNext}
      />);
    } else {
      playStop = (<FAButton
        title="Play"
        icon="fa-play"
        onClick={this.handlePlay}
        enabled={this.state.hasNext}
      />);
    }

    return (
      <div className="playback-bar">
        <div className="playback-top">
          <div className="version-meta">
            <span className="version-label">Version: </span>
            <span className="version">{this.state.version} ({this.state.timestamp})</span>
          </div>
          <div className="playback-controls">
            <FAButton
              title="Step Backward"
              icon="fa-step-backward"
              onClick={this.handlePrevious}
              enabled={this.state.hasPrev}
            />
            <FAButton
              title="Step Forward"
              icon="fa-step-forward"
              onClick={this.handleNext}
              enabled={this.state.hasNext}
            />
            {playStop}
          </div>
        </div>
        <Rcslider
          min={0}
          max={this.state.maxVersion}
          step={1}
          tipFormatter={null}
          value={this.state.version}
          onChange={this.handleSliderChanged}
        />
      </div>
    );
  }
}


