import { CHECKINOUT_STATUS, CHECKINOUT_GET_API_REQUEST, CHECKINOUT_GET_API_SUCCESS, CHECKINOUT_GET_API_FAILURE, CHECKIN_POST_API_REQUEST, CHECKIN_POST_API_SUCCESS, CHECKIN_POST_API_FAILURE, CHECKOUT_POST_API_REQUEST, CHECKOUT_POST_API_SUCCESS, CHECKOUT_POST_API_FAILURE, VIEW_REPORTS_API_REQUEST, VIEW_REPORTS_API_SUCCESS, VIEW_REPORTS_API_FAILURE } from './Constants/ActionsTypes';

import * as api from '../../Authentication/Api/Api';


// const checkInOutStatusAction = checkInOutStatus => {
//   return {
//     type: CHECKINOUT_STATUS,
//     payload: checkInOutStatus
//   }
// }
const checkInOutApiRequestAction = checkInOutRequest => {
  return {
    type: CHECKINOUT_GET_API_REQUEST,
    payload: checkInOutRequest
  }
}


const checkInOutApiSuccessAction = checkInOutSuccess => {
  return {
    type: CHECKINOUT_GET_API_SUCCESS,
    payload: checkInOutSuccess
  }
}


const checkInOutApiFailureAction = checkInOutFailure => {
  return {
    type: CHECKINOUT_GET_API_FAILURE,
    payload: checkInOutFailure
  }
}



const checkInApiRequestAction = checkInRequest => {
  return {
    type: CHECKIN_POST_API_REQUEST,
    payload: checkInRequest
  }
}


const checkInApiSuccessAction = checkInSuccess => {
  return {
    type: CHECKIN_POST_API_SUCCESS,
    payload: checkInSuccess
  }
}


const checkInApiFailureAction = checkInFailure => {
  return {
    type: CHECKIN_POST_API_FAILURE,
    payload: checkInFailure
  }
}




const checkOutApiRequestAction = checkOutRequest => {
  return {
    type: CHECKOUT_POST_API_REQUEST,
    payload: checkOutRequest
  }
}


const checkOutApiSuccessAction = checkOutSuccess => {
  return {
    type: CHECKOUT_POST_API_SUCCESS,
    payload: checkOutSuccess
  }
}


const checkOutApiFailureAction = checkOutFailure => {
  return {
    type: CHECKOUT_POST_API_FAILURE,
    payload: checkOutFailure
  }
}




const viewReportsApiRequestAction = viewReportsRequest => {
  return {
    type: VIEW_REPORTS_API_REQUEST,
    payload: viewReportsRequest
  }
}


const viewReportsApiSuccessAction = viewReportsSuccess => {
  return {
    type: VIEW_REPORTS_API_SUCCESS,
    payload: viewReportsSuccess
  }
}


const viewReportsApiFailureAction = viewReportsFailure => {
  return {
    type: VIEW_REPORTS_API_FAILURE,
    payload: viewReportsFailure
  }
}



export const checkInOutApi = () => (dispatch, getState) => {
  const state = getState();
  const accessToken = state.login.accessToken;
  const userId = state.login.userId;
  const dateAtTheTimeOfLogin = state.login.dateAtTheTimeOfLogin;
  const countryCode = state.login.countryCode;

  const options = {
    error: '',
    loaderStatus: true
  }

  const paramObj = {
    userId: userId,
    dateAtTheTimeOfLogin: dateAtTheTimeOfLogin,
    countryCode: countryCode
  }

  dispatch(checkInOutApiRequestAction(options));
  api.checkInOutStatus("GET", paramObj, accessToken).then(res => res.json()).then(res => {
    if(res.statusCode == 200 && res.status == true) {
      if(res.object.checkin_details.checkin_status && !res.object.checkin_details.checkout_status) {
        res.checkInAlready = true;
      } else {
        res.checkInAlready = false;
      }
      // console.log('res ==> ', res);
      dispatch(checkInOutApiSuccessAction(res))

    } else {
      res.loaderStatus = false;
      dispatch(checkInOutApiFailureAction(res))
    }

  }).catch((error) => {
    dispatch(checkInOutApiFailureAction(error))
  })
}
// export const checkInOutStatusApi = () => (dispatch, getState) => {
//   const state = getState();
//   const accessToken = state.login.accessToken;
//   const userId = state.login.userId;
//   const dateAtTheTimeOfLogin = state.login.dateAtTheTimeOfLogin;
//   const countryCode = state.login.countryCode;

