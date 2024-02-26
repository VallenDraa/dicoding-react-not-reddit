import { commentsApi, threadsApi, votesApi } from '@/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const THREAD_DETAIL_ACTION_TYPES = {
  // Thread detail action types
  SET: 'SET_THREAD_DETAIL',
  UNSET: 'UNSET_THREAD_DETAIL',

  // Thread detail vote action types
  UP_VOTE: 'UP_VOTE_THREAD_DETAIL',
  DOWN_VOTE: 'DOWN_VOTE_THREAD_DETAIL',
  NEUTRALIZE_UP_VOTE: 'NEUTRALIZE_UP_VOTE_THREAD_DETAIL',
  NEUTRALIZE_DOWN_VOTE: 'NEUTRALIZE_DOWN_VOTE_THREAD_DETAIL',

  // Comment and comment vote action types
  ADD_COMMENT: 'ADD_COMMENT_THREAD_DETAIL',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT_THREAD_DETAIL',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT_THREAD_DETAIL',
  NEUTRALIZE_UP_VOTE_COMMENT: 'NEUTRALIZE_UP_VOTE_COMMENT_THREAD_DETAIL',
  NEUTRALIZE_DOWN_VOTE_COMMENT: 'NEUTRALIZE_DOWN_VOTE_COMMENT_THREAD_DETAIL',
};

export const threadDetailActions = {
  // Thread detail action types
  set(threadDetail) {
    return {
      type: THREAD_DETAIL_ACTION_TYPES.SET,
      payload: {
        threadDetail,
      },
    };
  },
  unset() {
    return {
      type: THREAD_DETAIL_ACTION_TYPES.UNSET,
      payload: {},
    };
  },

  // Thread detail vote action
  upvote({ threadId, userId }) {
    return {
      type: THREAD_DETAIL_ACTION_TYPES.UP_VOTE,
      payload: { threadId, userId },
    };
  },
  downvote({ threadId, userId }) {
    return {
      type: THREAD_DETAIL_ACTION_TYPES.DOWN_VOTE,
      payload: { threadId, userId },
    };
  },
  neutralizeUpvote({ threadId, userId }) {
    return {
      type: THREAD_DETAIL_ACTION_TYPES.NEUTRALIZE_UP_VOTE,
      payload: { threadId, userId },
    };
  },
  neutralizeDownvote({ threadId, userId }) {
    return {
      type: THREAD_DETAIL_ACTION_TYPES.NEUTRALIZE_DOWN_VOTE,
      payload: { threadId, userId },
    };
  },

  // Comment and comment vote action types
  addComment({ threadId, comment }) {
    return {
      type: THREAD_DETAIL_ACTION_TYPES.ADD_COMMENT,
      payload: { threadId, comment },
    };
  },
  upvoteComment({ commentId, userId }) {
    return {
      type: THREAD_DETAIL_ACTION_TYPES.UP_VOTE_COMMENT,
      payload: {
        commentId,
        userId,
      },
    };
  },
  downvoteComment({ commentId, userId }) {
    return {
      type: THREAD_DETAIL_ACTION_TYPES.DOWN_VOTE_COMMENT,
      payload: { commentId, userId },
    };
  },
  neutralizeUpvoteComment({ commentId, userId }) {
    return {
      type: THREAD_DETAIL_ACTION_TYPES.NEUTRALIZE_UP_VOTE_COMMENT,
      payload: { commentId, userId },
    };
  },
  neutralizeDownvoteComment({ commentId, userId }) {
    return {
      type: THREAD_DETAIL_ACTION_TYPES.NEUTRALIZE_DOWN_VOTE_COMMENT,
      payload: { commentId, userId },
    };
  },
};

