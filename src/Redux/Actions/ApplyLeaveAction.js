import { NET_INFO, USERS_HANDLE_LEAVE_CAPABILITIES_GET_API_REQUEST, USERS_HANDLE_LEAVE_CAPABILITIES_GET_API_SUCCESS, USERS_HANDLE_LEAVE_CAPABILITIES_GET_API_FAILURE, EMPLOYEE_LEAVE_TYPE_GET_API_REQUEST, EMPLOYEE_LEAVE_TYPE_GET_API_SUCCESS, EMPLOYEE_LEAVE_TYPE_GET_API_FAILURE, EMPLOYEE_LEAVE_REPORTS_GET_API_REQUEST, EMPLOYEE_LEAVE_REPORTS_GET_API_SUCCESS, EMPLOYEE_LEAVE_REPORTS_GET_API_FAILURE, APPLY_LEAVE_POST_API_REQUEST, APPLY_LEAVE_POST_API_SUCCESS, APPLY_LEAVE_POST_API_FAILURE } from './Constants/ActionsTypes';

import * as api from '../../Authentication/Api/Api';


export const netInfo = netInfo => {
  return {
    type: NET_INFO,
    payload: netInfo
  }
}


const usersWithHandleLeaveCapabilitiesApiRequestAction = usersWithHandleLeaveCapabilitiesRequest => {
  return {
    type: USERS_HANDLE_LEAVE_CAPABILITIES_GET_API_REQUEST,
    payload: usersWithHandleLeaveCapabilitiesRequest
  }
}


const usersWithHandleLeaveCapabilitiesApiSuccessAction = usersWithHandleLeaveCapabilitiesSuccess => {
  return {
    type: USERS_HANDLE_LEAVE_CAPABILITIES_GET_API_SUCCESS,
    payload: usersWithHandleLeaveCapabilitiesSuccess
  }
}


const usersWithHandleLeaveCapabilitiesApiFailureAction = usersWithHandleLeaveCapabilitiesFailure => {
  return {
    type: USERS_HANDLE_LEAVE_CAPABILITIES_GET_API_FAILURE,
    payload: usersWithHandleLeaveCapabilitiesFailure
  }
}


const employeeLeaveTypeApiRequestAction = employeeLeaveTypeRequest => {
  return {
    type: EMPLOYEE_LEAVE_TYPE_GET_API_REQUEST,
    payload: employeeLeaveTypeRequest
  }
}


const employeeLeaveTypeApiSuccessAction = employeeLeaveTypeSuccess => {
  return {
    type: EMPLOYEE_LEAVE_TYPE_GET_API_SUCCESS,
    payload: employeeLeaveTypeSuccess
  }
}


const employeeLeaveTypeApiFailureAction = employeeLeaveTypeFailure => {
  return {
    type: EMPLOYEE_LEAVE_TYPE_GET_API_FAILURE,
    payload: employeeLeaveTypeFailure
  }
}


const leaveReportsApiRequestAction = leaveReportsRequest => {
  return {
    type: EMPLOYEE_LEAVE_REPORTS_GET_API_REQUEST,
    payload: leaveReportsRequest
  }
}


const leaveReportsApiSuccessAction = leaveReportsSuccess => {
  return {
    type: EMPLOYEE_LEAVE_REPORTS_GET_API_SUCCESS,
    payload: leaveReportsSuccess
  }
}


const leaveReportsApiFailureAction = leaveReportsFailure => {
  return {
    type: EMPLOYEE_LEAVE_REPORTS_GET_API_FAILURE,
    payload: leaveReportsFailure
  }
}


const applyLeaveApiRequestAction = applyLeaveRequest => {
  return {
    type: APPLY_LEAVE_POST_API_REQUEST,
    payload: applyLeaveRequest
  }
}


const applyLeaveApiSuccessAction = applyLeaveSuccess => {
  return {
    type: APPLY_LEAVE_POST_API_SUCCESS,
    payload: applyLeaveSuccess
  }
}


const applyLeaveApiFailureAction = applyLeaveFailure => {
  return {
    type: APPLY_LEAVE_POST_API_FAILURE,
    payload: applyLeaveFailure
  }
}



export const usersWithHandleLeaveCapabilitiesApi = () => (dispatch, getState) => {
  const state = getState();

  const accessToken = state.login.accessToken;
  const companyId = state.login.companyId;

  const options = {
    error: '',
    activityIndicatorOrOkay: true,
    loaderStatus: true,
    loaderMessage: 'Updating data. Please wait'
  }

  const paramObj = {
    company_id: companyId
  }

  dispatch(usersWithHandleLeaveCapabilitiesApiRequestAction(options));
  api.usersWithHandleLeaveCapabilities("GET", paramObj, accessToken).then(res => res.json()).then(res => {
    if(res.statusCode == 200 && res.status == true) {
      
      let usersWithHandleLeaveAuthorities = [];
    
      for(let i = 0; i < res.object.users.length; i++) {
        usersWithHandleLeaveAuthorities.push({ authorityId: res.object.users[i].id, fullName: res.object.users[i].first_name + ' ' + res.object.users[i].last_name })
      }

      // console.log('usersWithHandleLeaveAuthorities ==> ', usersWithHandleLeaveAuthorities);
      dispatch(usersWithHandleLeaveCapabilitiesApiSuccessAction(usersWithHandleLeaveAuthorities))

    } else {
      res.activityIndicatorOrOkay = null,
      res.loaderStatus = null,
      res.loaderMessage = ''
      dispatch(usersWithHandleLeaveCapabilitiesApiFailureAction(res))
    }

  }).catch((error) => {
    dispatch(usersWithHandleLeaveCapabilitiesApiFailureAction(error))
  })
}



