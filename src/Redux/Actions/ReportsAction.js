import { NET_INFO, VIEW_TIMELY_REPORTS_GET_API_REQUEST, VIEW_TIMELY_REPORTS_GET_API_SUCCESS, VIEW_TIMELY_REPORTS_GET_API_FAILURE } from './Constants/ActionsTypes';

import * as api from '../../Authentication/Api/Api';


export const netInfo = netInfo => {
  return {
    type: NET_INFO,
    payload: netInfo
  }
}


const viewTimelyReportsApiRequestAction = viewTimelyReportsRequest => {
  return {
    type: VIEW_TIMELY_REPORTS_GET_API_REQUEST,
    payload: viewTimelyReportsRequest
  }
}


const viewTimelyReportsApiSuccessAction = viewTimelyReportsSuccess => {
  return {
    type: VIEW_TIMELY_REPORTS_GET_API_SUCCESS,
    payload: viewTimelyReportsSuccess
  }
}


const viewTimelyReportsApiFailureAction = viewTimelyReportsFailure => {
  return {
    type: VIEW_TIMELY_REPORTS_GET_API_FAILURE,
    payload: viewTimelyReportsFailure
  }
}



export const viewTimelyReportApi = (date) => (dispatch, getState) => {
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

  dispatch(viewTimelyReportsApiRequestAction(options));
  api.viewTimelyReports("GET", paramObj, accessToken).then(res => res.json()).then(res => {
    if(res.statusCode == 200 && res.status == true) {
      
      let viewTimelyReportResponse = {
        viewReportLineChart: []
      }
      
      for(let i = 0; i < res.object.filter.length; i++) {
        viewTimelyReportResponse.viewReportLineChart.push({ x: res.object.filter[i].date.slice(5, 10), y: Number(res.object.filter[i].check_in.slice(0, 2) + '.' + res.object.filter[i].check_in.slice(3, 5)) })
      }

      if(viewTimelyReportResponse.viewReportLineChart.length == 1) {
        viewTimelyReportResponse.viewReportLineChart.push({ x: 0, y: 0 });
      }

      viewTimelyReportResponse.activityIndicatorOrOkay = null,
      viewTimelyReportResponse.loaderStatus = null,
      viewTimelyReportResponse.loaderMessage = ''
      // console.log('viewReportLineChart ==> ', viewTimelyReportResponse);
      dispatch(viewTimelyReportsApiSuccessAction(viewTimelyReportResponse))

    } else {
      res.activityIndicatorOrOkay = null,
      res.loaderStatus = null,
      res.loaderMessage = ''
      dispatch(viewTimelyReportsApiFailureAction(res))
    }

  }).catch((error) => {
    dispatch(viewTimelyReportsApiFailureAction(error))
  })
}
