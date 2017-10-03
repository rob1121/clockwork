import React from 'react';
import moment from 'moment';
import LoaderHOC from './LoaderHOC';
import { withState } from 'recompose';

const enhance = withState('lapse', 'setLapse', '--:--:--');
const Lapse = ({ timein, lapse, setLapse }) => {
  timein = moment(moment().format('YYYY-MM-DD') + ' ' + timein);
  let now = undefined;
  let duration = undefined;

  setInterval(() => {
    now = moment();
    duration = moment.duration(now.diff(timein));
    setLapse(`${duration.get('hour')}:${duration.get('minutes')}:${duration.get('seconds')}`);
    console.log(lapse);
  }, 1000);
  return (
    <div className="columns">
      <div className="column has-text-centered">
        <p className="time__spent">{lapse}</p>
      </div>
    </div>
  );
}

export default LoaderHOC('timein')(enhance(Lapse));