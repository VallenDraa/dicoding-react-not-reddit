import { AxiosError } from 'axios';
import { axiosInstance, createResponse } from './api';

export const leaderboardApi = {
  async seeLeaderboard() {
    try {
      const response = await axiosInstance.get(`/leaderboards`);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return (
          error.response.data ||
          createResponse({
            status: 'fail',
            message: 'fail to get leaderboard data',
          })
        );
      }

      return createResponse({
        status: 'fail',
        message: 'fail to get leaderboard data',
      });
    }
  },
};
