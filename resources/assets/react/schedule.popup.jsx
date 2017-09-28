import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import SchedulePopUpCalendar from './containers/SchedulePopUpCalendar';
import store from './store';

require('../js/bootstrap');

render(
  <Provider store={store}>
    <SchedulePopUpCalendar />
  </Provider>,
  window.document.getElementById('app'),
);
