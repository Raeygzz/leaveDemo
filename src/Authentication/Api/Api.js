// import configureStore from '../../Redux/Store';

const url = 'https://microservices.99leave.com';


let authDetails = {};
export function setAuthDetails(auth) {
  authDetails.dateAtTheTimeOfLogin = auth.dateAtTheTimeOfLogin;
  authDetails.countryCode = auth.countryCode;
  authDetails.accessToken = auth.object.token.id_token;
  authDetails.refreshToken = auth.object.token.refresh_token;
  authDetails.expiresIn = auth.object.token.expires_in;
  authDetails.tokenType = auth.object.token.token_type;
  authDetails.userId = auth.object.id;

  // console.log('auth ==> ', authDetails);
}

export function setEmployeeDetails(employeeDetail) {
  authDetails.fullName = employeeDetail.object.details.first_name + ' ' + employeeDetail.object.details.last_name;
  authDetails.companyId = employeeDetail.object.details.company_id;

  // console.log('employeeDetail ==> ', authDetails);
}


// export const renewToken = () => {
//   return fetch(url + '/identity/renewtoken', {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       refresh_token: authDetails.refreshToken
//     })

//   }).then(res => res.json()).then((resJson) => {
//     console.group('renewToken ==> ', resJson);
//   })
// }


export const login = (method = {}, body = {}) => {
  return fetch(url + '/identity/login', {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body
  });
}


// Method & headers send through action                                 // feb-28
// export const employeeDetail = (options = {}, paramObj = {}) => {
//   return fetch(url + '/identity/employee/' + paramObj.employeeId, {
//     method: options.method,
//     headers: options.headers
//   });
// }

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


export const events = (method = {}, paramObj = {}, accessToken = {}) => {
  return fetch(url + '/events/event?company_id=' + paramObj.company_id + '&start_date=' + paramObj.start_date + '&end_date=' + paramObj.end_date + '&limit=' + paramObj.limit, {
    method: method,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  });
}


export const eventDetail = (method = {}, paramObj = {}, accessToken = {}) => {
  return fetch(url + '/events/event/' + paramObj.eventId, {
    method: method,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  });
}


export const viewTimelyAttendanceReports = (method = {}, paramObj = {}, accessToken = {}) => {
  return fetch(url + '/attendance/attendance?company_id=' + paramObj.company_id + '&employee_id=' + paramObj.employee_id + '&start_date=' + paramObj.start_date + '&end_date=' + paramObj.end_date + '&group=' + paramObj.group, {
    method: method,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  });
}


export const leaveType = (method = {}, paramObj = {}, accessToken = {}) => {
  return fetch(url + '/leave/leavetype?company_id=' + paramObj.company_id, {
    method: method,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  });
}


export const viewTimelyLeaveReports = (method = {}, paramObj = {}, accessToken = {}) => {
  return fetch(url + '/leave/leave?company_id=' + paramObj.company_id + '&employee_id=' + paramObj.employee_id + '&start_date=' + paramObj.start_date + '&end_date=' + paramObj.end_date, {
    method: method,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  });
}
