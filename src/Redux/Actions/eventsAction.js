import { NET_INFO, EVENTS_GET_API_REQUEST, EVENTS_GET_API_SUCCESS, EVENTS_GET_API_FAILURE, EVENT_DETAIL_GET_API_REQUEST, EVENT_DETAIL_GET_API_SUCCESS, EVENT_DETAIL_GET_API_FAILURE } from './Constants/ActionsTypes';

import * as api from '../../Authentication/Api/Api';


export const netInfo = netInfo => {
  return {
    type: NET_INFO,
    payload: netInfo
  }
}


const eventsApiRequestAction = eventsRequest => {
  return {
    type: EVENTS_GET_API_REQUEST,
    payload: eventsRequest
  }
}


const eventsApiSuccessAction = eventsSuccess => {
  return {
    type: EVENTS_GET_API_SUCCESS,
    payload: eventsSuccess
  }
}


const eventsApiFailureAction = eventsFailure => {
  return {
    type: EVENTS_GET_API_FAILURE,
    payload: eventsFailure
  }
}



const eventDetailApiRequestAction = eventDetailRequest => {
  return {
    type: EVENT_DETAIL_GET_API_REQUEST,
    payload: eventDetailRequest
  }
}


const eventDetailApiSuccessAction = eventDetailSuccess => {
  return {
    type: EVENT_DETAIL_GET_API_SUCCESS,
    payload: eventDetailSuccess
  }
}


const eventDetailApiFailureAction = eventDetailFailure => {
  return {
    type: EVENT_DETAIL_GET_API_FAILURE,
    payload: eventDetailFailure
  }
}



export const eventsApi = () => (dispatch, getState) => {
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
  const startDate = startFullYear;
  const endDate = state.login.dateAtTheTimeOfLogin;
  const limit = 10;

  const options = {
    error: '',
    activityIndicatorOrOkay: true,
    loaderStatus: true,
    loaderMessage: 'Updating data. Please wait'
  }

  const paramObj = {
    // company_id: companyId,
    company_id: 1,                            // only for certain time being 
    start_date: startDate,
    end_date: endDate,
    limit: limit
  }

  dispatch(eventsApiRequestAction(options));
  api.events("GET", paramObj, accessToken).then(res => res.json()).then(res => {
    if(res.statusCode == 200 && res.status == true) {
      
      let eventsResponse = {
        eventsDetail: []
      }
      
      for(let i = 0; i < res.object.events.length; i++) {
        eventsResponse.eventsDetail.push({ 
          id: res.object.events[i].id.toString(),
          companyId: res.object.events[i].company_id,
          title: res.object.events[i].title, 
          type: res.object.events[i].type, 
          startDate: res.object.events[i].start_date,
        })
      }
      
      eventsResponse.activityIndicatorOrOkay = null;
      eventsResponse.loaderStatus = null;
      eventsResponse.loaderMessage = '';

      // console.log('events ==> ', eventsResponse);
      dispatch(eventsApiSuccessAction(eventsResponse))

    } else {
      res.activityIndicatorOrOkay = null,
      res.loaderStatus = null,
      res.loaderMessage = ''
      dispatch(eventsApiFailureAction(res))
    }

  }).catch((error) => {
    dispatch(eventsApiFailureAction(error))
  })
}



export const eventDetailApi = (eventId) => (dispatch, getState) => {
  const state = getState();
  const accessToken = state.login.accessToken;

  const options = {
    error: '',
    activityIndicatorOrOkay: true,
    loaderStatus: true,
    loaderMessage: 'Updating data. Please wait'
  }

  const paramObj = {
    eventId: eventId
  }

  dispatch(eventDetailApiRequestAction(options));
  api.eventDetail("GET", paramObj, accessToken).then(res => res.json()).then(res => {
    if(res.statusCode == 200 && res.status == true) {

      let eventDetailResponse = {
        eventDetail: []
      }
      
      eventDetailResponse.eventDetail.push({ 
        id: res.object.data.id.toString(),
        companyId: res.object.data.company_id,
        title: res.object.data.title, 
        type: res.object.data.type, 
        startDate: res.object.data.start_date,
        endDate: res.object.data.end_date,
        detail: res.object.data.detail,
        image: res.object.data.event_image
      })

      eventDetailResponse.activityIndicatorOrOkay = null;
      eventDetailResponse.loaderStatus = null;
      eventDetailResponse.loaderMessage = '';

      // console.log('eventDetail ==> ', eventDetailResponse);
      dispatch(eventDetailApiSuccessAction(eventDetailResponse))

    } else {
      res.activityIndicatorOrOkay = null,
      res.loaderStatus = null,
      res.loaderMessage = ''
      dispatch(eventDetailApiFailureAction(res))
    }

  }).catch((error) => {
    dispatch(eventDetailApiFailureAction(error))
  })
}
