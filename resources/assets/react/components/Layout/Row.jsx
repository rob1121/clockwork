import React from 'react';
import 'bulma';

const Row = (props) => (
  <div className="columns">
    <div className="column is-offset-1 is-10 is-desktop">
      {props.children}
    </div>
  </div>
);

export default Row;
