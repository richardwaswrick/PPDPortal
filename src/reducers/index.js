import { combineReducers } from "redux";
import tasks from "../features/admin/tasks/taskReducer";
import ajaxCallsInProgress from "./ajaxStatusReducer";
import home from "../features/home/homeReducer";
import auth from "../features/login/loginReducer";

const rootReducer = combineReducers({
  tasks,
  ajaxCallsInProgress,
  home,
  auth
});

export default rootReducer;
