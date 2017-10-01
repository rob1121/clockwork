import React from 'react';
import PropTypes from 'prop-types';

const Header = props => (<header className="modal-card-head">
  <p className="modal-card-title">
    {props.text}
  </p>
  <button className="delete" aria-label="close" onClick={props.onExit} />
</header>);

Header.propTypes = {
  onExit: PropTypes.func.isRequired,
  text: PropTypes.node.isRequired,
};

export default Header;
