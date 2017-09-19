import React, { Component } from 'react';
import In from './User.Time.In';
import Out from './User.Time.Out';

class Time extends Component {
  render() {
    return (
      <div className="columns">
        {this.props.children}
      </div>
    );
  }
}

Time.In = In;
Time.Out = Out;

export default Time;