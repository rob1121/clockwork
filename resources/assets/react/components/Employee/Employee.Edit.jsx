import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Forms/Icon';

const Edit = props => (
  <a href={`/employee-schedule/${props.id}/edit`} title="edit schedule">
    <Icon icon="calendar" />
  </a>
);

Edit.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Edit;
