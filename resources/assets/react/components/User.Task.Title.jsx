import React from 'react';

const Title = (props) => (
  <header className="card-header">
    <p className="card-header-title">
      {props.children}
    </p>
  </header>
);

export default Title;