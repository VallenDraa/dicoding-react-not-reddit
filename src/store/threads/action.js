import { threadsApi } from '@/api';

export const THREADS_ACTION_TYPE = {
  SET_THREADS: 'SET_THREADS',
  UNSET_THREADS: 'UNSET_THREADS',
};

export function setThreadsActionCreator(threads) {
  return {
    type: THREADS_ACTION_TYPE.SET_THREADS,
    payload: {
      threads,
    },
  };
}

export function unsetThreadsActionCreator() {
  return {
    type: THREADS_ACTION_TYPE.UNSET_THREADS,
    payload: {},
  };
}

export function asyncSetThreads() {
  return async (dispatch) => {
    const threadsData = await threadsApi.seeAllThreads();

    if (threadsData.status === 'fail') {
      // ? Should we throw error in thunk functions?
      throw new Error(threadsData.message);
    }

    dispatch(setThreadsActionCreator(threadsData.data.threads));
  };
}
