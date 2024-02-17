import { AxiosError } from 'axios';
import { axiosInstance, createResponse } from './api';

export const votesApi = {
  async upvoteThread(threadId) {
    try {
      const response = await axiosInstance.post(`/threads/${threadId}/up-vote`);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return (
          error.response.data ||
          createResponse({
            status: 'fail',
            message: 'fail to upvote thread',
          })
        );
      }

      return createResponse({
        status: 'fail',
        message: 'fail to upvote thread',
      });
    }
  },

  async downvoteThread(threadId) {
    try {
      const response = await axiosInstance.post(
        `/threads/${threadId}/down-vote`,
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return (
          error.response.data ||
          createResponse({
            status: 'fail',
            message: 'fail to downvote thread',
          })
        );
      }

      return createResponse({
        status: 'fail',
        message: 'fail to downvote thread',
      });
    }
  },

  async neutralizeThreadVote(threadId) {
    try {
      const response = await axiosInstance.post(
        `/threads/${threadId}/neutral-vote`,
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return (
          error.response.data ||
          createResponse({
            status: 'fail',
            message: 'fail to neutralize thread vote',
          })
        );
      }

      return createResponse({
        status: 'fail',
        message: 'fail to neutralize thread vote',
      });
    }
  },

  async upvoteComment({ threadId, commentId }) {
    try {
      const response = await axiosInstance.post(
        `/threads/${threadId}/comments/${commentId}/up-vote`,
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return (
          error.response.data ||
          createResponse({
            status: 'fail',
            message: 'fail to upvote comment',
          })
        );
      }

      return createResponse({
        status: 'fail',
        message: 'fail to upvote comment',
      });
    }
  },

  async downvoteComment({ threadId, commentId }) {
    try {
      const response = await axiosInstance.post(
        `/threads/${threadId}/comments/${commentId}/down-vote`,
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return (
          error.response.data ||
          createResponse({
            status: 'fail',
            message: 'fail to downvote comment',
          })
        );
      }

      return createResponse({
        status: 'fail',
        message: 'fail to downvote comment',
      });
    }
  },

  async neutralizeCommentVote({ threadId, commentId }) {
    try {
      const response = await axiosInstance.post(
        `/threads/${threadId}/comments/${commentId}/neutral-vote`,
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return (
          error.response.data ||
          createResponse({
            status: 'fail',
            message: 'fail to neutralize comment vote',
          })
        );
      }

      return createResponse({
        status: 'fail',
        message: 'fail to neutralize comment vote',
      });
    }
  },
};
