import { CALL_API } from "redux-api-middleware";

export default ({ getState }) => next => async action => {
  const callApi = action[CALL_API];
  if (callApi) {
    // const state = getState();

    let jwt = localStorage.getItem("id_token");
    console.log("jwt: " + jwt);

    //maintain redux pattern, no expections... otherwise you'll introduce unexpected side effects in app
    //need to call an action
    //need to have a reducer
  }
  return next(action);
};
