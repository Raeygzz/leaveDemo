import { createStore, combineReducers, applyMiddleware } from 'redux';

import Thunk from 'redux-thunk';
import Logger from 'redux-logger';

import LoginReducer from './Reducers/LoginReducer';
import checkInOutReducer from './Reducers/CheckInOutReducer';


const rootReducer = combineReducers({
  login: LoginReducer,
  checkInOut: checkInOutReducer
})

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(Thunk, Logger));
}


export default configureStore;
