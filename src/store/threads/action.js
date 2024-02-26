import { threadsApi, votesApi } from '@/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const THREADS_ACTION_TYPE = {
  // Thread action types
  CREATE: 'threads/create',
  SET: 'threads/set',
  UNSET: 'threads/unset',

  // Thread votes action types
  UP_VOTE: 'threads/upvote',
  DOWN_VOTE: 'threads/downvote',
  NEUTRALIZE_UP_VOTE: 'threads/neutralize-upvote',
  NEUTRALIZE_DOWN_VOTE: 'threads/neutralize-downvote',
};

export const threadsAction = {
  // Thread actions
  create(thread) {
    return {
      type: THREADS_ACTION_TYPE.CREATE,
      payload: {
        thread,
      },
    };
  },
  set(threads) {
    return {
      type: THREADS_ACTION_TYPE.SET,
      payload: {
        threads,
      },
    };
  },
  unset() {
    return {
      type: THREADS_ACTION_TYPE.UNSET,
      payload: {},
    };
  },

  // Thread votes actions
  upvote({ threadId, userId }) {
    return {
      type: THREADS_ACTION_TYPE.UP_VOTE,
      payload: { threadId, userId },
    };
  },
  downvote({ threadId, userId }) {
    return {
      type: THREADS_ACTION_TYPE.DOWN_VOTE,
      payload: { threadId, userId },
    };
  },
  neutralizeUpVote({ threadId, userId }) {
    return {
      type: THREADS_ACTION_TYPE.NEUTRALIZE_UP_VOTE,
      payload: { threadId, userId },
    };
  },
  neutralizeDownVote({ threadId, userId }) {
    return {
      type: THREADS_ACTION_TYPE.NEUTRALIZE_DOWN_VOTE,
      payload: { threadId, userId },
    };
  },
};

export const threadsThunks = {
  // Thread thunk
  asyncCreate({ title, body, category }) {
    return async (dispatch) => {
      dispatch(showLoading());
      const threadsData = await threadsApi.createThread({
        title,
        body,
        category,
      });

      if (threadsData.status === 'fail') {
        dispatch(hideLoading());
        throw new Error(threadsData.message);
      }

      dispatch(threadsAction.create(threadsData.data.thread));
      dispatch(hideLoading());
    };
  },
  asyncSet() {
    return async (dispatch) => {
      dispatch(showLoading());
      const threadsData = await threadsApi.seeAllThreads();

      if (threadsData.status === 'fail') {
        dispatch(hideLoading());
        throw new Error(threadsData.message);
      }

      dispatch(threadsAction.set(threadsData.data.threads));
      dispatch(hideLoading());
    };
  },

  // Thread votes thunks
  asyncUpvote(threadId) {
    return async (dispatch, getState) => {
      dispatch(showLoading());
      const { authUser } = getState();

      dispatch(
        threadsAction.upvote({
          threadId,
          userId: authUser.id,
        }),
      );

      const threadsData = await votesApi.upvoteThread(threadId);

      if (threadsData.status === 'fail') {
        dispatch(
          threadsAction.neutralizeUpVote({
            threadId,
            userId: authUser.id,
          }),
        );

        dispatch(hideLoading());
        throw new Error(threadsData.message);
      }

      dispatch(hideLoading());
    };
  },
  asyncDownvote(threadId) {
    return async (dispatch, getState) => {
      dispatch(showLoading());
      const { authUser } = getState();

      dispatch(
        threadsAction.downvote({
          threadId,
          userId: authUser.id,
        }),
      );

      const threadsData = await votesApi.downvoteThread(threadId);

      if (threadsData.status === 'fail') {
        dispatch(
          threadsAction.neutralizeDownVote({
            threadId,
            userId: authUser.id,
          }),
        );

        dispatch(hideLoading());
        throw new Error(threadsData.message);
      }

      dispatch(hideLoading());
    };
  },
  asyncNeutralizeUpVote(threadId) {
    return async (dispatch, getState) => {
      dispatch(showLoading());
      const { authUser } = getState();

      dispatch(
        threadsAction.neutralizeUpVote({
          threadId,
          userId: authUser.id,
        }),
      );

      const threadsData = await votesApi.neutralizeThreadVote(threadId);

      if (threadsData.status === 'fail') {
        dispatch(
          threadsAction.upvote({
            threadId,
            userId: authUser.id,
          }),
        );

        dispatch(hideLoading());
        throw new Error(threadsData.message);
      }

      dispatch(hideLoading());
    };
  },
  asyncNeutralizeDownVote(threadId) {
    return async (dispatch, getState) => {
      dispatch(showLoading());
      const { authUser } = getState();

      dispatch(
        threadsAction.neutralizeDownVote({
          threadId,
          userId: authUser.id,
        }),
      );

      const threadsData = await votesApi.neutralizeThreadVote(threadId);

      if (threadsData.status === 'fail') {
        dispatch(
          threadsAction.downvote({
            threadId,
            userId: authUser.id,
          }),
        );

        dispatch(hideLoading());
        throw new Error(threadsData.message);
      }

      dispatch(hideLoading());
    };
  },
};
