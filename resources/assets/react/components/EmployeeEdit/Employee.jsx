import React from 'react';
import PropTypes from 'prop-types';
import LoaderHOC from '../LoaderHOC';
import Calendar from '../Calendar';

const Employee = ({ employee }) => (
  <div>
      <Calendar events={employee.schedule_task} selectEventSlot={(e) => console.log(e)} selectEvent={(e) => console.log(e)} />
  </div>
);

Employee.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    title: PropTypes.string,
    is_admin: PropTypes.bool,
    schedule_task: PropTypes.arrayOf(PropTypes.shape({
      task: PropTypes.string,
      date_start: PropTypes.string,
      date_end: PropTypes.string,
    })),
  }).isRequired,
};

export default LoaderHOC('employee')(Employee);
