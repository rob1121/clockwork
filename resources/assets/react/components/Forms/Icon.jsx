import React from 'react';
import PropTypes from 'prop-types';

const Icon = props => (
  <span className={`icon is-${props.size}`}>
    <i className={`fa fa-${props.icon}`} />
  </span>
);

Icon.propTypes = {
  size: PropTypes.string,
  icon: PropTypes.string,
};

Icon.defaultProps = {
  size: 'small',
  icon: null,
};
export default Icon;
