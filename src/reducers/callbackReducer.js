import {
  CALLBACK_IN_PROGRESS,
  CALLBACK_COMPLETE,
  CLEARDOWN
} from '../actions/callback/callbackTypes';

const INIT = {
  error: '',
  loading: false
}

export default function(state = {}, action) {
  switch(action.type) {
    case CLEARDOWN:
      return { ...state, ...INIT };
    case CALLBACK_COMPLETE:
      return { ...state, ...INIT };
    case CALLBACK_IN_PROGRESS:
      return { ...state, ...INIT, loading: true };
    default:
      return state;
  }
}
