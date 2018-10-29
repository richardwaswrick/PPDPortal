import { combineReducers } from "redux";
import tasks from "./taskReducer";
import ajaxCallsInProgress from "./ajaxStatusReducer";
import auth from './authReducer';
import callback from './callbackReducer';
import forgot from './forgotPasswordReducer';
import home from './homeReducer';
import password from './changePasswordReducer';

const rootReducer = combineReducers({
  tasks,
  ajaxCallsInProgress,
  auth,
  callback,
  forgot,
  home,
  password,
});

export default rootReducer;
