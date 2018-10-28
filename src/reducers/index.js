import { combineReducers } from "redux";
import tasks from "./taskReducer";
import ajaxCallsInProgress from "./ajaxStatusReducer";
import auth from "./authReducers";

const rootReducer = combineReducers({
  tasks,
  ajaxCallsInProgress,
  auth,
});

export default rootReducer;
