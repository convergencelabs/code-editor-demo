import React from 'react';
import Rcslider from 'rc-slider';
import moment from 'moment';
import FAButton from '../util/FAButton.jsx';

const dateFormat = 'M/d/YYYY @ h:mma';

export default class PlaybackBar extends React.Component {
  static propTypes = {
    model: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      maxVersion: this.props.model.maxVersion(),
      version: this.props.model.maxVersion(),
      timestamp: moment(this.props.model.modifiedTime()).format(dateFormat),
      hasNext: false,
      hasPrev: true
    };
  }

  _sliderChanged(val) {
    this._onVersionChanged(val);
    this.props.model.playTo(val);
  }

  _onPlay() {

  }

  _onNext() {
    this._onVersionChanged(this.state.version + 1);
    this.props.model.forward();
  }

  _onPrev() {
    this._onVersionChanged(this.state.version - 1);
    this.props.model.backward();
  }

  _onVersionChanged(newVersion) {
    this.setState({
      version: newVersion,
      hasNext: newVersion < this.state.maxVersion,
      hasPrev: newVersion > 0
    });
  }

  render() {
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
              onClick={() => this._onPrev()}
              enabled={this.state.hasPrev}
            />
            <FAButton
              title="Step Forward"
              icon="fa-step-forward"
              onClick={() => this._onNext()}
              enabled={this.state.hasNext}
            />
            <FAButton
              title="Play"
              icon="fa-play"
              onClick={() => this._onPlay()}
              enabled={this.state.hasNext}
            />
          </div>
        </div>
        <Rcslider
          min={0}
          max={this.state.maxVersion}
          step={1}
          tipFormatter={null}
          value={this.state.version}
          onChange={(e) => this._sliderChanged(e)}
        />
      </div>
    );
  }
}


