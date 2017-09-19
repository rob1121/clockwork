import { createStore, combineReducers, applyMiddleware } from 'redux';
import employees from './reducers/EmployeesReducer';

export default createStore(
  combineReducers({ employees }),
  {},
  applyMiddleware(),
);
