import { THREAD_DETAIL_ACTION_TYPE } from './action';

export function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case THREAD_DETAIL_ACTION_TYPE.SET_THREAD_DETAIL:
      return action.payload.threadDetail;

    case THREAD_DETAIL_ACTION_TYPE.UNSET_THREAD_DETAIL:
      return null;

    default:
      return threadDetail;
  }
}
