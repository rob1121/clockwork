export function setEmployeeSchedule(schedule) {
  console.log(schedule);
  return dispatch => new Promise((resolve) => {
    dispatch({
      type: 'SET_SCHEDULE',
      ...schedule,
    });

    resolve();
  });
}
