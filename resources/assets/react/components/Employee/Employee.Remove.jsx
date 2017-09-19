import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Forms/Icon';

const Remove = props => (
  <a href={`/timetracker/employee/${props.id}`} title="clear schedule">
    <Icon icon="trash-o" />
  </a>
);

Remove.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Remove;