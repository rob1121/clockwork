import React from 'react';
import 'bulma';
import PropTypes from 'prop-types';
import { withState } from 'recompose';
const styles = {
  input__readonly: {
    backgroundColor: '#f5f5f5',
    cursor: 'pointer',
  },
};

const InputText = ({ setReadOnly, readOnly, value, name, onChange, onBlur }) => (
  <input
    className="input"
    style={readOnly ? styles.input__readonly : {}}

    type="text"
    value={value}
    onChange={e => onChange(name, e.target.value)}
    onDoubleClick={() => setReadOnly(false)}
    onBlur={() => {
      onBlur();
      setReadOnly(true);
    }}
    readOnly={readOnly}
    title={`double click to edit ${name}`}
  />
);

InputText.defaultProps = {
  readOnly: true,
};

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
  setReadOnly: PropTypes.func.isRequired,
};

export default withState('readOnly', 'setReadOnly', true)(InputText);
