import { leaderboardApi } from '@/api';

export const LEADERBOARD_ACTION_TYPE = {
  SET_LEADERBOARD: 'SET_LEADERBOARD',
  UNSET_LEADERBOARD: 'UNSET_LEADERBOARD',
};

export function setLeaderboardActionCreator(leaderboard) {
  return {
    type: LEADERBOARD_ACTION_TYPE.SET_LEADERBOARD,
    payload: { leaderboard },
  };
}

export function unsetLeaderboardActionCreator() {
  return {
    type: LEADERBOARD_ACTION_TYPE.UNSET_LEADERBOARD,
    payload: {},
  };
}

export function asyncSetLeaderboard() {
  return async (dispatch) => {
    const leaderboardData = await leaderboardApi.seeLeaderboard();

    if (leaderboardData.status === 'fail') {
      // ? Should we throw error in thunk functions?
      throw new Error(leaderboardData.message);
    }

    dispatch(setLeaderboardActionCreator(leaderboardData.data.leaderboards));
  };
}
