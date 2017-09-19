import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Forms/Icon';

const View = props => (
  <a onClick={props.showSchedule} title="view schedule" role="button" tabIndex={0}>
    <Icon icon="eye" />
  </a>
);

View.propTypes = {
  showSchedule: PropTypes.func.isRequired,
};

export default View;
