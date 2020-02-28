import { LOGIN, LOGIN_POST_API_REQUEST, LOGIN_POST_API_SUCCESS, LOGIN_POST_API_FAILURE, EMPLOYEE_DETAIL_GET_API_REQUEST, EMPLOYEE_DETAIL_GET_API_SUCCESS, EMPLOYEE_DETAIL_GET_API_FAILURE } from './Constants/ActionsTypes';

import * as api from '../../Authentication/Api/Api';

// import * as Keychain from 'react-native-keychain';

// import { CommonActions } from '@react-navigation/native';


export const LoginAction = login => {
  return {
    type: LOGIN,
    payload: login
  }
}

// export const loginApiRequestAction = loginRequest => {
//   return {
//     type: LOGIN_POST_API_REQUEST,
//     payload: loginRequest
//   }
// }

// export const loginApiSuccessAction = loginSuccess => {
//   return {
//     type: LOGIN_POST_API_SUCCESS,
//     payload: loginSuccess
//   }
// }

// export const loginApiFailureAction = loginFailure => {
//   return {
//     type: LOGIN_POST_API_FAILURE,
//     payload: loginFailure
//   }
// }



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



// export const loginApi = body => (dispatch, getState) => {
//   dispatch(loginApiRequestAction());
//   api.login("POST", body).then(res => res.json()).then(res => {
//     if(res.statusCode == 200 || res.status == true) {
//       const year = new Date().getFullYear();
//       let month = new Date().getMonth() + 1;
//       month.toString().length <= 1 ? month = '0' + month : month;
//       let date = new Date().getDate();
//       date.toString().length <= 1 ? date = '0' + date : date;
//       const fullYear = year + '/' + month + '/' + date;
//       res.dateAtTheTimeOfLogin = fullYear;
//       res.countryCode = "NP";
//       res.loginApiSuccessStatus = true;

//       dispatch(loginApiSuccessAction(res))

//       // this.props.navigation.navigate('Main', { screen: 'Dashboard' });
//     } else {
//       res.loginApiSuccessStatus = false;
//     }

//   }).catch((error) => {
//     dispatch(loginApiFailureAction(error))
//   })
// }



export const employeeDetailApi = () => (dispatch, getState) => {
  const state = getState();
  const accessToken = state.login.accessToken;
  const employeeId = state.login.userId;

  const paramObj = {
    employeeId: employeeId
  }

  dispatch(employeeDetailApiRequestAction());
  api.employeeDetail("GET", paramObj, accessToken).then(res => res.json()).then(res => {
    if(res.statusCode == 200 && res.status == true) {
      // console.log('employeeDetail ==> ', res);
      dispatch(employeeDetailApiSuccessAction(res))
    }

  }).catch((error) => {
    dispatch(employeeDetailApiFailureAction(error))
  })
}
