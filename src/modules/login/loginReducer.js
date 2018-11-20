import * as ActionTypes from "./loginActionTypes";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const authCookie = cookies.get("isAuthenticated");
const profile = cookies.get("profile");
const isAuthenticated = checkAuthCookieExpiration(authCookie);

function checkAuthCookieExpiration(authCookie) {
  if (authCookie) {
    return true;
  }
  return false;
}

export default function auth(
  state = {
    isAuthenticated: isAuthenticated,
    profile: profile,
    error: ""
  },
  action
) {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        profile: action.profile,
        error: ""
      });
    case ActionTypes.LOGIN_ERROR:
      return Object.assign({}, state, {
        isAuthenticated: false,
        profile: null,
        error: action.error
      });
    case ActionTypes.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: false,
        profile: null
      });
    default:
      return state;
  }
}
