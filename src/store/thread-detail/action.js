import { threadsApi } from '@/api';

export const THREAD_DETAIL_ACTION_TYPE = {
  SET_THREAD_DETAIL: 'SET_THREAD_DETAIL',
  UNSET_THREAD_DETAIL: 'UNSET_THREAD_DETAIL',
};

export function setThreadDetailActionCreator(threadDetail) {
  return {
    type: THREAD_DETAIL_ACTION_TYPE.SET_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

export function unsetThreadDetailActionCreator() {
  return {
    type: THREAD_DETAIL_ACTION_TYPE.UNSET_THREAD_DETAIL,
    payload: {},
  };
}

export function asyncSetThreadDetail(threadId) {
  return async (dispatch) => {
    const threadDetailData = await threadsApi.seeThreadDetail(threadId);

    if (threadDetailData.status === 'fail') {
      // ? Should we throw error in thunk functions?
      throw new Error(threadDetailData.message);
    }

    dispatch(setThreadDetailActionCreator(threadDetailData.data.detailThread));
  };
}
