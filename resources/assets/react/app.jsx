// require('../js/bootstrap');

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Home from './containers/Home';
import store from './store';

render(
  <Provider store={store}>
    <Home />
  </Provider>,
  window.document.getElementById('app'),
);
