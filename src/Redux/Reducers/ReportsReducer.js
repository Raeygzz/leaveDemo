import { NET_INFO, LEAVE_TYPE_GET_API_REQUEST, LEAVE_TYPE_GET_API_SUCCESS, LEAVE_TYPE_GET_API_FAILURE, VIEW_TIMELY_ATTENDANCE_REPORTS_GET_API_REQUEST, VIEW_TIMELY_ATTENDANCE_REPORTS_GET_API_SUCCESS, VIEW_TIMELY_ATTENDANCE_REPORTS_GET_API_FAILURE, LEAVE_REPORTS_GET_API_REQUEST, LEAVE_REPORTS_GET_API_SUCCESS, LEAVE_REPORTS_GET_API_FAILURE } from '../Actions/Constants/ActionsTypes';


const INITIAL_STATE = {
  leaveTypeArr: '',
  viewReportLineChart: '',
  leaveReportBarChart: '',

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
      
    case LEAVE_TYPE_GET_API_REQUEST:
      return {
        ...state,
        error: action.payload.error,
        loaderStatus: action.payload.loaderStatus,
        activityIndicatorOrOkay: action.payload.activityIndicatorOrOkay,
        loaderMessage: action.payload.loaderMessage
      }

    case LEAVE_TYPE_GET_API_SUCCESS:
      return {
        ...state,
        leaveTypeArr: action.payload.leaveTypeArr
      }  

    case LEAVE_TYPE_GET_API_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        loaderStatus: action.payload.loaderStatus,
        activityIndicatorOrOkay: action.payload.activityIndicatorOrOkay,
        loaderMessage: action.payload.loaderMessage
      }  


    case VIEW_TIMELY_ATTENDANCE_REPORTS_GET_API_REQUEST:
      return {
        ...state,
        error: action.payload.error,
        loaderStatus: action.payload.loaderStatus,
        activityIndicatorOrOkay: action.payload.activityIndicatorOrOkay,
        loaderMessage: action.payload.loaderMessage
      }

    case VIEW_TIMELY_ATTENDANCE_REPORTS_GET_API_SUCCESS:
      return {
        ...state,
        viewReportLineChart: action.payload.viewReportLineChart,
        loaderStatus: action.payload.loaderStatus,
        activityIndicatorOrOkay: action.payload.activityIndicatorOrOkay,
        loaderMessage: action.payload.loaderMessage
      }  

    case VIEW_TIMELY_ATTENDANCE_REPORTS_GET_API_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        loaderStatus: action.payload.loaderStatus,
        activityIndicatorOrOkay: action.payload.activityIndicatorOrOkay,
        loaderMessage: action.payload.loaderMessage
      }


    case LEAVE_REPORTS_GET_API_REQUEST:
      return {
        ...state,
        error: action.payload
      }

    case LEAVE_REPORTS_GET_API_SUCCESS:
      return {
        ...state,
        leaveReportBarChart: action.payload.leaveReportBarChart
      }  

    case LEAVE_REPORTS_GET_API_FAILURE:
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
