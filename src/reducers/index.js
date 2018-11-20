import { combineReducers } from "redux";
import tasks from "../modules/admin/tasks/taskReducer";
import ajaxCallsInProgress from "./ajaxStatusReducer";
import home from "../modules/home/homeReducer";
import auth from "../modules/login/loginReducer";

const rootReducer = combineReducers({
  tasks,
  ajaxCallsInProgress,
  home,
  auth
});

export default rootReducer;
