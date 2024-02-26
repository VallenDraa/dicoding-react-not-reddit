import { leaderboardApi } from '@/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

export const LEADERBOARD_ACTION_TYPE = {
  SET: 'leaderboard/set',
  UNSET: 'leaderboard/unset',
};

export const leaderboardActions = {
  set(leaderboard) {
    return {
      type: LEADERBOARD_ACTION_TYPE.SET,
      payload: { leaderboard },
    };
  },

  unset() {
    return {
      type: LEADERBOARD_ACTION_TYPE.UNSET,
      payload: {},
    };
  },
};

export const leaderboardThunks = {
  asyncSetLeaderboard() {
    return async (dispatch) => {
      dispatch(showLoading());
      const leaderboardData = await leaderboardApi.seeLeaderboard();

      if (leaderboardData.status === 'fail') {
        dispatch(hideLoading());
        throw new Error(leaderboardData.message);
      }

      dispatch(leaderboardActions.set(leaderboardData.data.leaderboards));
      dispatch(hideLoading());
    };
  },
};
