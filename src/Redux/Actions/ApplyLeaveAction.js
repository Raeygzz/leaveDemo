import { NET_INFO, USERS_HANDLE_LEAVE_CAPABILITIES_GET_API_REQUEST, USERS_HANDLE_LEAVE_CAPABILITIES_GET_API_SUCCESS, USERS_HANDLE_LEAVE_CAPABILITIES_GET_API_FAILURE } from './Constants/ActionsTypes';

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
      
      // let viewTimelyAttendanceReportResponse = {
      //   viewReportLineChart: []
      // }
      
      // if(res.object.filter.length > 7 && res.object.filter.length < 11) {
      //   for(let i = 0; i < res.object.filter.length; i += 2) {
      //     viewTimelyAttendanceReportResponse.viewReportLineChart.push({ x: res.object.filter[i].date.slice(5, 10), y: Number(res.object.filter[i].check_in.slice(0, 2) + '.' + res.object.filter[i].check_in.slice(3, 5)) })
      //   }

      //   viewTimelyAttendanceReportResponse.viewReportLineChart.push({ x: res.object.filter[res.object.filter.length - 1].date.slice(5, 10), y: Number(res.object.filter[res.object.filter.length - 1].check_in.slice(0, 2) + '.' + res.object.filter[res.object.filter.length - 1].check_in.slice(3, 5)) })

      // } else if(res.object.filter.length > 10) {
      //   for(let i = 0; i < res.object.filter.length; i += 3) {
      //     viewTimelyAttendanceReportResponse.viewReportLineChart.push({ x: res.object.filter[i].date.slice(5, 10), y: Number(res.object.filter[i].check_in.slice(0, 2) + '.' + res.object.filter[i].check_in.slice(3, 5)) })
      //   }

      //   viewTimelyAttendanceReportResponse.viewReportLineChart.push({ x: res.object.filter[res.object.filter.length - 1].date.slice(5, 10), y: Number(res.object.filter[res.object.filter.length - 1].check_in.slice(0, 2) + '.' + res.object.filter[res.object.filter.length - 1].check_in.slice(3, 5)) })

      // } else {
      //   for(let i = 0; i < res.object.filter.length; i++) {
      //     viewTimelyAttendanceReportResponse.viewReportLineChart.push({ x: res.object.filter[i].date.slice(5, 10), y: Number(res.object.filter[i].check_in.slice(0, 2) + '.' + res.object.filter[i].check_in.slice(3, 5)) })
      //   }
      // }

      // if(viewTimelyAttendanceReportResponse.viewReportLineChart.length == 1) {
      //   viewTimelyAttendanceReportResponse.viewReportLineChart.push({ x: 0, y: 0 });
      // }

      res.activityIndicatorOrOkay = null,
      res.loaderStatus = null,
      res.loaderMessage = ''

      console.log('res ==> ', res);
      dispatch(usersWithHandleLeaveCapabilitiesApiSuccessAction(res))

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
