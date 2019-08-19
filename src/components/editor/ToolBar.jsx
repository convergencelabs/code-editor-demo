import React from 'react';
import FAButton from '../util/FAButton.jsx';

export default class ToolBar extends React.Component {

  render() {
    return (
      <div className="playback-bar">
        <div className="playback-top">
          <div className="version-meta">
            <span className="version-label">Version: </span>
            <span className="version">{this.state.version} ({this.state.timestamp})</span>
          </div>
          <div className="playback-controls">
            <i onClick={() => this._onPrev()} className="button fa fa-step-backward"/>
            <i onClick={() => this._onNext()} className="button fa fa-step-forward"/>
            <i className="button fa fa-play"/>
            <FAButton title="foo" icon="fa-step-forward" onClick={() => console.log("foo")} />
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


