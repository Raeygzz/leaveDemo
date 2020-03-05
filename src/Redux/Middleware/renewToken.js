import { setToken } from '../Actions/LoginAction';


// const renewToken = () => {
//   console.log('i m here');
//   return ({ dispatch, getState }) => next => (action) => {
//     const {
//       request,
//     } = action;

//     if (!request) {
//       return next(action);
//     }

//     const state = getState();
//     const refreshToken = state.login.refreshToken;

//     // 5 minutes from now
//     const refreshThreshold = (new Date.getTime() + 60000);

//     if (refreshToken && refreshThreshold > new Date.getTime()) {
//       return fetch(url + '/identity/renewtoken', {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           refresh_token: refreshToken
//         })
    
//       }).then(res => res.json()).then((resJson) => {
//         console.log('renewToken ==> ', resJson);
//         dispatch(setToken(resJson));
//       })
//     }
//     // return request(tokens);
//   };
// }



// export { renewToken };



export function renewToken({ dispatch, getState }) {

  return (next) => (action) => {

    const state = getState();
    const refreshToken = state.login.refreshToken;
    const expiresIn = state.login.expiresIn;
    const dateAtTheTimeOfLogin = state.login.dateAtTheTimeOfLogin;

    const nowDate = new Date();
    nowDate.setMinutes(nowDate.getMinutes() + 3);

    const loggedInTime2Distance = nowDate.getTime();
    const newDateTime = new Date().getTime();;
      // only worry about expiring token for async actions
    //  const refreshThreshold = (new Date().getTime() + 180000);
    //  const currentTime = (new Date().getTime());
debugger
      const distance = loggedInTime2Distance - newDateTime;

      if(distance < 0) {
     
    // if (refreshToken && refreshThreshold > expiresIn) {
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
      return next(action);
  };
}
