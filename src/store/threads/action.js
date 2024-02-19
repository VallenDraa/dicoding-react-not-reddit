import { threadsApi, votesApi } from '@/api';

export const THREADS_ACTION_TYPE = {
  // Thread action types
  SET: 'SET_THREADS',
  UNSET: 'UNSET_THREADS',

  // Thread votes action types
  UP_VOTE: 'UP_VOTE_THREADS',
  DOWN_VOTE: 'DOWN_VOTE_THREADS',
  NEUTRALIZE_UP_VOTE: 'NEUTRALIZE_UP_VOTE_THREADS',
  NEUTRALIZE_DOWN_VOTE: 'NEUTRALIZE_DOWN_VOTE_THREADS',
};

export const threadsAction = {
  // Thread actions
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

export const threadsThunk = {
  // Thread thunk
  asyncSet() {
    return async (dispatch) => {
      const threadsData = await threadsApi.seeAllThreads();

      if (threadsData.status === 'fail') {
        // ? Should we throw error in thunk functions?
        throw new Error(threadsData.message);
      }

      dispatch(threadsAction.set(threadsData.data.threads));
    };
  },

  // Thread votes thunks
  asyncUpvote(threadId) {
    return async (dispatch, getState) => {
      const { authUser } = getState();

      const threadsData = await votesApi.upvoteThread(threadId);

      if (threadsData.status === 'fail') {
        // ? Should we throw error in thunk functions?
        throw new Error(threadsData.message);
      }

      dispatch(
        threadsAction.upvote({
          threadId,
          userId: authUser.id,
        }),
      );
    };
  },
  asyncDownvote(threadId) {
    return async (dispatch, getState) => {
      const { authUser } = getState();

      const threadsData = await votesApi.downvoteThread(threadId);

      if (threadsData.status === 'fail') {
        // ? Should we throw error in thunk functions?
        throw new Error(threadsData.message);
      }

      dispatch(
        threadsAction.downvote({
          threadId,
          userId: authUser.id,
        }),
      );
    };
  },
  asyncNeutralizeUpVote(threadId) {
    return async (dispatch, getState) => {
      const { authUser } = getState();

      const threadsData = await votesApi.neutralizeThreadVote(threadId);

      if (threadsData.status === 'fail') {
        // ? Should we throw error in thunk functions?
        throw new Error(threadsData.message);
      }

      dispatch(
        threadsAction.neutralizeUpVote({
          threadId,
          userId: authUser.id,
        }),
      );
    };
  },
  asyncNeutralizeDownVote(threadId) {
    return async (dispatch, getState) => {
      const { authUser } = getState();

      const threadsData = await votesApi.neutralizeThreadVote(threadId);

      if (threadsData.status === 'fail') {
        // ? Should we throw error in thunk functions?
        throw new Error(threadsData.message);
      }

      dispatch(
        threadsAction.neutralizeDownVote({
          threadId,
          userId: authUser.id,
        }),
      );
    };
  },
};
