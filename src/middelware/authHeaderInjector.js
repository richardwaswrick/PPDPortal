import { CALL_API } from "redux-api-middleware";

export default () => next => async action => {
  const callApi = action[CALL_API];

  console.log("enter authHeaderInjector");

  if (callApi) {
    callApi.headers = Object.assign({}, callApi.headers, {
      Authorization: localStorage.getItem("id_token") || ""
    });
  }

  return next(action);
};
