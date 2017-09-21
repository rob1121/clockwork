import React from 'react';
import Header from './Modal.Header';
import Content from './Modal.Content';
import Footer from './Modal.Footer';
import '../../../sass/components/schedule.edit.sass';

export default class Modal extends React.Component {
  render() {
    return (
      <div className={`modal ${this.props.active ? 'is-active' : ''}`} style={{ zIndex: 1050 }}>
        <div className="modal-background" />
        <div className="modal-card full-width">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Modal.Header = Header;
Modal.Content = Content;
Modal.Footer = Footer;
