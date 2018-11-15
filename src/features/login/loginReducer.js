import * as ActionTypes from "./loginActionTypes";
const jwtDecode = require("jwt-decode");

const jwt = localStorage.getItem("id_token");
const expDate = getTokenExpDate(jwt);
const isAuthenticatedLocal = checkTokenExpiry(expDate);

function checkTokenExpiry(jwtExpDate) {
  const expiryDate = new Date(0);

  if (new Date() < expiryDate.setUTCSeconds(jwtExpDate)) {
    return true;
  }

  return false;
}

function getTokenExpDate(jwt) {
  if (jwt) {
    var decodedJwt = jwtDecode(jwt);
    const jwtExp = decodedJwt.exp;
    return jwtExp;
  }

  return 0;
}

function getProfile() {
  return JSON.parse(localStorage.getItem("profile"));
}

export default function auth(
  state = {
    isAuthenticated: isAuthenticatedLocal,
    profile: getProfile(),
    error: "",
    expDate: expDate
  },
  action
) {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        profile: action.profile,
        error: "",
        expDate: expDate
      });
    case ActionTypes.LOGIN_ERROR:
      return Object.assign({}, state, {
        isAuthenticated: false,
        profile: null,
        error: action.error,
        expDate: null
      });
    case ActionTypes.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: false,
        profile: null,
        expDate: null
      });
    default:
      return state;
  }
}
