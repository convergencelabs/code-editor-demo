import React from 'react';
import Rcslider from 'rc-slider';
import moment from 'moment';

const dateFormat = 'M/d/YYYY @ h:mma';

export default class ParticipantsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      version: 125,
      timestamp: moment(new Date()).format(dateFormat)
    }
  }

  _sliderChanged(val) {
    this.setState({
      version: val
    });
  }

  _onNext() {
    this.setState({
      version: this.state.version + 1
    });
  }

  _onPrev() {
    this.setState({
      version: this.state.version - 1
    });
  }

  render() {
    return (
      <div className="playback-bar">
        <div className="playback-top">
          <div className="version-meta">
            <span className="version-label">Version: </span>
            <span className="version-labe">{this.state.version}</span>
            <span className="time-label">Time: </span>
            <span className="time">{this.state.timestamp}</span>
          </div>
          <div className="playback-controls">
            <i onClick={() => this._onPrev()} className="button fa fa-step-backward"/>
            <i onClick={() => this._onNext()} className="button fa fa-step-forward"/>
            <i className="button fa fa-play"/>
          </div>
        </div>
        <Rcslider
          min={0}
          max={125}
          step={1}
          tipFormatter={null}
          value={this.state.version}
          onChange={(e) => this._sliderChanged(e)}
        />
      </div>
    );
  }
}


