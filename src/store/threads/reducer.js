import { THREADS_ACTION_TYPE } from './action';

export function threadsReducer(threads = null, action = {}) {
  switch (action.type) {
    case THREADS_ACTION_TYPE.CREATE:
      return [action.payload.thread, ...threads];

    case THREADS_ACTION_TYPE.SET:
      return action.payload.threads;

    case THREADS_ACTION_TYPE.UNSET:
      return null;

    case THREADS_ACTION_TYPE.UP_VOTE:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: [...thread.upVotesBy, action.payload.userId],
          };
        }

        return thread;
      });

    case THREADS_ACTION_TYPE.DOWN_VOTE:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            downVotesBy: [...thread.downVotesBy, action.payload.userId],
          };
        }

        return thread;
      });

    case THREADS_ACTION_TYPE.NEUTRALIZE_UP_VOTE:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter(
              (vote) => vote !== action.payload.userId,
            ),
          };
        }

        return thread;
      });

    case THREADS_ACTION_TYPE.NEUTRALIZE_DOWN_VOTE:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            downVotesBy: thread.downVotesBy.filter(
              (vote) => vote !== action.payload.userId,
            ),
          };
        }

        return thread;
      });

    default:
      return threads;
  }
}
