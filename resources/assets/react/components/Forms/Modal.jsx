import React from 'react';
import PropTypes from 'prop-types';
import Header from './Modal.Header';
import Content from './Modal.Content';
import Footer from './Modal.Footer';
import '../../../sass/components/schedule.edit.sass';

const Modal = props => (
  <div className={`modal ${props.active ? 'is-active' : ''}`} style={{ zIndex: 1050 }}>
    <div className="modal-background" />
    <div className="modal-card full-width">{props.children}</div>
  </div>
);

Modal.Header = Header;
Modal.Content = Content;
Modal.Footer = Footer;

Modal.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
