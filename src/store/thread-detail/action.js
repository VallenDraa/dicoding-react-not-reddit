import { commentsApi, threadsApi, votesApi } from '@/api';

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
      const threadDetailData = await threadsApi.seeThreadDetail(threadId);

      if (threadDetailData.status === 'fail') {
        // ? Should we throw error in thunk functions?
        throw new Error(threadDetailData.message);
      }

      dispatch(threadDetailActions.set(threadDetailData.data.detailThread));
    };
  },

  // Thread detail vote thunk
  asyncUpvote(threadId) {
    return async (dispatch, getState) => {
      const { authUser } = getState();

      const votesData = await votesApi.upvoteThread({
        threadId,
        userId: authUser.id,
      });

      if (votesData.status === 'fail') {
        // ? Should we throw error in thunk functions?
        throw new Error(votesData.message);
      }

      dispatch(
        threadDetailActions.upvote({
          threadId,
          userId: authUser.id,
        }),
      );
    };
  },
  asyncDownvote(threadId) {
    return async (dispatch, getState) => {
      const { authUser } = getState();

      const votesData = await votesApi.downvoteThread({
        threadId,
        userId: authUser.id,
      });

      if (votesData.status === 'fail') {
        // ? Should we throw error in thunk functions?
        throw new Error(votesData.message);
      }

      dispatch(
        threadDetailActions.downvote({
          threadId,
          userId: authUser.id,
        }),
      );
    };
  },
  asyncNeutralizeUpvote(threadId) {
    return async (dispatch, getState) => {
      const { authUser } = getState();

      const votesData = await votesApi.neutralizeThreadVote({
        threadId,
        userId: authUser.id,
      });

      if (votesData.status === 'fail') {
        // ? Should we throw error in thunk functions?
        throw new Error(votesData.message);
      }

      dispatch(
        threadDetailActions.neutralizeUpvote({
          threadId,
          userId: authUser.id,
        }),
      );
    };
  },
  asyncNeutralizeDownvote(threadId) {
    return async (dispatch, getState) => {
      const { authUser } = getState();

      const votesData = await votesApi.neutralizeThreadVote({
        threadId,
        userId: authUser.id,
      });

      if (votesData.status === 'fail') {
        // ? Should we throw error in thunk functions?
        throw new Error(votesData.message);
      }

      dispatch(
        threadDetailActions.neutralizeDownvote({
          threadId,
          userId: authUser.id,
        }),
      );
    };
  },

  // Comment and comment vote action types
  asyncAddComment({ threadId, content }) {
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
        threadDetailActions.addComment({
          threadId,
          comment: commentData.data.comment,
        }),
      );
    };
  },
  asyncUpvoteComment({ commentId, threadId }) {
    return async (dispatch, getState) => {
      const { authUser } = getState();

      const votesData = await votesApi.upvoteComment({
        commentId,
        threadId,
      });

      if (votesData.status === 'fail') {
        // ? Should we throw error in thunk functions?
        throw new Error(votesData.message);
      }

      dispatch(
        threadDetailActions.upvoteComment({
          commentId,
          userId: authUser.id,
        }),
      );
    };
  },
  asyncDownvoteComment({ commentId, threadId }) {
    return async (dispatch, getState) => {
      const { authUser } = getState();

      const votesData = await votesApi.downvoteComment({
        commentId,
        threadId,
      });

      if (votesData.status === 'fail') {
        // ? Should we throw error in thunk functions?
        throw new Error(votesData.message);
      }

      dispatch(
        threadDetailActions.downvoteComment({
          commentId,
          userId: authUser.id,
        }),
      );
    };
  },
  asyncNeutralizeUpvoteComment({ commentId, threadId }) {
    return async (dispatch, getState) => {
      const { authUser } = getState();

      const votesData = await votesApi.neutralizeCommentVote({
        commentId,
        threadId,
      });

      if (votesData.status === 'fail') {
        // ? Should we throw error in thunk functions?
        throw new Error(votesData.message);
      }

      dispatch(
        threadDetailActions.neutralizeUpvoteComment({
          commentId,
          userId: authUser.id,
        }),
      );
    };
  },
  asyncNeutralizeDownvoteComment({ commentId, threadId }) {
    return async (dispatch, getState) => {
      const { authUser } = getState();

      const votesData = await votesApi.neutralizeCommentVote({
        commentId,
        threadId,
      });

      if (votesData.status === 'fail') {
        // ? Should we throw error in thunk functions?
        throw new Error(votesData.message);
      }

      dispatch(
        threadDetailActions.neutralizeDownvoteComment({
          commentId,
          userId: authUser.id,
        }),
      );
    };
  },
};
