import * as api from '../../Authentication/Api/Api';


const setEmployeeDetails = () => next => action => {
  if(action.type == 'EMPLOYEE_DETAIL_GET_API_SUCCESS') {
    api.setEmployeeDetails(action.payload)
  }

  // continue processing this action
  return next(action);
}

export { setEmployeeDetails };
