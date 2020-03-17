import { NET_INFO, VIEW_TIMELY_REPORTS_GET_API_REQUEST, VIEW_TIMELY_REPORTS_GET_API_SUCCESS, VIEW_TIMELY_REPORTS_GET_API_FAILURE } from '../Actions/Constants/ActionsTypes';


const INITIAL_STATE = {
  viewReportLineChart: '',

  error: '',
  loaderStatus: null,
  activityIndicatorOrOkay: null,
  loaderMessage: ''
}



const ReportsReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case NET_INFO:
      return {
        ...state,
        loaderStatus: action.payload.loaderStatus,
        activityIndicatorOrOkay: action.payload.activityIndicatorOrOkay,
        loaderMessage: action.payload.loaderMessage
      }

    case VIEW_TIMELY_REPORTS_GET_API_REQUEST:
      return {
        ...state,
        error: action.payload.error,
        loaderStatus: action.payload.loaderStatus,
        activityIndicatorOrOkay: action.payload.activityIndicatorOrOkay,
        loaderMessage: action.payload.loaderMessage
      }

    case VIEW_TIMELY_REPORTS_GET_API_SUCCESS:
      return {
        ...state,
        viewReportLineChart: action.payload.viewReportLineChart,
        loaderStatus: action.payload.loaderStatus,
        activityIndicatorOrOkay: action.payload.activityIndicatorOrOkay,
        loaderMessage: action.payload.loaderMessage
      }  

    case VIEW_TIMELY_REPORTS_GET_API_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        loaderStatus: action.payload.loaderStatus,
        activityIndicatorOrOkay: action.payload.activityIndicatorOrOkay,
        loaderMessage: action.payload.loaderMessage
      } 

    default:
      return state;  
  }
}


export default ReportsReducer;
