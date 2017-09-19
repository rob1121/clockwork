import React from 'react';
import PropTypes from 'prop-types';
import View from './Employee.View';
import Edit from './Employee.Edit';
import Remove from './Employee.Remove';
import Columns from '../Layout/Columns';
import Column from '../Layout/Column';

const Employee = props => (
  <Columns>
    <Column>{props.employee.name}</Column>
    <Column>{props.employee.email}</Column>
    <Column>
      {props.children}
    </Column>
  </Columns>
);

Employee.View = View;

Employee.Edit = Edit;

Employee.Remove = Remove;

Employee.propTypes = {
  children: PropTypes.node.isRequired,
  employee: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default Employee;
