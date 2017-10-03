import React from 'react';
import axios from 'axios';

const Out = ({ onClick }) => (
  <div className="column has-text-centered">
    <button className="button is-large" onClick={onClick}>
      <span className="icon"><i className="fa fa-clock-o"></i></span>
      <span>Time Out</span></button>
  </div>
);

export default Out;