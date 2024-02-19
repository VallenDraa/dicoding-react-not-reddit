import { LEADERBOARD_ACTION_TYPE } from './action';

export function leaderboardReducer(leaderboard = null, action = {}) {
  switch (action.type) {
    case LEADERBOARD_ACTION_TYPE.SET:
      return action.payload.leaderboard;

    case LEADERBOARD_ACTION_TYPE.UNSET:
      return null;

    default:
      return leaderboard;
  }
}
