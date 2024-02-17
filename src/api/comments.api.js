import { AxiosError } from 'axios';
import { axiosInstance, createResponse } from './api';

export const commentsApi = {
  async createThreadComment({ threadId, content }) {
    try {
      const response = await axiosInstance.post(
        `/threads/${threadId}/comments`,
        { content },
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return (
          error.response.data ||
          createResponse({
            status: 'fail',
            message: 'fail to create thread comment',
          })
        );
      }

      return createResponse({
        status: 'fail',
        message: 'fail to create thread comment',
      });
    }
  },
};
