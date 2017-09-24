import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import employees from './reducers/EmployeesReducer';
import employee from './reducers/EmployeeReducer';

export default createStore(
  combineReducers({ employees, employee }),
  {},
  applyMiddleware( thunk )
);
