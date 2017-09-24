import React from 'react';
import 'bulma';
import PropTypes from 'prop-types';
import Row from './Row';

const styles = {
  container: {
    marginTop: 32,
  },
};

const Container = props => (
  <div className="container" style={styles.container}>
    <Row>
      {props.children}
    </Row>
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
