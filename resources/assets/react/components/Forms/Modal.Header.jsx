import React from 'react';

const Header = props =>
  (<header className="modal-card-head">
    <p className="modal-card-title">
      {props.children}
    </p>
    <button className="delete" aria-label="close" onClick={props.onExit} />
  </header>);

export default Header;
