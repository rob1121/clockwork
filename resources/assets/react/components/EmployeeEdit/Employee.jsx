import React from 'react';
import PropTypes from 'prop-types';
import InputText from '../Forms/InputText/InputText';
import LoaderHOC from '../LoaderHOC';
import Container from '../Layout/Container';
import Columns from '../Layout/Columns';
import Column from '../Layout/Column';
import Calendar from '../Calendar';

const Employee = ({ employee, updateEmployee, saveEmployeeToDb }) => (
  <Container>
    <Columns>
      <Column width={10}>
        <small>Name</small>
        <InputText
          name={'name'}
          value={employee.name}
          onChange={updateEmployee}
          onBlur={saveEmployeeToDb}
        />
      </Column>
    </Columns>

    <Columns>
      <Column width={10}>
        <small>Email</small>
        <InputText
          name={'email'}
          value={employee.email}
          onChange={updateEmployee}
          onBlur={saveEmployeeToDb}
        />
      </Column>
    </Columns>

    <Columns>
      <Column width={4}>
        <small>Title</small>
        <InputText
          name={'title'}
          value={employee.title}
          onChange={updateEmployee}
          onBlur={saveEmployeeToDb}
        />
      </Column>
    </Columns>

    <Calendar events={employee.schedule_task} />
  </Container>
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
  updateEmployee: PropTypes.func.isRequired,
  saveEmployeeToDb: PropTypes.func.isRequired,
};

export default LoaderHOC('employee')(Employee);
