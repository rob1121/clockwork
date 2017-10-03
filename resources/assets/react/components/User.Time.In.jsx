import React from 'react';
import axios from 'axios';

const In = ({ onClick }) => (
  <div className="column has-text-centered">

    <button className="button is-large" onClick={onClick}>
      <span className="icon"><i className="fa fa-clock-o"></i></span>
      <span>Time In</span>
    </button>
  </div>
);

export default In;