//   const paramObj = {
//     userId: userId,
//     dateAtTheTimeOfLogin: dateAtTheTimeOfLogin,
//     countryCode: countryCode
//   }

//   api.checkInOutStatus("GET", paramObj, accessToken).then(res => res.json()).then(res => {
//     if(res.statusCode == 200 && res.status == true) {
//       if(res.object.checkin_details.checkin_status && !res.object.checkin_details.checkout_status) {
//         res.checkInAlready = true;
//       } else {
//         res.checkInAlready = false;
//       }
//       // console.log('res ==> ', res);
//       dispatch(checkInOutStatusAction(res))
//     }
//   })
// }


export const checkInApi = body => (dispatch, getState) => {
  const storeState = getState();
  const accessToken = storeState.login.accessToken;

  dispatch(checkInApiRequestAction());
  api.checkIn("POST", accessToken, body).then(res => res.json()).then(res => {
    if(res.statusCode == 200 && res.status == true) {
      if(res.object.check_in_detail.checkin_status) {
        res.checkInAlready = true;
      } else {
        res.checkInAlready = false;
      }
      dispatch(checkInApiSuccessAction(res))

      dispatch(viewWeeklyReportApi())
    }

  }).catch((error) => {
    dispatch(checkInApiFailureAction(error))
  })
}


export const checkOutApi = body => (dispatch, getState) => {
  const storeState = getState();
  const accessToken = storeState.login.accessToken;

  dispatch(checkOutApiRequestAction());
  api.checkOut("POST", accessToken, body).then(res => res.json()).then(res => {
    if(res.statusCode == 200 && res.status == true) {
      if(res.object.attendance.checkin_status && res.object.attendance.checkout_status) {
        res.checkInAlready = false;
      } else {
        res.checkInAlready = true;
      }
      
      dispatch(checkOutApiSuccessAction(res))

      dispatch(viewWeeklyReportApi())
    }

  }).catch((error) => {
    dispatch(checkOutApiFailureAction(error))
  })
}


export const viewWeeklyReportApi = () => (dispatch, getState) => {
  const state = getState();

  const convertedDate = new Date(new Date(state.login.dateAtTheTimeOfLogin).getTime() - (5*24*60*60*1000));
  const year = new Date(convertedDate).getFullYear();
  let month = new Date(convertedDate).getMonth() + 1;
  month.toString().length <= 1 ? month = '0' + month : month;
  let date = new Date(convertedDate).getDate();
  date.toString().length <= 1 ? date = '0' + date : date;
  const startFullYear = year + '/' + month + '/' + date;

  const accessToken = state.login.accessToken;
  const companyId = state.login.companyId;
  const userId = state.login.userId;
  const startDate = startFullYear;
  const endDate = state.login.dateAtTheTimeOfLogin;
  const group = true;

  const paramObj = {
    company_id: companyId,
    employee_id: userId,
    start_date: startDate,
    end_date: endDate,
    group: group
  }

  dispatch(viewReportsApiRequestAction());
  api.viewReports("GET", paramObj, accessToken).then(res => res.json()).then(res => {
    if(res.statusCode == 200 && res.status == true) {
      // console.log('viewReport ==> ', res);

      let viewReportResponse = {
        // viewReportResponseStatus: '',
        checkInOutReports: []
      }
      
      if(res.object.filter.length < 1) {
        // viewReportResponse.viewReportResponseStatus = true
      } else {
        // viewReportResponse.viewReportResponseStatus = false
        for(let i = 0; i < res.object.filter.length; i++) {
          viewReportResponse.checkInOutReports.push({ id: res.object.filter[i].id.toString(), date: res.object.filter[i].date, checkIn: res.object.filter[i].check_in, checkOut: res.object.filter[i].check_out })
        }
      }
      viewReportResponse.loaderStatus = false;
      dispatch(viewReportsApiSuccessAction(viewReportResponse))

    } else {
      res.loaderStatus = false;
      dispatch(viewReportsApiFailureAction(res))
    }

  }).catch((error) => {
    dispatch(viewReportsApiFailureAction(error))
  })
}
