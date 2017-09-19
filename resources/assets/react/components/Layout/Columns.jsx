import React from 'react';
import 'bulma';

const Columns = (props) => (
  <div className="columns">{props.children}</div>
);

export default Columns;