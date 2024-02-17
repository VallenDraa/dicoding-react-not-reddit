import { AxiosError } from 'axios';
import { axiosInstance, createResponse } from './api';

export const usersApi = {
  async register({ name, email, password }) {
    try {
      const response = await axiosInstance.post('/register', {
        name,
        email,
        password,
      });

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return (
          error.response.data ||
          createResponse({ status: 'fail', message: 'fail to register' })
        );
      }

      return createResponse({
        status: 'fail',
        message: 'fail to register',
      });
    }
  },

  async login({ email, password }) {
    try {
      const response = await axiosInstance.post('/login', {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return (
          error.response.data ||
          createResponse({ status: 'fail', message: 'fail to login' })
        );
      }

      return createResponse({ status: 'fail', message: 'fail to login' });
    }
  },

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

  async seeOwnProfile() {
    try {
      const response = await axiosInstance.get('/users/me');

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return (
          error.response.data ||
          createResponse({
            status: 'fail',
            message: 'fail to get your profile',
          })
        );
      }

      return createResponse({
        status: 'fail',
        message: 'fail to get your profile',
      });
    }
  },
};
