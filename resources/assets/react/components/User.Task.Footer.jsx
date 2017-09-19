import React from 'react';

const Footer = (props) => (
  <footer className="card-footer">
    <a href="#" className="card-footer-item">{props.children}</a>
  </footer>
);

export default Footer;