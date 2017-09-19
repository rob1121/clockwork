require('../js/bootstrap');

import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import TimeInTimeOut from "./containers/TimeInTimeOut";

import store from "./store";

render(
  <Provider store={store}>
    <TimeInTimeOut  />
  </Provider>,
  window.document.getElementById('app'));