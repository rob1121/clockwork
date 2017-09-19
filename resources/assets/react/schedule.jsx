require('../js/bootstrap');

import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import Schedule from "./containers/Schedule";
import store from "./store";

render(
  <Provider store={store}>
    <Schedule />
  </Provider>,
  window.document.getElementById('app')
  );