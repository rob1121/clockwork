import React from 'react';
import PropTypes from 'prop-types';
import { map, findIndex, toArray } from 'lodash';

import LoaderHOC from './LoaderHOC';
import Schedule from './Schedule';
import Row from './Layout/Row';
import Employee from './Employee/Employee';
import Title from './Layout/Title';

class Scheduler extends React.Component {
  constructor() {
    super();

    this.state = {
      active: false,
      events: [],
    };
    this.setActive = this.setActive.bind(this);
    this.showSchedule = this.showSchedule.bind(this);
    this.hideSchedule = this.hideSchedule.bind(this);
  }

  setActive(isActive) {
    this.setState({
      active: isActive,
    });
  }

  hideSchedule() {
    this.setActive(false);
  }

  showSchedule(id) {
    const index = findIndex(toArray(this.props.employees), ['id', id]);
    this.setState({
      ...this.state,
      events: this.props.employees[index].schedule_task,
    });
    this.setActive(true);
  }

  render() {
    const { active, events } = this.state;

    const employees = map(this.props.employees, employee => (
      <Employee employee={employee} key={employee.email} >
        <Employee.Edit id={employee.id} />
        <Employee.View showSchedule={this.showSchedule} id={employee.id} />
        <Employee.Remove id={employee.id} />
      </Employee>
    ));

    return (
      <Row>
        <Title>Employees</Title>
        {employees}
        <Schedule>


          <Schedule.Modal
            onExit={this.hideSchedule}
            active={active}
            events={events}
          />
        </Schedule>
      </Row>
    );
  }
}

Scheduler.propTypes = {
  employees: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
      schedule_task: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        start: PropTypes.string,
        end: PropTypes.string,
      })),
    }),
  ).isRequired,
};

export default LoaderHOC('employees')(Scheduler);
