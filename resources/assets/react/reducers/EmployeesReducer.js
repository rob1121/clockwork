const employees = (state = [], action) => {
    switch(action.type) {
    case 'SET_EMPLOYEES':
        state = {
        ...action.payload,
        };
    break;
    default:
    break;
    }

    return state;
};

export default employees;
