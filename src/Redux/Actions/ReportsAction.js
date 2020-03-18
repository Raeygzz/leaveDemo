import { NET_INFO, LEAVE_TYPE_GET_API_REQUEST, LEAVE_TYPE_GET_API_SUCCESS, LEAVE_TYPE_GET_API_FAILURE, VIEW_TIMELY_ATTENDANCE_REPORTS_GET_API_REQUEST, VIEW_TIMELY_ATTENDANCE_REPORTS_GET_API_SUCCESS, VIEW_TIMELY_ATTENDANCE_REPORTS_GET_API_FAILURE, LEAVE_REPORTS_GET_API_REQUEST, LEAVE_REPORTS_GET_API_SUCCESS, LEAVE_REPORTS_GET_API_FAILURE } from './Constants/ActionsTypes';

import * as api from '../../Authentication/Api/Api';

import { Color } from '../../Helper/Constants/Constant';


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


const leaveReportsApiRequestAction = leaveReportsRequest => {
  return {
    type: LEAVE_REPORTS_GET_API_REQUEST,
    payload: leaveReportsRequest
  }
}


const leaveReportsApiSuccessAction = leaveReportsSuccess => {
  return {
    type: LEAVE_REPORTS_GET_API_SUCCESS,
    payload: leaveReportsSuccess
  }
}


const leaveReportsApiFailureAction = leaveReportsFailure => {
  return {
    type: LEAVE_REPORTS_GET_API_FAILURE,
    payload: leaveReportsFailure
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
        leaveTypeResponse.leaveTypeArr.push({ id: res.object.leave_types[i].id, color: Color[i], leaveName: res.object.leave_types[i].name, paidLeave: res.object.leave_types[i].paid, leaveAllocatedDays: res.object.leave_types[i].allocated_days, remainingLeaveAllocatedDays: '' })
      }

      // console.log('leaveType ==> ', leaveTypeResponse);
      dispatch(leaveTypeApiSuccessAction(leaveTypeResponse))

      dispatch(leaveReportApi());

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
      
      if(res.object.filter.length > 7 && res.object.filter.length < 11) {
        for(let i = 0; i < res.object.filter.length; i += 2) {
          viewTimelyAttendanceReportResponse.viewReportLineChart.push({ x: res.object.filter[i].date.slice(5, 10), y: Number(res.object.filter[i].check_in.slice(0, 2) + '.' + res.object.filter[i].check_in.slice(3, 5)) })
        }

        viewTimelyAttendanceReportResponse.viewReportLineChart.push({ x: res.object.filter[res.object.filter.length - 1].date.slice(5, 10), y: Number(res.object.filter[res.object.filter.length - 1].check_in.slice(0, 2) + '.' + res.object.filter[res.object.filter.length - 1].check_in.slice(3, 5)) })

      } else if(res.object.filter.length > 10) {
        for(let i = 0; i < res.object.filter.length; i += 3) {
          viewTimelyAttendanceReportResponse.viewReportLineChart.push({ x: res.object.filter[i].date.slice(5, 10), y: Number(res.object.filter[i].check_in.slice(0, 2) + '.' + res.object.filter[i].check_in.slice(3, 5)) })
        }

        viewTimelyAttendanceReportResponse.viewReportLineChart.push({ x: res.object.filter[res.object.filter.length - 1].date.slice(5, 10), y: Number(res.object.filter[res.object.filter.length - 1].check_in.slice(0, 2) + '.' + res.object.filter[res.object.filter.length - 1].check_in.slice(3, 5)) })

      } else {
        for(let i = 0; i < res.object.filter.length; i++) {
          viewTimelyAttendanceReportResponse.viewReportLineChart.push({ x: res.object.filter[i].date.slice(5, 10), y: Number(res.object.filter[i].check_in.slice(0, 2) + '.' + res.object.filter[i].check_in.slice(3, 5)) })
        }
      }

      if(viewTimelyAttendanceReportResponse.viewReportLineChart.length == 1) {
        viewTimelyAttendanceReportResponse.viewReportLineChart.push({ x: 0, y: 0 });
      }

      setTimeout(() => {
        viewTimelyAttendanceReportResponse.activityIndicatorOrOkay = null,
        viewTimelyAttendanceReportResponse.loaderStatus = null,
        viewTimelyAttendanceReportResponse.loaderMessage = ''

        // console.log('viewReportLineChart ==> ', viewTimelyAttendanceReportResponse);
        dispatch(viewTimelyAttendanceReportsApiSuccessAction(viewTimelyAttendanceReportResponse))
      }, 500);

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



export const leaveReportApi = () => (dispatch, getState) => {
  const state = getState();

  const accessToken = state.login.accessToken;
  const companyId = state.login.companyId;
  const userId = state.login.userId;

  const leaveReportsArr = state.reports.leaveTypeArr;

  const paramObj = {
    company_id: companyId,
    employee_id: userId,
  }

  dispatch(leaveReportsApiRequestAction());
  api.leaveReports("GET", paramObj, accessToken).then(res => res.json()).then(res => {
    if(res.statusCode == 200 && res.status == true) {
      
      const leaveReport = [];
      const leaveReportResponse = {
        leaveReportBarChart: []
      }
      
      for(let i = 0; i < res.object.sum.length; i++) {
        leaveReport.push({ id: res.object.sum[i].type_id, sum: res.object.sum[i].sum })
      }
      
      for(let k = 0; k < leaveReportsArr.length; k++) {
        for(let l = 0; l < leaveReport.length ; l++) {
          if(leaveReportsArr[k].id === leaveReport[l].id) {
            leaveReportsArr[k].remainingLeaveAllocatedDays = leaveReportsArr[k].leaveAllocatedDays - Number(leaveReport[l].sum);
          }
        }
      }

      for(let j = 0; j < leaveReportsArr.length; j++) {
        leaveReportResponse.leaveReportBarChart.push({ 
          leaveName: leaveReportsArr[j].leaveName == 'Annual Paid' ? 'Paid' : leaveReportsArr[j].leaveName == 'Annual Unpaid' ? 'Unpaid' : leaveReportsArr[j].leaveName == 'Annual Sick' ? 'Sick' : leaveReportsArr[j].leaveName == 'Marriage Leave' ? 'Marriage' : leaveReportsArr[j].leaveName == 'Mourning Leave' ? 'Mourning' : null, 
          allocatedDays: leaveReportsArr[j].remainingLeaveAllocatedDays != '' ? leaveReportsArr[j].remainingLeaveAllocatedDays : leaveReportsArr[j].leaveAllocatedDays
        })
      }
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
