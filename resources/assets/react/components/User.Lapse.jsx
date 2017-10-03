import React from 'react';
import moment from 'moment';

export default class Lapse extends React.Component {
  constructor() {
    super();
    this.state = {
      lapse: '--:--:--',
    };

    this.setLapse = this.setLapse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { timein, timeout } = nextProps;
    let now = '';
    let duration = '';

    const today = moment().format('YYYY-MM-DD');

    let mTimein = timein || '00:00:00';
    mTimein = moment(`${today} ${mTimein}`);

    setInterval(() => {
      if (timein && timeout === null) {
        now = moment();
        duration = moment.duration(now.diff(mTimein));
        this.setLapse(`${duration.get('hour')}:${duration.get('minutes')}:${duration.get('seconds')}`);
      }
    }, 1000);

    if (timeout !== null && timein !== null) {
      mTimein = moment(`${today} ${timein}`);

      let mTimeout = timeout || '00:00:00';
      mTimeout = moment(`${today} ${mTimeout}`);
      duration = moment.duration(mTimeout.diff(mTimein));
      this.setLapse(`${duration.get('hour')}:${duration.get('minutes')}:${duration.get('seconds')}`);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(nextState) !== JSON.stringify(this.state);
  }

  setLapse(str) {
    this.setState({
      ...this.state,
      lapse: str,
    });
  }


  render() {
    const { lapse } = this.state;

    return (
      <div className="columns">
        <div className="column has-text-centered">
          <p className="time__spent">{lapse}</p>
        </div>
      </div>
    );
  }
}
