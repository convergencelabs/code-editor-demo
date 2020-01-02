import React from 'react';
import PropTypes from 'prop-types';
import Rcslider from 'rc-slider';
import moment from 'moment';
import FAButton from '../util/FAButton.jsx';
const dateFormat = 'MM/DD/YYYY @ h:mm:ss a';

export default class PlaybackBar extends React.Component {
  static propTypes = {
    model: PropTypes.object.isRequired
  };

  static _formatTime(date) {
    return moment(date).format(dateFormat);
  }

  constructor(props) {
    super(props);

    this.state = {
      maxVersion: this.props.model.maxVersion(),
      version: this.props.model.maxVersion(),
      timestamp: PlaybackBar._formatTime(this.props.model.time()),
      hasNext: false,
      hasPrev: true,
      playing: false
    };
  }

  handleSliderChanged = (val) => {
    this.props.model.playTo(val).then(() => {
      this._onVersionChanged();
    });
  }


  handlePlay = () => {
    this.setState({playing: true});
    setTimeout(() => {
      this._stepAndSchedule();
    }, 0);
  }

  handleStop = () => {
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

  handleNext = () => {
    this.props.model.forward().then(() => {
      this._onVersionChanged();
    });
  }

  handlePrevious = () => {
    this.props.model.backward().then(() => {
      this._onVersionChanged();
    });
  }

  _onVersionChanged() {
    const currentTime = PlaybackBar._formatTime(this.props.model.time());
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
          min={1}
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


