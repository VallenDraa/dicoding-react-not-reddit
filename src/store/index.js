import { configureStore } from '@reduxjs/toolkit';
import { authUserReducer } from '@/store/auth-user';
import { leaderboardReducer } from '@/store/leaderboard';

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    leaderboard: leaderboardReducer,
  },
});
