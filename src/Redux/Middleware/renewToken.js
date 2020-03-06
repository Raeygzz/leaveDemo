import { setToken } from '../Actions/LoginAction';


export const renewToken = ({ dispatch, getState }) => next => action => {
  // return ({ dispatch, getState }) => next => (action) => {

    // const { request, } = action;
    // const { request } = action;

    // if (!request) {
    //   return next(action);
    // }

    const state = getState();
    const refreshToken = state.login.refreshToken;

    // 1 minutes from now
    const refreshThreshold = (new Date().getTime() + 60000);
    debugger
    if (refreshToken && refreshThreshold > new Date().getTime()) {
      debugger
      return fetch('https://microservices.99leave.com/identity/renewtoken', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh_token: refreshToken
        })
    
      }).then(res => res.json()).then((resJson) => {
        console.log('renewToken ==> ', resJson);
        dispatch(setToken(resJson));
      })
    }
    // return request(tokens);
  // };
}




// export const renewToken = ({ dispatch, getState }) => next => action => {
// export function renewToken({ dispatch, getState }) {
//   return (next) => (action) => {
    
//     var state = getState();
//     var refreshToken = state.login.refreshToken;

//     var loggedInTime = new Date();
//     loggedInTime.setMinutes(loggedInTime.getMinutes() + 1);

//     // var refreshThreshold = (new Date().getTime() + 60000);
    
//     var x = setInterval(function () {
//       var loggedInTime2Distance = loggedInTime.getTime();
//       var newDateTime = new Date().getTime();
//       var  distance = loggedInTime2Distance - newDateTime;

//       if(state.login.refreshToken && distance < 0) {
//         console.log('again')
//         fetch('https://microservices.99leave.com/identity/renewtoken', {
//           method: "POST",
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             refresh_token: refreshToken
//           })
      
//         }).then(res => res.json()).then((resJson) => {
//           console.log('renewToken ==> ', resJson);
//           dispatch(setToken(resJson));
//         })
    
//         clearInterval(x);
//         console.log('== CLEARED ==');
//         renewToken()
//       }
//     }, 1000);

//     return next(action);
//   };
// }
