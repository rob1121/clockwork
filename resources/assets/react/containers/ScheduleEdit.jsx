import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEmployee, updateEmployee, saveEmployeeToDb } from '../actions/EmployeeAction';
import Nav from '../components/Nav';
import EmployeeDetails from '../components/EmployeeEdit/EmployeeDetails';
import Calendar from '../components/Calendar';

const EMPLOYEE_ID_SECTION = 4;

class App extends React.Component {
  componentWillMount() {
    const employeeId = window.location.href.split('/')[EMPLOYEE_ID_SECTION];
    axios.get(`/api/employee-schedule/${employeeId}`).then(({ data }) => {
      this.props.setEmployee(data);
    });
  }

  render() {

    var windowObjectReference;
    var strWindowFeatures = "menubar=no,location=no,resizable=no,scrollbars=no,status=no,minimizable=no,width=650,height=500,resizable=no";


    return (
      <Nav>
        <button onClick={() => {
          windowObjectReference = window.open("http://localhost:3000/employee-schedule/1", "CNN_WindowName", strWindowFeatures);
        }}>cnn </button>
        <button onClick={() => {
          windowObjectReference = window.open("http://localhost:3000/employee-schedule/1", "CNN_WindowName", strWindowFeatures);
        }}>cnn </button>
        <Calendar events={this.props.employee.schedule_task} />
        <EmployeeDetails
          employee={this.props.employee}
          updateEmployee={this.props.updateEmployee}
          saveEmployeeToDb={this.props.saveEmployeeToDb}
        />
      </Nav>
    );
  }
}

App.propTypes = {
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
  }).isRequired,
  updateEmployee: PropTypes.func.isRequired,
  saveEmployeeToDb: PropTypes.func.isRequired,
};

const mapStateToProps = ({ employee }) => ({
  employee,
});

const mapDispatchToProps = dispatch => ({
  setEmployee: employee => dispatch(setEmployee(employee)),
  updateEmployee: (key, val) => dispatch(updateEmployee(key, val)),
  saveEmployeeToDb: () => dispatch(saveEmployeeToDb()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
