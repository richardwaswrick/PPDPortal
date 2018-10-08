import { combineReducers } from "redux";
import tasks from "./taskReducer";
import ajaxCallsInProgress from "./ajaxStatusReducer";

const rootReducer = combineReducers({
  tasks,
  ajaxCallsInProgress
});

export default rootReducer;
