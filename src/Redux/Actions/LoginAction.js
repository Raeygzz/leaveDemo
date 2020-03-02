import { LOGIN_POST_API_REQUEST, LOGIN_POST_API_SUCCESS, LOGIN_POST_API_FAILURE, EMPLOYEE_DETAIL_GET_API_REQUEST, EMPLOYEE_DETAIL_GET_API_SUCCESS, EMPLOYEE_DETAIL_GET_API_FAILURE } from './Constants/ActionsTypes';

import * as api from '../../Authentication/Api/Api';

import * as Keychain from 'react-native-keychain';

import * as RootNavigation from '../../Routes/RootNavigation';


export const loginApiRequestAction = loginRequest => {
  return {
    type: LOGIN_POST_API_REQUEST,
    payload: loginRequest
  }
}

export const loginApiSuccessAction = loginSuccess => {
  return {
    type: LOGIN_POST_API_SUCCESS,
    payload: loginSuccess
  }
}

export const loginApiFailureAction = loginFailure => {
  return {
    type: LOGIN_POST_API_FAILURE,
    payload: loginFailure
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



export const loginApi = body => (dispatch, getState) => {
  const options = {
    error: '',
    loaderStatus: true
  }

  dispatch(loginApiRequestAction(options));
  api.login("POST", body).then(res => res.json()).then(res => {
    if(res.statusCode == 200 && res.status == true) {
      const year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      month.toString().length <= 1 ? month = '0' + month : month;
      let date = new Date().getDate();
      date.toString().length <= 1 ? date = '0' + date : date;
      const fullYear = year + '/' + month + '/' + date;
      res.dateAtTheTimeOfLogin = fullYear;
      res.countryCode = "NP";

      dispatch(loginApiSuccessAction(res))

      Keychain.setGenericPassword(JSON.parse(body).email, JSON.parse(body).password);

      dispatch(employeeDetailApi());
      
      RootNavigation.navigate('Main', { screen: 'Dashboard' });

    } else {
      res.loaderStatus = false;
      dispatch(loginApiFailureAction(res))
    }

  }).catch((error) => {
    dispatch(loginApiFailureAction(error))
  })
}


export const employeeDetailApi = () => (dispatch, getState) => {
  const state = getState();
  const accessToken = state.login.accessToken;
  const employeeId = state.login.userId;

  // Method & headers send through action                // feb-28
  // const options = {
  //   method: "GET",
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`,
  //   }
  // }

  const paramObj = {
    employeeId: employeeId
  }

  // dispatch(employeeDetailApiRequestAction(options));                              // Method & headers send through action          // feb-28
  // api.employeeDetail(options, paramObj).then(res => res.json()).then(res => {           // Method & headers send through action    // feb-28
  dispatch(employeeDetailApiRequestAction());
  api.employeeDetail("GET", paramObj, accessToken).then(res => res.json()).then(res => {
    if(res.statusCode == 200 && res.status == true) {
      res.loaderStatus = false;
      // console.log('employeeDetail ==> ', res);
      dispatch(employeeDetailApiSuccessAction(res))
    } else {
      res.loaderStatus = false;
    }

  }).catch((error) => {
    dispatch(employeeDetailApiFailureAction(error))
  })
}
