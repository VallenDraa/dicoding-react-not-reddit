import { leaderboardApi } from '@/api';

export const LEADERBOARD_ACTION_TYPE = {
  SET: 'SET_LEADERBOARD',
  UNSET: 'UNSET_LEADERBOARD',
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
      const leaderboardData = await leaderboardApi.seeLeaderboard();

      if (leaderboardData.status === 'fail') {
        // ? Should we throw error in thunk functions?
        throw new Error(leaderboardData.message);
      }

      dispatch(leaderboardActions.set(leaderboardData.data.leaderboards));
    };
  },
};
