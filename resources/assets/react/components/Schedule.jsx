import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Schedule.Modal';
import Selectable from './Schedule.Selectable';

const Schedule = props => (
  <div>
    {props.children}
  </div>
);

Schedule.Modal = Modal;

Schedule.Selectable = Selectable;

Schedule.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Schedule;
