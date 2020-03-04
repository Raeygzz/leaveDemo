import { CHECKINOUT_GET_API_REQUEST, CHECKINOUT_GET_API_SUCCESS, CHECKINOUT_GET_API_FAILURE, CHECKIN_POST_API_REQUEST, CHECKIN_POST_API_SUCCESS, CHECKIN_POST_API_FAILURE, CHECKOUT_POST_API_REQUEST, CHECKOUT_POST_API_SUCCESS, CHECKOUT_POST_API_FAILURE, VIEW_REPORTS_API_REQUEST, VIEW_REPORTS_API_SUCCESS, VIEW_REPORTS_API_FAILURE } from '../Actions/Constants/ActionsTypes';


const INITIAL_STATE = {
  myLat: '',
  myLon: '',
  checkInLocation: '',
  myApiKey: 'AIzaSyAlLxofrXNceXHrdMbUQgwz6F1YF9WlKyE',
  
  checkInTime: '',
  checkInDate: '',
  checkInStatus: false,
  checkOutStatus: false,
  elapsedTime: '',
  
  checkInOutReports: '',
  
  checkInAlready: false,
  
  error: '',
  loaderStatus: null,
}



const checkInOutReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case CHECKINOUT_GET_API_REQUEST:
      return {
        ...state,
        error: action.payload.error,
        loaderStatus: action.payload.loaderStatus
      }

    case CHECKINOUT_GET_API_SUCCESS:
      return {
        ...state,
        checkInDate: action.payload.object.checkin_details.date,
        checkInTime: action.payload.object.checkin_details.check_in,
        checkInStatus: action.payload.object.checkin_details.checkin_status,
        checkOutStatus: action.payload.object.checkin_details.checkout_status,
        elapsedTime: action.payload.object.checkin_details.elapsed_time,
        checkInAlready: action.payload.checkInAlready,
        myLat: JSON.parse(action.payload.object.checkin_details.checkin_location).latitude,
        myLon: JSON.parse(action.payload.object.checkin_details.checkin_location).longitude,
      }  

    case CHECKINOUT_GET_API_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loaderStatus: action.payload.loaderStatus,
      }


    case CHECKIN_POST_API_REQUEST:
      return {
        ...state,
        error: action.payload,
        loaderStatus: action.payload.loaderStatus
      }

    case CHECKIN_POST_API_SUCCESS:
      return {
        ...state,
        checkInDate: action.payload.object.check_in_detail.date,
        checkInTime: action.payload.object.check_in_detail.check_in,
        checkInStatus: action.payload.object.check_in_detail.checkin_status,
        myLat: JSON.parse(action.payload.object.check_in_detail.checkin_location).latitude,
        myLon: JSON.parse(action.payload.object.check_in_detail.checkin_location).longitude,
        checkInLocation: action.payload.checkInLocation,
        checkInAlready: action.payload.checkInAlready
      }  

    case CHECKIN_POST_API_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        loaderStatus: action.payload.loaderStatus
      }  

       
      case CHECKOUT_POST_API_REQUEST:
      return {
        ...state,
        error: action.payload,
        loaderStatus: action.payload.loaderStatus
      }

    case CHECKOUT_POST_API_SUCCESS:
      return {
        ...state,
        checkInStatus: action.payload.object.attendance.checkin_status,
        checkOutStatus: action.payload.object.attendance.checkout_status,
        checkInAlready: action.payload.checkInAlready
      }  

    case CHECKOUT_POST_API_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        loaderStatus: action.payload.loaderStatus
      } 


      case VIEW_REPORTS_API_REQUEST:
      return {
        ...state,
        error: action.payload
      }

    case VIEW_REPORTS_API_SUCCESS:
      return {
        ...state,
        checkInOutReports: action.payload.checkInOutReports,
        loaderStatus: action.payload.loaderStatus,
      }  

    case VIEW_REPORTS_API_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        loaderStatus: action.payload.loaderStatus,
      } 

    default:
      return state;  
  }
}


export default checkInOutReducer;
