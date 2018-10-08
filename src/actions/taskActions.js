import TaskApi from "../api/mockTasksApi";
import * as types from "./actionTypes";
import { beginAjaxCall, ajaxCallError } from "./ajaxStatusActions";

export function loadTasksSuccess(TASKS) {
  return { type: types.LOAD_TASKS_SUCCESS, TASKS };
}

export function createTaskSuccess(Task) {
  return { type: types.CREATE_TASK_SUCCESS, Task };
}

export function updateTaskSuccess(Task) {
  return { type: types.UPDATE_TASK_SUCCESS, Task };
}

// Functions below handle asynchronous calls.
// Each returns a function that accepts a dispatch.
// These are used by redux-thunk to support asynchronous interactions.
export function loadTasks() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return TaskApi.getAllTasks()
      .then(Tasks => {
        dispatch(loadTasksSuccess(Tasks));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveTask(Task) {
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    return TaskApi.saveTask(Task)
      .then(Task => {
        Task.id
          ? dispatch(updateTaskSuccess(Task))
          : dispatch(createTaskSuccess(Task));
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw error;
      });
  };
}
