import { LOGIN_POST_API_REQUEST, LOGIN_POST_API_SUCCESS, LOGIN_POST_API_FAILURE, EMPLOYEE_DETAIL_GET_API_REQUEST, EMPLOYEE_DETAIL_GET_API_SUCCESS, EMPLOYEE_DETAIL_GET_API_FAILURE } from '../Actions/Constants/ActionsTypes';


const INITIAL_STATE = {
  dateAtTheTimeOfLogin: '',
  countryCode: '',
  accessToken: '',
  refreshToken: '',
  expiresIn: '',
  tokenType: '',
  userId: '',
  companyId: '',
  fullName: '',

  error: '',
  loaderStatus: false,
  // loaderMessage: '',
  // isLoading: null,
  // apiValidationOrFailureMessage: '',
}



const loginReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case LOGIN_POST_API_REQUEST:
      return {
        ...state,
        error: action.payload.error,
        loaderStatus: action.payload.loaderStatus
      }

    case LOGIN_POST_API_SUCCESS:
      return {
        ...state,
        dateAtTheTimeOfLogin: action.payload.dateAtTheTimeOfLogin,
        countryCode: action.payload.countryCode,
        accessToken: action.payload.object.token.id_token,
        refreshToken: action.payload.object.token.refresh_token,
        expiresIn: action.payload.object.token.expires_in,
        tokenType: action.payload.object.token.token_type,
        userId: action.payload.object.id,
      }  

    case LOGIN_POST_API_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        loaderStatus: action.payload.loaderStatus,
      }   


    case EMPLOYEE_DETAIL_GET_API_REQUEST:
      return {
        ...state,
        error: action.payload
      }

    case EMPLOYEE_DETAIL_GET_API_SUCCESS:
      return {
        ...state,
        fullName: action.payload.object.details.first_name + ' ' + action.payload.object.details.last_name,
        companyId: action.payload.object.details.company_id,
        loaderStatus: action.payload.loaderStatus,
      }  

    case EMPLOYEE_DETAIL_GET_API_FAILURE:
      return {
        ...state,
        error: action.payload.message
      }    

      
    default:
      return state;  
  }
}


export default loginReducer;
