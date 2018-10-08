import * as types from '../actions/actionTypes';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function tasks(state = initialState.tasks, action) {
  switch (action.type) {
    case types.LOAD_TASKS_SUCCESS:
      return action.tasks;

    case types.CREATE_TASK_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.task)
      ];

    case types.UPDATE_TASK_SUCCESS:
      return [
        ...state.filter(task => task.id !== action.task.id),
        Object.assign({}, action.task)
      ];

    default:
      return state;
  }
}