export const threadDetailThunks = {
  // Thread detail thunk
  asyncSet(threadId) {
    return async (dispatch) => {
      dispatch(showLoading());
      const threadDetailData = await threadsApi.seeThreadDetail(threadId);

      if (threadDetailData.status === 'fail') {
        dispatch(hideLoading());
        throw new Error(threadDetailData.message);
      }

      dispatch(threadDetailActions.set(threadDetailData.data.detailThread));
      dispatch(hideLoading());
    };
  },

  // Thread detail vote thunk
  asyncUpvote(threadId) {
    return async (dispatch, getState) => {
      dispatch(showLoading());
      const { authUser } = getState();

      const votesData = await votesApi.upvoteThread(threadId);

      if (votesData.status === 'fail') {
        dispatch(hideLoading());
        throw new Error(votesData.message);
      }

      dispatch(
        threadDetailActions.upvote({
          threadId,
          userId: authUser.id,
        }),
      );
      dispatch(hideLoading());
    };
  },
  asyncDownvote(threadId) {
    return async (dispatch, getState) => {
      dispatch(showLoading());
      const { authUser } = getState();

      const votesData = await votesApi.downvoteThread(threadId);

      if (votesData.status === 'fail') {
        dispatch(hideLoading());
        throw new Error(votesData.message);
      }

      dispatch(
        threadDetailActions.downvote({
          threadId,
          userId: authUser.id,
        }),
      );
      dispatch(hideLoading());
    };
  },
  asyncNeutralizeUpvote(threadId) {
    return async (dispatch, getState) => {
      dispatch(showLoading());
      const { authUser } = getState();

      const votesData = await votesApi.neutralizeThreadVote(threadId);

      if (votesData.status === 'fail') {
        dispatch(hideLoading());
        throw new Error(votesData.message);
      }

      dispatch(
        threadDetailActions.neutralizeUpvote({
          threadId,
          userId: authUser.id,
        }),
      );
      dispatch(hideLoading());
    };
  },
  asyncNeutralizeDownvote(threadId) {
    return async (dispatch, getState) => {
      dispatch(showLoading());
      const { authUser } = getState();

      const votesData = await votesApi.neutralizeThreadVote(threadId);

      if (votesData.status === 'fail') {
        dispatch(hideLoading());
        throw new Error(votesData.message);
      }

      dispatch(
        threadDetailActions.neutralizeDownvote({
          threadId,
          userId: authUser.id,
        }),
      );
      dispatch(hideLoading());
    };
  },

  // Comment and comment vote action types
  asyncAddComment({ threadId, content }) {
    return async (dispatch) => {
      dispatch(showLoading());
      const commentData = await commentsApi.createThreadComment({
        threadId,
        content,
      });

      if (commentData.status === 'fail') {
        dispatch(hideLoading());
        throw new Error(commentData.message);
      }

      dispatch(
        threadDetailActions.addComment({
          threadId,
          comment: commentData.data.comment,
        }),
      );
      dispatch(hideLoading());
    };
  },
  asyncUpvoteComment({ commentId, threadId }) {
    return async (dispatch, getState) => {
      dispatch(showLoading());
      const { authUser } = getState();

      const votesData = await votesApi.upvoteComment({
        commentId,
        threadId,
      });

      if (votesData.status === 'fail') {
        dispatch(hideLoading());
        throw new Error(votesData.message);
      }

      dispatch(
        threadDetailActions.upvoteComment({
          commentId,
          userId: authUser.id,
        }),
      );
      dispatch(hideLoading());
    };
  },
  asyncDownvoteComment({ commentId, threadId }) {
    return async (dispatch, getState) => {
      dispatch(showLoading());
      const { authUser } = getState();

      const votesData = await votesApi.downvoteComment({
        commentId,
        threadId,
      });

      if (votesData.status === 'fail') {
        dispatch(hideLoading());
        throw new Error(votesData.message);
      }

      dispatch(
        threadDetailActions.downvoteComment({
          commentId,
          userId: authUser.id,
        }),
      );
      dispatch(hideLoading());
    };
  },
  asyncNeutralizeUpvoteComment({ commentId, threadId }) {
    return async (dispatch, getState) => {
      dispatch(showLoading());
      const { authUser } = getState();

      const votesData = await votesApi.neutralizeCommentVote({
        commentId,
        threadId,
      });

      if (votesData.status === 'fail') {
        dispatch(hideLoading());
        throw new Error(votesData.message);
      }

      dispatch(
        threadDetailActions.neutralizeUpvoteComment({
          commentId,
          userId: authUser.id,
        }),
      );
      dispatch(hideLoading());
    };
  },
  asyncNeutralizeDownvoteComment({ commentId, threadId }) {
    return async (dispatch, getState) => {
      dispatch(showLoading());
      const { authUser } = getState();

      const votesData = await votesApi.neutralizeCommentVote({
        commentId,
        threadId,
      });

      if (votesData.status === 'fail') {
        dispatch(hideLoading());
        throw new Error(votesData.message);
      }

      dispatch(
        threadDetailActions.neutralizeDownvoteComment({
          commentId,
          userId: authUser.id,
        }),
      );
      dispatch(hideLoading());
    };
  },
};
