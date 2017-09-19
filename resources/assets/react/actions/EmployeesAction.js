export function getEmployees(employees) {
  return {
    type: 'SET_EMPLOYEES',
    payload: employees,
  };
};
