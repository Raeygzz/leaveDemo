// import configureStore from '../../Redux/Store';

const url = 'https://microservices.99leave.com';




export const login = (method = {}, body = {}) => {
  return fetch(url + '/identity/login', {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body
  });
}


export const employeeDetail = (method = {}, paramObj = {}, accessToken = {}) => {
  // const store = configureStore();

  // store.subscribe(() => {
  //   if(store.getState().action.indexOf('LoginAction') !== -1) {
  //     console.log('store ==> ', store.getState());
  //   }
  // })

  // const state = store.getState();
  // console.log('state ==> ', state);

  return fetch(url + '/identity/employee/' + paramObj.employeeId, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    }
  });
}


export const checkInOutStatus = (method = {}, paramObj = {}, accessToken = {}) => {
  return fetch(url + '/attendance/status/check?user_id=' + paramObj.userId + '&date=' + paramObj.dateAtTheTimeOfLogin + '&country=' + paramObj.countryCode, {
    method: method,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  });
}


export const checkIn = (method = {}, accessToken = {}, body = {}) => {
  // console.log('Store accessToken ==> ', accessToken);
  return fetch(url + '/attendance/checkin', {
    method: method,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: body
  });
}


export const checkOut = (method = {}, accessToken = {}, body = {}) => {
  // console.log('Store accessToken ==> ', accessToken);
  return fetch(url + '/attendance/checkout', {
    method: method,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: body
  });
}


export const viewReports = (method = {}, paramObj = {}, accessToken = {}) => {
  return fetch(url + '/attendance/attendance?company_id=' + paramObj.company_id + '&employee_id=' + paramObj.employee_id + '&start_date=' + paramObj.start_date + '&end_date=' + paramObj.end_date + '&group=' + paramObj.group, {
    method: method,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  });
}
