import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ScheduleEdit from './containers/ScheduleEdit';
import store from './store';

// require('../js/bootstrap');

render(
  <Provider store={store}>
    <ScheduleEdit />
  </Provider>,
  window.document.getElementById('app'),
);
