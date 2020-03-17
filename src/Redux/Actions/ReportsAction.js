import { NET_INFO, LEAVE_TYPE_GET_API_REQUEST, LEAVE_TYPE_GET_API_SUCCESS, LEAVE_TYPE_GET_API_FAILURE, VIEW_TIMELY_ATTENDANCE_REPORTS_GET_API_REQUEST, VIEW_TIMELY_ATTENDANCE_REPORTS_GET_API_SUCCESS, VIEW_TIMELY_ATTENDANCE_REPORTS_GET_API_FAILURE, VIEW_TIMELY_LEAVE_REPORTS_GET_API_REQUEST, VIEW_TIMELY_LEAVE_REPORTS_GET_API_SUCCESS, VIEW_TIMELY_LEAVE_REPORTS_GET_API_FAILURE } from './Constants/ActionsTypes';

import * as api from '../../Authentication/Api/Api';


export const netInfo = netInfo => {
  return {
    type: NET_INFO,
    payload: netInfo
  }
}


const leaveTypeApiRequestAction = leaveTypeRequest => {
  return {
    type: LEAVE_TYPE_GET_API_REQUEST,
    payload: leaveTypeRequest
  }
}


const leaveTypeApiSuccessAction = leaveTypeSuccess => {
  return {
    type: LEAVE_TYPE_GET_API_SUCCESS,
    payload: leaveTypeSuccess
  }
}


const leaveTypeApiFailureAction = leaveTypeFailure => {
  return {
    type: LEAVE_TYPE_GET_API_FAILURE,
    payload: leaveTypeFailure
  }
}


const viewTimelyAttendanceReportsApiRequestAction = viewTimelyAttendanceReportsRequest => {
  return {
    type: VIEW_TIMELY_ATTENDANCE_REPORTS_GET_API_REQUEST,
    payload: viewTimelyAttendanceReportsRequest
  }
}


const viewTimelyAttendanceReportsApiSuccessAction = viewTimelyAttendanceReportsSuccess => {
  return {
    type: VIEW_TIMELY_ATTENDANCE_REPORTS_GET_API_SUCCESS,
    payload: viewTimelyAttendanceReportsSuccess
  }
}


const viewTimelyAttendanceReportsApiFailureAction = viewTimelyAttendanceReportsFailure => {
  return {
    type: VIEW_TIMELY_ATTENDANCE_REPORTS_GET_API_FAILURE,
    payload: viewTimelyAttendanceReportsFailure
  }
}


const viewTimelyLeaveReportsApiRequestAction = viewTimelyLeaveReportsRequest => {
  return {
    type: VIEW_TIMELY_LEAVE_REPORTS_GET_API_REQUEST,
    payload: viewTimelyLeaveReportsRequest
  }
}


const viewTimelyLeaveReportsApiSuccessAction = viewTimelyLeaveReportsSuccess => {
  return {
    type: VIEW_TIMELY_LEAVE_REPORTS_GET_API_SUCCESS,
    payload: viewTimelyLeaveReportsSuccess
  }
}


const viewTimelyLeaveReportsApiFailureAction = viewTimelyLeaveReportsFailure => {
  return {
    type: VIEW_TIMELY_LEAVE_REPORTS_GET_API_FAILURE,
    payload: viewTimelyLeaveReportsFailure
  }
}



export const leaveTypeApi = () => (dispatch, getState) => {
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

  dispatch(leaveTypeApiRequestAction(options));
  api.leaveType("GET", paramObj, accessToken).then(res => res.json()).then(res => {
    if(res.statusCode == 200 && res.status == true) {
      
      let leaveTypeResponse = {
        leaveTypeArr: []
      }
      
      for(let i = 0; i < res.object.leave_types.length; i++) {
        leaveTypeResponse.leaveTypeArr.push({ id: res.object.leave_types[i].id, leaveName: res.object.leave_types[i].name, paidLeave: res.object.leave_types[i].paid, leaveAllocatedDays: res.object.leave_types[i].allocated_days })
      }

      // console.log('leaveType ==> ', leaveTypeResponse);
      dispatch(leaveTypeApiSuccessAction(leaveTypeResponse))

    } else {
      res.activityIndicatorOrOkay = null,
      res.loaderStatus = null,
      res.loaderMessage = ''
      dispatch(leaveTypeApiFailureAction(res))
    }

  }).catch((error) => {
    dispatch(leaveTypeApiFailureAction(error))
  })
}



export const viewTimelyAttendanceReportApi = (date) => (dispatch, getState) => {
  const state = getState();

  const accessToken = state.login.accessToken;
  const companyId = state.login.companyId;
  const userId = state.login.userId;
  const startDate = date;
  const endDate = state.login.dateAtTheTimeOfLogin;
  const group = true;

  const options = {
    error: '',
    activityIndicatorOrOkay: true,
    loaderStatus: true,
    loaderMessage: 'Updating data. Please wait'
  }

  const paramObj = {
    company_id: companyId,
    employee_id: userId,
    start_date: startDate,
    end_date: endDate,
    group: group
  }

  dispatch(viewTimelyAttendanceReportsApiRequestAction(options));
  api.viewTimelyAttendanceReports("GET", paramObj, accessToken).then(res => res.json()).then(res => {
    if(res.statusCode == 200 && res.status == true) {
      
      let viewTimelyAttendanceReportResponse = {
        viewReportLineChart: []
      }
      
      for(let i = 0; i < res.object.filter.length; i++) {
        viewTimelyAttendanceReportResponse.viewReportLineChart.push({ x: res.object.filter[i].date.slice(5, 10), y: Number(res.object.filter[i].check_in.slice(0, 2) + '.' + res.object.filter[i].check_in.slice(3, 5)) })
      }

      if(viewTimelyAttendanceReportResponse.viewReportLineChart.length == 1) {
        viewTimelyAttendanceReportResponse.viewReportLineChart.push({ x: 0, y: 0 });
      }

      viewTimelyAttendanceReportResponse.activityIndicatorOrOkay = null,
      viewTimelyAttendanceReportResponse.loaderStatus = null,
      viewTimelyAttendanceReportResponse.loaderMessage = ''
      // console.log('viewReportLineChart ==> ', viewTimelyAttendanceReportResponse);
      dispatch(viewTimelyAttendanceReportsApiSuccessAction(viewTimelyAttendanceReportResponse))

    } else {
      res.activityIndicatorOrOkay = null,
      res.loaderStatus = null,
      res.loaderMessage = ''
      dispatch(viewTimelyAttendanceReportsApiFailureAction(res))
    }

  }).catch((error) => {
    dispatch(viewTimelyAttendanceReportsApiFailureAction(error))
  })
}
