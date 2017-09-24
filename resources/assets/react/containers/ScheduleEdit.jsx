import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEmployee, updateEmployee, saveEmployeeToDb } from '../actions/EmployeeAction';
import Nav from '../components/Nav';
import Employee from '../components/EmployeeEdit/Employee';

const EMPLOYEE_ID_SECTION = 4;

class App extends React.Component {
  componentWillMount() {
    const employeeId = window.location.href.split('/')[EMPLOYEE_ID_SECTION];
    axios.get(`/api/employee-schedule/${employeeId}`).then(({ data }) => {
      this.props.setEmployee(data);
    });
  }

  render() {
    return (
      <Nav>
        <Employee
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
