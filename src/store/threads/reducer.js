import { THREADS_ACTION_TYPE } from './action';

export function threadsReducer(threads = null, action = {}) {
  switch (action.type) {
    case THREADS_ACTION_TYPE.SET_THREADS:
      return action.payload.threads;

    case THREADS_ACTION_TYPE.UNSET_THREADS:
      return null;

    default:
      return threads;
  }
}
