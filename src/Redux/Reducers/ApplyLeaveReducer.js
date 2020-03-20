import { NET_INFO, USERS_HANDLE_LEAVE_CAPABILITIES_GET_API_REQUEST, USERS_HANDLE_LEAVE_CAPABILITIES_GET_API_SUCCESS, USERS_HANDLE_LEAVE_CAPABILITIES_GET_API_FAILURE, EMPLOYEE_LEAVE_TYPE_GET_API_REQUEST, EMPLOYEE_LEAVE_TYPE_GET_API_SUCCESS, EMPLOYEE_LEAVE_TYPE_GET_API_FAILURE, EMPLOYEE_LEAVE_REPORTS_GET_API_REQUEST, EMPLOYEE_LEAVE_REPORTS_GET_API_SUCCESS, EMPLOYEE_LEAVE_REPORTS_GET_API_FAILURE, APPLY_LEAVE_POST_API_REQUEST, APPLY_LEAVE_POST_API_SUCCESS, APPLY_LEAVE_POST_API_FAILURE } from '../Actions/Constants/ActionsTypes';


const INITIAL_STATE = {
  usersWithHandleLeaveAuthorities: '',
  employeeLeaveTypeArr: '',
  employeeLeaveReportsArr: '',

  error: '',
  loaderStatus: null,
  activityIndicatorOrOkay: null,
  loaderMessage: ''
}



const ApplyLeaveReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case NET_INFO:
      return {
        ...state,
        loaderStatus: action.payload.loaderStatus,
        activityIndicatorOrOkay: action.payload.activityIndicatorOrOkay,
        loaderMessage: action.payload.loaderMessage
      }
      
    case USERS_HANDLE_LEAVE_CAPABILITIES_GET_API_REQUEST:
      return {
        ...state,
        error: action.payload.error,
        loaderStatus: action.payload.loaderStatus,
        activityIndicatorOrOkay: action.payload.activityIndicatorOrOkay,
        loaderMessage: action.payload.loaderMessage
      }

    case USERS_HANDLE_LEAVE_CAPABILITIES_GET_API_SUCCESS:
      return {
        ...state,
        usersWithHandleLeaveAuthorities: action.payload
      }  

    case USERS_HANDLE_LEAVE_CAPABILITIES_GET_API_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        loaderStatus: action.payload.loaderStatus,
        activityIndicatorOrOkay: action.payload.activityIndicatorOrOkay,
        loaderMessage: action.payload.loaderMessage
      }
      
      
    case EMPLOYEE_LEAVE_TYPE_GET_API_REQUEST:
      return {
        ...state,
        error: action.payload,
      }

    case EMPLOYEE_LEAVE_TYPE_GET_API_SUCCESS:
      return {
        ...state,
        employeeLeaveTypeArr: action.payload.employeeLeaveTypeArr
      }  

    case EMPLOYEE_LEAVE_TYPE_GET_API_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        loaderStatus: action.payload.loaderStatus,
        activityIndicatorOrOkay: action.payload.activityIndicatorOrOkay,
        loaderMessage: action.payload.loaderMessage
      }  

    case EMPLOYEE_LEAVE_REPORTS_GET_API_REQUEST:
      return {
        ...state,
        error: action.payload
      }

    case EMPLOYEE_LEAVE_REPORTS_GET_API_SUCCESS:
      return {
        ...state,
        employeeLeaveReportsArr: action.payload.employeeLeaveReportsArr,
        loaderStatus: action.payload.loaderStatus,
        activityIndicatorOrOkay: action.payload.activityIndicatorOrOkay,
        loaderMessage: action.payload.loaderMessage
      }  

    case EMPLOYEE_LEAVE_REPORTS_GET_API_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        loaderStatus: action.payload.loaderStatus,
        activityIndicatorOrOkay: action.payload.activityIndicatorOrOkay,
        loaderMessage: action.payload.loaderMessage
      }
      
      
    case APPLY_LEAVE_POST_API_REQUEST:
      return {
        ...state,
        error: action.payload.error,
        loaderStatus: action.payload.loaderStatus,
        activityIndicatorOrOkay: action.payload.activityIndicatorOrOkay,
        loaderMessage: action.payload.loaderMessage
      }

    case APPLY_LEAVE_POST_API_SUCCESS:
      return {
        ...state,
        loaderStatus: action.payload.loaderStatus,
        activityIndicatorOrOkay: action.payload.activityIndicatorOrOkay,
        loaderMessage: action.payload.loaderMessage
      }  

    case APPLY_LEAVE_POST_API_FAILURE:
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


export default ApplyLeaveReducer;
