import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Forms/Icon';

const View = props => (
  <a
    onClick={() => props.showSchedule(props.id)}
    title="view schedule"
    role="button"
    tabIndex={0}
  >
    <Icon icon="eye" />
  </a>
);

View.propTypes = {
  showSchedule: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default View;
