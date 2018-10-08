import TaskApi from "../api/mockTasksApi";
import * as types from "./actionTypes";
import { beginAjaxCall, ajaxCallError } from "./ajaxStatusActions";

export function loadTasksSuccess(tasks) {
  //console.log(Tasks);
  return { type: types.LOAD_TASKS_SUCCESS, tasks };
}

export function createTaskSuccess(task) {
  return { type: types.CREATE_TASK_SUCCESS, task };
}

export function updateTaskSuccess(task) {
  return { type: types.UPDATE_TASK_SUCCESS, task };
}

// Functions below handle asynchronous calls.
// Each returns a function that accepts a dispatch.
// These are used by redux-thunk to support asynchronous interactions.
export function loadTasks() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return TaskApi.getAllTasks()
      .then(tasks => {
        dispatch(loadTasksSuccess(tasks));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveTask(task) {
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    return TaskApi.saveTask(task)
      .then(task => {
        task.id
          ? dispatch(updateTaskSuccess(task))
          : dispatch(createTaskSuccess(task));
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw error;
      });
  };
}
