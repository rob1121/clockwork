import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEmployees } from '../actions/EmployeesAction';
import Nav from '../components/Nav';
import Scheduler from '../components/Scheduler';

class App extends React.Component
{
  componentWillMount() {
    axios.get('/timetracker/employees/all').then(({data}) => {
      this.props.getEmployees(data);
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

App.propTypes = {
  getEmployees: PropTypes.func.isRequired,
};

const mapStateToProps = ({ employees }) => {
  return {
    employees,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEmployees: employees => dispatch(getEmployees(employees)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
