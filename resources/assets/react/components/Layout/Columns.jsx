import React from 'react';
import 'bulma';
import PropTypes from 'prop-types';

const Columns = props => (
  <div className="columns is-mobile">{props.children}</div>
);

Columns.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Columns;