export const employeeLeaveTypeApi = () => (dispatch, getState) => {
  const state = getState();

  const accessToken = state.login.accessToken;
  const companyId = state.login.companyId;

  const paramObj = {
    company_id: companyId
  }

  dispatch(employeeLeaveTypeApiRequestAction());
  api.employeeLeaveType("GET", paramObj, accessToken).then(res => res.json()).then(res => {
    if(res.statusCode == 200 && res.status == true) {
      
      let employeeLeaveTypeResponse = {
        employeeLeaveTypeArr: []
      }
      
      for(let i = 0; i < res.object.leave_types.length; i++) {
        employeeLeaveTypeResponse.employeeLeaveTypeArr.push({ id: res.object.leave_types[i].id, leaveName: res.object.leave_types[i].name, paidLeave: res.object.leave_types[i].paid, leaveAllocatedDays: res.object.leave_types[i].allocated_days, remainingLeaveAllocatedDays: '' })
      }

      // console.log('employeeLeaveTypeResponse ==> ', employeeLeaveTypeResponse);
      dispatch(employeeLeaveTypeApiSuccessAction(employeeLeaveTypeResponse))

      dispatch(leaveReportApi());

    } else {
      res.activityIndicatorOrOkay = null,
      res.loaderStatus = null,
      res.loaderMessage = ''
      dispatch(employeeLeaveTypeApiFailureAction(res))
    }

  }).catch((error) => {
    dispatch(employeeLeaveTypeApiFailureAction(error))
  })
}



export const leaveReportApi = () => (dispatch, getState) => {
  const state = getState();

  const accessToken = state.login.accessToken;
  const companyId = state.login.companyId;
  const userId = state.login.userId;

  const leaveReportsArr = state.applyLeave.employeeLeaveTypeArr;

  const paramObj = {
    company_id: companyId,
    employee_id: userId,
  }

  dispatch(leaveReportsApiRequestAction());
  api.leaveReports("GET", paramObj, accessToken).then(res => res.json()).then(res => {
    if(res.statusCode == 200 && res.status == true) {
      
      const leaveReport = [];
      const leaveReportResponse = {
        employeeLeaveReportsArr: leaveReportsArr
      }
      
      for(let i = 0; i < res.object.sum.length; i++) {
        leaveReport.push({ id: res.object.sum[i].type_id, sum: res.object.sum[i].sum })
      }
      
      for(let k = 0; k < leaveReportResponse.employeeLeaveReportsArr.length; k++) {
        for(let l = 0; l < leaveReport.length; l++) {
          if(leaveReportResponse.employeeLeaveReportsArr[k].id === leaveReport[l].id) {
            leaveReportResponse.employeeLeaveReportsArr[k].remainingLeaveAllocatedDays = leaveReportResponse.employeeLeaveReportsArr[k].leaveAllocatedDays - Number(leaveReport[l].sum);
          }
        }
      }

      if(leaveReportResponse.employeeLeaveReportsArr.length > 0) {
        leaveReportResponse.employeeLeaveReportsArr.unshift({ id: -1, leaveName: "Select", paidLeave: -1, leaveAllocatedDays: -1, remainingLeaveAllocatedDays: '' })
      }

      leaveReportResponse.activityIndicatorOrOkay = null;
      leaveReportResponse.loaderStatus = null;
      leaveReportResponse.loaderMessage = '';
      // console.log('leaveReportResponse ==> ', leaveReportResponse);
      dispatch(leaveReportsApiSuccessAction(leaveReportResponse))

    } else {
      res.activityIndicatorOrOkay = null,
      res.loaderStatus = null,
      res.loaderMessage = ''
      dispatch(leaveReportsApiFailureAction(res))
    }

  }).catch((error) => {
    dispatch(leaveReportsApiFailureAction(error))
  })
}



export const applyLeaveApi = (obj) => (dispatch, getState) => {
  const state = getState();

  const accessToken = state.login.accessToken;
  const companyId = state.login.companyId;
  const userId = state.login.userId;

  const options = {
    error: '',
    activityIndicatorOrOkay: true,
    loaderStatus: true,
    loaderMessage: 'Updating data. Please wait'
  }

  const body = JSON.stringify({
    company_id: companyId,
    user_id: userId,
    start_date: obj.startDate,
    end_date: obj.endDate,
    assigned_to: obj.assignedTo,
    is_half_day: obj.isHalfDay,
    half: obj.halfDay,
    type_id: obj.typeId,
    reason: obj.reason
  })

  dispatch(applyLeaveApiRequestAction(options));
  api.applyLeave("POST", accessToken, body).then(res => res.json()).then(res => {
    if(res.statusCode == 200 && res.status == true) {

      res.activityIndicatorOrOkay = null;
      res.loaderStatus = null;
      res.loaderMessage = '';
      // console.log('res ==> ', res);
      dispatch(applyLeaveApiSuccessAction(res))
         
      setTimeout(() => {
        res.activityIndicatorOrOkay = false;
        res.loaderStatus = true;
        res.loaderMessage = 'Apply Leave Successful!';
        dispatch(applyLeaveApiSuccessAction(res))
      }, 500)

    } else {
      res.activityIndicatorOrOkay = null;
      res.loaderStatus = null;
      res.loaderMessage = '';
      dispatch(applyLeaveApiFailureAction(res))
    }

  }).catch((error) => {
    dispatch(applyLeaveApiFailureAction(error))
  })
}
