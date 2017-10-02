export function setEmployeeSchedule(schedule) {
  return dispatch => new Promise((resolve) => {
    dispatch({
      type: 'SET_SCHEDULE',
      ...schedule,
    });

    resolve();
  });
}