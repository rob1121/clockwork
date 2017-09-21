import React from 'react';
import PropTypes from 'prop-types';

const Title = props => (
  <p className="title is-3">{props.children}</p>
);

Title.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Title;
