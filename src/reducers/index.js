import { combineReducers } from "redux";
import tasks from "./taskReducer";
import ajaxCallsInProgress from "./ajaxStatusReducer";
import home from "./homeReducer";
import auth from "../features/login/loginReducer";

const rootReducer = combineReducers({
  tasks,
  ajaxCallsInProgress,
  home,
  auth
});

export default rootReducer;
