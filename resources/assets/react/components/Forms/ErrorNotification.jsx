import React from 'react';
import PropTypes from 'prop-types';
import { map, isEmpty } from 'lodash';
import Row from '../Layout/Row';

const ErrorNotification = ({ message, errors, reset }, key) => {

  let errorsDiv = '';

  if (!isEmpty(errors)) {
    const errorList = map(errors, error => (
      <li key={error + key}>{error}</li>
    ));

    errorsDiv = (
      <div>
        <br />
        <Row width={10} offset={1}>
          <div className="notification is-danger">
            <button className="delete" onClick={reset} />
            <strong>{message}</strong>
            {errorList}
          </div>
        </Row>
      </div>
    );

    if (window.timeoutHandle) {
      // in your click function, call clearTimeout
      window.clearTimeout(window.timeoutHandle);
    }

    // then call setTimeout again to reset the timer
    window.timeoutHandle = window.setTimeout(reset, 10000);
  }

  return (
    <div>{errorsDiv}</div>
  );
};

ErrorNotification.defaultProps = {
  errors: [],
  message: '',
}

ErrorNotification.propTypes = {
  message: PropTypes.string,
  reset: PropTypes.func.isRequired
};

export default ErrorNotification;