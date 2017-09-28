import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import Calendar from '../components/Calendar';
import { setEmployee } from '../actions/EmployeeAction';


const EMPLOYEE_ID_SECTION = 4;

class SchedulePopUpCalendar extends Component {
  componentWillMount() {
    const employeeId = window.location.href.split('/')[EMPLOYEE_ID_SECTION];
    axios.get(`/api/employee-schedule/${employeeId}`).then(({ data }) => {
      this.props.setEmployee(data);
    });
  }
  render() {
    return (
      <div>
        <Calendar events={this.props.employee.schedule_task} />
      </div>
    );
  }
}

SchedulePopUpCalendar.defaultProps = {
  employee: {},
};

SchedulePopUpCalendar.propTypes = {
  setEmployee: PropTypes.func.isRequired,
  employee: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    is_admin: PropTypes.bool,
    schedule_task: PropTypes.arrayOf(PropTypes.shape({
      task: PropTypes.string,
      date_start: PropTypes.string,
      date_end: PropTypes.string,
    })),
  }),
};

const mapStateToProps = ({ employee }) => ({
  employee,
});

const mapDispatchToProps = dispatch => ({
  setEmployee: employee => dispatch(setEmployee(employee)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SchedulePopUpCalendar);
