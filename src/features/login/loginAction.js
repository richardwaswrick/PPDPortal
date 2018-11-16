import Auth0Lock from "auth0-lock";
import Cookies from "universal-cookie";
import { LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "./loginActionTypes";

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
  var options = {
    allowedConnections: ["Username-Password-Authentication"],
    autoclose: true,
    allowSignUp: false,
    auth: {
      params: {
        responseType: "id_token token",
        audience: "https://localhost:3000/graphql"
      }
    }
  };

  const lock = new Auth0Lock(
    "kj4DD4hvtzdZF3Ev4koF7YDuouYvGiAS",
    "ppdportal.auth0.com",
    options
  );

  return dispatch => {
    lock.show();

    lock.on("authenticated", function(authResult) {
      lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
          return dispatch(loginError(error));
        }

        const cookies = new Cookies();

        cookies.set("isAuthenticated", true, {
          path: "/",
          expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24)
        });
        cookies.set("profile", JSON.stringify(profile), {
          path: "/"
        });
        cookies.set("id_token", authResult.accessToken, {
          path: "/"
        });

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
    const cookies = new Cookies();
    cookies.remove("isAuthenticated");
    cookies.remove("profile");
    cookies.remove("id_token");
    return dispatch(logoutSuccess());
  };
}
