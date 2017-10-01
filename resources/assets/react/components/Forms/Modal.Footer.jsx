import React from 'react';
import PropTypes from 'prop-types';

const Footer = props =>
  (<footer className="modal-card-foot" style={{ justifyContent: 'flex-end' }}>
    {props.children}
  </footer>);

Footer.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Footer;
