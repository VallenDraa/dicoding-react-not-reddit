import { THREAD_DETAIL_ACTION_TYPES } from './action';

export function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case THREAD_DETAIL_ACTION_TYPES.SET:
      return action.payload.threadDetail;

    case THREAD_DETAIL_ACTION_TYPES.UNSET:
      return null;

    case THREAD_DETAIL_ACTION_TYPES.UP_VOTE:
      return {
        ...threadDetail,
        upVotesBy: [...threadDetail.upVotesBy, action.payload.userId],
      };

    case THREAD_DETAIL_ACTION_TYPES.DOWN_VOTE:
      return {
        ...threadDetail,
        downVotesBy: [...threadDetail.downVotesBy, action.payload.userId],
      };

    case THREAD_DETAIL_ACTION_TYPES.NEUTRALIZE_UP_VOTE:
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.filter(
          (vote) => vote !== action.payload.userId,
        ),
      };

    case THREAD_DETAIL_ACTION_TYPES.NEUTRALIZE_DOWN_VOTE:
      return {
        ...threadDetail,
        downVotesBy: threadDetail.downVotesBy.filter(
          (vote) => vote !== action.payload.userId,
        ),
      };

    case THREAD_DETAIL_ACTION_TYPES.ADD_COMMENT:
      return {
        ...threadDetail,
        comments: [action.payload.comment, ...threadDetail.comments],
      };

    case THREAD_DETAIL_ACTION_TYPES.UP_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: [action.payload.userId, ...comment.upVotesBy],
            };
          }

          return comment;
        }),
      };

    case THREAD_DETAIL_ACTION_TYPES.DOWN_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              downVotesBy: [action.payload.userId, ...comment.downVotesBy],
            };
          }

          return comment;
        }),
      };

    case THREAD_DETAIL_ACTION_TYPES.NEUTRALIZE_UP_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter(
                (userId) => userId !== action.payload.userId,
              ),
            };
          }

          return comment;
        }),
      };

    case THREAD_DETAIL_ACTION_TYPES.NEUTRALIZE_DOWN_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              downVotesBy: comment.downVotesBy.filter(
                (userId) => userId !== action.payload.userId,
              ),
            };
          }

          return comment;
        }),
      };

    default:
      return threadDetail;
  }
}
