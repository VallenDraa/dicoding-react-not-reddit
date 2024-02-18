import { configureStore } from '@reduxjs/toolkit';
import { authUserReducer } from '@/store/auth-user';
import { leaderboardReducer } from '@/store/leaderboard';
import { threadsReducer } from '@/store/threads';
import { threadDetailReducer } from '@/store/thread-detail';

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    leaderboard: leaderboardReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
  },
});
