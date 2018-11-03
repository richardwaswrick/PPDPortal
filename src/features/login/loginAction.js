import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS } from "./loginActionTypes";
import Auth0Lock from "auth0-lock";

function loginSuccess(profile) {
  return {
    type: LOGIN_SUCCESS,
    profile
  };
}

function loginError(err) {
  return {
    type: LOGIN_ERROR,
    err
  };
}

function logoutSuccess(profile) {
  return {
    type: LOGOUT_SUCCESS,
    profile: profile
  };
}

export function login() {
  const lock = new Auth0Lock(
    "kj4DD4hvtzdZF3Ev4koF7YDuouYvGiAS",
    "ppdportal.auth0.com"
  );

  return dispatch => {
    lock.show();

    lock.on("authenticated", function(authResult) {
      lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
          return dispatch(loginError(error));
        }
        localStorage.setItem("profile", JSON.stringify(profile));
        localStorage.setItem("id_token", authResult.accessToken);

        return dispatch(loginSuccess(profile));
      });
    });

    lock.on("unrecoverable_error", function(authResult) {
      lock.getUserInfo(authResult.accessToken, function(error) {
        return dispatch(loginError(error));
      });
    });
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem("id_token");
    localStorage.removeItem("profile");
    return dispatch(logoutSuccess());
  };
}
