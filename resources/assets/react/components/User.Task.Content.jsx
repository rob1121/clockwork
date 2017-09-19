import React from 'react';

const Content = (props) => (
  <div className="card-content">
    <div className="content">
      {props.children}
    </div>
  </div>
);

export default Content;