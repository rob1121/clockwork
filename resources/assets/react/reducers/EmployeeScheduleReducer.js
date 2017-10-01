import moment from 'moment';

const employee = (state = {
  user_id: undefined,
  date_start: moment().format('YYYY-MM-DD'),
  date_end: moment().format('YYYY-MM-DD'),
  required_time_in: moment().format('HH:mm:ss'),
  required_time_out: moment().format('HH:mm:ss'),
  location: undefined,
  longitude: undefined,
  latitude: undefined,
  task: undefined,
  description: undefined,
}, action) => {
  switch (action.type) {
    case 'SET_SCHEDULE':
      state = {
        ...action.payload,
      };
      break;
    case 'RESET_SCHEDULE':
      state = {
        user_id: undefined,
        date_start: moment().format('YYYY-MM-DD'),
        date_end: moment().format('YYYY-MM-DD'),
        required_time_in: moment().format('HH:mm:ss'),
        required_time_out: moment().format('HH:mm:ss'),
        location: undefined,
        longitude: undefined,
        latitude: undefined,
        task: undefined,
        description: undefined,
      };
    default:
      break;
  }

  return state;
};

export default employee;
