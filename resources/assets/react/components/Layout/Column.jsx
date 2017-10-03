import React from 'react';
import 'bulma';

const Column = (props) => {
  let { width, offset, children, className } = props;
  let cn = 'column ';
  cn += `${className} `;
  if (width) cn += `is-${width} `;
  if (offset) cn += `is-offset-${offset}`;

  return (
    <div className={cn}>{children}</div>
  );
};

Column.defaulProps = {
  width: null,
  offset: null,
  className: '',
};

export default Column;