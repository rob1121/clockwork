
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getEmployees } from '../actions/EmployeesAction';
import Nav from '../components/Nav';
import Scheduler from '../components/Scheduler';

class App extends React.Component
{
  componentWillMount() {
    axios.get('/timetracker/employees/all').then((response) => {
      this.props.getEmployees(response.data);
    });
  }

  render() {
    return (
      <Nav>
        <Scheduler employees={this.props.employees} />
      </Nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    employees: state.employees,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEmployees: employees => dispatch(getEmployees(employees)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
