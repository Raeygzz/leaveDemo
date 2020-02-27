import { LOGIN, EMPLOYEE_DETAIL_GET_API_REQUEST, EMPLOYEE_DETAIL_GET_API_SUCCESS, EMPLOYEE_DETAIL_GET_API_FAILURE } from './Constants/ActionsTypes';

import * as api from '../../Authentication/Api/Api';


export const LoginAction = login => {
  return {
    type: LOGIN,
    payload: login
  }
}




export const employeeDetailApiRequestAction = employeeDetailRequest => {
  return {
    type: EMPLOYEE_DETAIL_GET_API_REQUEST,
    payload: employeeDetailRequest
  }
}

export const employeeDetailApiSuccessAction = employeeDetailSuccess => {
  return {
    type: EMPLOYEE_DETAIL_GET_API_SUCCESS,
    payload: employeeDetailSuccess
  }
}

export const employeeDetailApiFailureAction = employeeDetailFailure => {
  return {
    type: EMPLOYEE_DETAIL_GET_API_FAILURE,
    payload: employeeDetailFailure
  }
}


export const employeeDetailApi = () => (dispatch, getState) => {
  const state = getState();
  const accessToken = state.login.accessToken;
  const employeeId = state.login.userId;

  const paramObj = {
    employeeId: employeeId
  }

  dispatch(employeeDetailApiRequestAction());
  api.employeeDetail("GET", paramObj, accessToken).then(res => res.json()).then(res => {
    if(res.statusCode == 200 || status == true) {
      // console.log('employeeDetail ==> ', res);
      dispatch(employeeDetailApiSuccessAction(res))
    }

  }).catch((error) => {
    dispatch(employeeDetailApiFailureAction(error))
  })
}
