import { AxiosError } from 'axios';
import { axiosInstance, createResponse } from './api';

export const threadsApi = {
  async createThread({ title, body, category = '' }) {
    try {
      const response = await axiosInstance.post('/threads', {
        title,
        body,
        category,
      });

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return (
          error.response.data ||
          createResponse({ status: 'fail', message: 'fail to create thread' })
        );
      }

      return createResponse({
        status: 'fail',
        message: 'fail to create thread',
      });
    }
  },

  async seeAllThreads() {
    try {
      const response = await axiosInstance.get('/threads');

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return (
          error.response.data ||
          createResponse({ status: 'fail', message: 'fail to get all threads' })
        );
      }

      return createResponse({
        status: 'fail',
        message: 'fail to get all threads',
      });
    }
  },

  async seeThreadDetail(threadId) {
    try {
      const response = await axiosInstance.get(`/threads/${threadId}`);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return (
          error.response.data ||
          createResponse({
            status: 'fail',
            message: 'fail to get thread detail',
          })
        );
      }

      return createResponse({
        status: 'fail',
        message: 'fail to get thread detail',
      });
    }
  },
};
