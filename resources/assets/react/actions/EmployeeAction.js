export function setEmployee(employee) {
  return (dispatch) => {
    dispatch({
      type: 'SET_EMPLOYEE',
      payload: employee,
    });
    return Promise.resolve();
  };
}

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

export function saveEmployeeToDb() {
  return (dispatch, getState) => {
    const employee = getState().employee;
    axios.put(`/employee-schedule/${employee.id}`, {
      ...employee,
    }).then(({ data }) => {
      console.log(data);
    });
  };
}
