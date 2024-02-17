import { configureStore } from '@reduxjs/toolkit';
import { authUserReducer } from './auth-user';

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
  },
});
