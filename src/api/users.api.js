import { AxiosError } from 'axios';
import { axiosInstance, createResponse } from './api';

export const usersApi = {
  async seeAllUsers() {
    try {
      const response = await axiosInstance.get('/users');

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return (
          error.response.data ||
          createResponse({ status: 'fail', message: 'fail to get users' })
        );
      }

      return createResponse({ status: 'fail', message: 'fail to get users' });
    }
  },
};
