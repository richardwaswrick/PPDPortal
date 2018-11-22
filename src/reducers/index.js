import { combineReducers } from "redux";
import ajaxCallsInProgress from "./ajaxStatusReducer";
import home from "../modules/home/homeReducer";
import auth from "../modules/login/loginReducer";

const rootReducer = combineReducers({
  ajaxCallsInProgress,
  home,
  auth
});

export default rootReducer;
