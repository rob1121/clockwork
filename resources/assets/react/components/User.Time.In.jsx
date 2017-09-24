import React from 'react';
import axios from 'axios';

const USER_ID_SECTION = 4;
const userId = window.location.href.split('/')[USER_ID_SECTION];

const timeIn = () => {
  axios.put(`/employee-timein/${userId}`);
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
  });
};

const In = () => (
  <div className="column has-text-right">
    <button className="button is-large" onClick={timeIn}>Time In</button>
  </div>
);

export default In;
