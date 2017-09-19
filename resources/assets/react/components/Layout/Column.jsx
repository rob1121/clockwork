import React from 'react';
import 'bulma';

const Column = (props) => {
  let {width, offset, children} = props;
    let cn = 'column ';
    if (width) cn += `is-${width} `;
    if (offset) cn += `is-offset-${offset}`;

    return (
      <div className={cn}>{children}</div>
    );
};

Column.defaulProps = {
  width: null,
  offset: null,
};

export default Column;