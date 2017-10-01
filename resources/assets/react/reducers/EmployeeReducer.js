const employee = (state = {},
  action) => {
  switch (action.type) {
    case 'SET_EMPLOYEE':
      state = {
        ...action.payload,
      };
      break;
    default:
      break;
  }

  return state;
};

export default employee;
