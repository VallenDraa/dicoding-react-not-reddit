import { commentsApi, threadsApi } from '@/api';

export const THREAD_DETAIL_ACTION_TYPE = {
  SET_THREAD_DETAIL: 'SET_THREAD_DETAIL',
  UNSET_THREAD_DETAIL: 'UNSET_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
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

export function addCommentActionCreator({ threadId, comment }) {
  return {
    type: THREAD_DETAIL_ACTION_TYPE.ADD_COMMENT,
    payload: { threadId, comment },
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

export function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    const commentData = await commentsApi.createThreadComment({
      threadId,
      content,
    });

    if (commentData.status === 'fail') {
      // ? Should we throw error in thunk functions?
      throw new Error(commentData.message);
    }

    dispatch(
      addCommentActionCreator({
        threadId,
        comment: commentData.data.comment,
      }),
    );
  };
}
