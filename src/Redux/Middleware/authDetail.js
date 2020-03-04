import * as api from '../../Authentication/Api/Api';


const setAuthDetails = () => next => action => {
  if(action.type === 'LOGIN_POST_API_SUCCESS') {
    // after a successful login, update the token in the API
    api.setAuthDetails(action.payload);
  }

  // continue processing this action
  return next(action);
}

export { setAuthDetails };
