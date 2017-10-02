import {
  findIndex,
  filter
} from 'lodash';
import axios from 'axios';

export function setEmployeeSchedule(schedule) {
  return dispatch => new Promise((resolve) => {
    dispatch({
      type: 'SET_SCHEDULE',
      payload: schedule,
    });

    resolve();
  });
}

export function resetScheduleModal() {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch({
        type: 'RESET_SCHEDULE',
      });

      resolve();
    });
  }
}

export function deleteSchedule(schedTaskId) {
  return (dispatch, getState) => {
    axios.delete(`/employee-schedule/${schedTaskId}`).then(() => {
      const employee = getState().employee;

      const index = findIndex(employee.schedule_task, ['id', schedTaskId]);
      const hasMatchFound = index >= 0;

      if (hasMatchFound) {
        employee.schedule_task = filter(employee.schedule_task, st => st.id !== schedTaskId);

        dispatch({
          type: 'SET_EMPLOYEE',
          payload: employee,
        });
      }
    });
  };
}