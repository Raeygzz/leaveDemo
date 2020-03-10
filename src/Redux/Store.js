import { createStore, combineReducers, applyMiddleware } from 'redux';

import Thunk from 'redux-thunk';
import Logger from 'redux-logger';
import { setAuthDetails } from './Middleware/authDetail';
import { setEmployeeDetails } from './Middleware/employeeDetail';
import { renewToken } from './Middleware/renewToken';

import LoginReducer from './Reducers/LoginReducer';
import checkInOutReducer from './Reducers/CheckInOutReducer';
import eventsReducer from './Reducers/eventsReducer';


const rootReducer = combineReducers({
  login: LoginReducer,
  checkInOut: checkInOutReducer,
  events: eventsReducer
})

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(Thunk, Logger, setAuthDetails, setEmployeeDetails));
}


export default configureStore;
