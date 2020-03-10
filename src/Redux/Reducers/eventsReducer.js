import { NET_INFO, EVENTS_GET_API_REQUEST, EVENTS_GET_API_SUCCESS, EVENTS_GET_API_FAILURE } from '../Actions/Constants/ActionsTypes';


const INITIAL_STATE = {
  events: [],
  
  error: '',
  loaderStatus: null,
  activityIndicatorOrOkay: null,
  loaderMessage: ''
}



const eventsReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case NET_INFO:
      return {
        ...state,
        loaderStatus: action.payload.loaderStatus,
        activityIndicatorOrOkay: action.payload.activityIndicatorOrOkay,
        loaderMessage: action.payload.loaderMessage
      }
    
      
    case EVENTS_GET_API_REQUEST:
      return {
        ...state,
        error: action.payload.error,
        loaderStatus: action.payload.loaderStatus,
        activityIndicatorOrOkay: action.payload.activityIndicatorOrOkay,
        loaderMessage: action.payload.loaderMessage
      }

    case EVENTS_GET_API_SUCCESS:
      return {
        ...state,
        events: action.payload.eventsDetail,
        loaderStatus: action.payload.loaderStatus,
        activityIndicatorOrOkay: action.payload.activityIndicatorOrOkay,
        loaderMessage: action.payload.loaderMessage
      }  

    case EVENTS_GET_API_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loaderStatus: action.payload.loaderStatus,
        activityIndicatorOrOkay: action.payload.activityIndicatorOrOkay,
        loaderMessage: action.payload.loaderMessage
      }

    default:
      return state;  
  }
}


export default eventsReducer;
