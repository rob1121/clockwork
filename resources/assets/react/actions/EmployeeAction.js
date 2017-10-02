import axios from 'axios';
import {
  findIndex
} from 'lodash';
/**
 * set employee
 * 
 * @export
 * @param {any} employee 
 * @returns 
 */
export function setEmployee(employee) {
  return (dispatch) => {
    dispatch({
      type: 'SET_EMPLOYEE',
      payload: employee,
    });
    return Promise.resolve();
  };
}

/**
 * update meployee
 * 
 * @export
 * @param {any} key 
 * @param {any} val 
 * @returns 
 */
export function updateEmployee(key, val) {
  return (dispatch, getState) => {
    const employee = getState().employee;
    employee[key] = val;
    dispatch({
      type: 'SET_EMPLOYEE',
      payload: employee,
    });

    return Promise.resolve();
  };
}

/**
 * update employee from database
 * 
 * @export
 * @returns 
 */
export function saveEmployeeToDb() {
  return (dispatch, getState) => {
    const employee = getState().employee;
    return new Promise((resolve, reject) => {
      axios.put(`/employee-schedule/${employee.id}`, {
          ...employee,
        })
        .then(() => resolve())
        .catch(error => reject(error.response.data));
    });
  };
}

export function saveEmployeeSchedule({
  start,
  end,
  timein,
  timeout,
  task,
  description,
  map,
  sched_id
}) {
  return (dispatch, getState) => {
    const employee = getState().employee;
    return new Promise((resolve, reject) => {
      axios.put(`/employee-schedule/${employee.id}`, {
          ...employee,
          scheduleTask: {
            sched_id,
            date_start: start.format('YYYY-MM-DD'),
            date_end: end.format('YYYY-MM-DD'),
            required_time_in: timein.format('HH:mm:ss'),
            required_time_out: timeout.format('HH:mm:ss'),
            location: map.location,
            lng: map.lng,
            lat: map.lat,
            task,
            description,
          },
        }).then(({
          data,
        }) => resolve(data))
        .catch(error => reject(error.response.data));
    });
  };
}

/**
 * save employee schedule
 * 
 * @export
 */
export function updateSchedule(newSchedule) {
  return (dispatch, getState) => {
    const employee = getState().employee;
    const index = findIndex(employee.schedule_task, ['id', newSchedule.id]);
    const noMatchFound = index < 0;

    if (noMatchFound) {
      employee.schedule_task = [...employee.schedule_task, newSchedule];
    } else {
      employee.schedule_task[index] = newSchedule;
    }

    dispatch({
      type: 'SET_EMPLOYEE',
      payload: employee,
    });

    return Promise.resolve();
  };
}