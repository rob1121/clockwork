import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

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
      events:  [
        {
          'title': 'All Day Event',
          'allDay': true,
          'start': new Date(2017, 8, 0),
          'end': new Date(2017, 8, 1)
        },
        {
          'title': 'Long Event',
          'start': new Date(2017, 8, 7),
          'end': new Date(2017, 8, 10)
        },

        {
          'title': 'DTS STARTS',
          'start': new Date(2017, 8, 13, 0, 0, 0),
          'end': new Date(2017, 8, 20, 0, 0, 0)
        },

        {
          'title': 'DTS ENDS',
          'start': new Date(2017, 80, 6, 0, 0, 0),
          'end': new Date(2017, 80, 13, 0, 0, 0)
        },

        {
          'title': 'Some Event',
          'start': new Date(2017, 8, 9, 0, 0, 0),
          'end': new Date(2017, 8, 9, 0, 0, 0)
        },
        {
          'title': 'Conference',
          'start': new Date(2017, 8, 11),
          'end': new Date(2017, 8, 13),
          desc: 'Big conference for important people'
        },
        {
          'title': 'Meeting',
          'start': new Date(2017, 8, 12, 10, 30, 0, 0),
          'end': new Date(2017, 8, 12, 12, 30, 0, 0),
          desc: 'Pre-meeting meeting, to prepare for the meeting'
        },
        {
          'title': 'Lunch',
          'start':new Date(2017, 8, 12, 12, 0, 0, 0),
          'end': new Date(2017, 8, 12, 13, 0, 0, 0),
          desc: 'Power lunch'
        },
        {
          'title': 'Meeting',
          'start':new Date(2017, 8, 12,14, 0, 0, 0),
          'end': new Date(2017, 8, 12,15, 0, 0, 0)
        },
        {
          'title': 'Happy Hour',
          'start':new Date(2017, 8, 12, 17, 0, 0, 0),
          'end': new Date(2017, 8, 12, 17, 30, 0, 0),
          desc: 'Most important meal of the day'
        },
        {
          'title': 'Dinner',
          'start':new Date(2017, 8, 12, 20, 0, 0, 0),
          'end': new Date(2017, 8, 12, 21, 0, 0, 0)
        },
        {
          'title': 'Birthday Party',
          'start':new Date(2017, 8, 13, 7, 0, 0),
          'end': new Date(2017, 8, 13, 10, 30, 0)
        },
        {
          'title': 'Late Night Event',
          'start':new Date(2017, 8, 17, 19, 30, 0),
          'end': new Date(2017, 8, 18, 2, 0, 0)
        },
        {
          'title': 'Multi-day Event',
          'start':new Date(2017, 8, 20, 19, 30, 0),
          'end': new Date(2017, 8, 22, 2, 0, 0)
        }
      ],
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

  showSchedule() {
    this.setActive(true);
  }

  render() {
    const { active, events } = this.state;

    const employees = map(this.props.employees, employee => (
      <Employee employee={employee} key={employee.email} >
        <Employee.Edit id={employee.id} />
        <Employee.View showSchedule={this.showSchedule} />
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
    }),
  ).isRequired,
};

export default LoaderHOC('employees')(Scheduler);
