/* eslint-disable no-param-reassign */
import { tokenHandler } from '@/utils';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://forum-api.dicoding.dev/v1',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = tokenHandler.getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    // TODO: Handle error
    console.error(error);
  },
);

export function createResponse({ status = '', message = '', data = null }) {
  return { status, message, data };
}
