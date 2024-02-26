import { authUserApi } from '@/api';
import { tokenHandler } from '@/utils';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const AUTH_USER_ACTION_TYPE = {
  SET: 'auth-user/set',
  UNSET: 'auth-user/unset',
};

export const authUserActions = {
  set(authUser) {
    return {
      type: AUTH_USER_ACTION_TYPE.SET,
      payload: {
        authUser,
      },
    };
  },

  unset() {
    return {
      type: AUTH_USER_ACTION_TYPE.UNSET,
      payload: {},
    };
  },
};

export const authUserThunks = {
  asyncRegister({ name, email, password }) {
    return async (dispatch) => {
      dispatch(showLoading());

      const response = await authUserApi.register({
        name,
        email,
        password,
      });

      if (response.status === 'fail') {
        dispatch(hideLoading());
        throw new Error(response.message);
      }

      dispatch(hideLoading());
    };
  },

  asyncLogin({ email, password }) {
    return async (dispatch) => {
      const loginResponse = await authUserApi.login({
        email,
        password,
      });

      dispatch(showLoading());

      if (loginResponse.status === 'fail') {
        dispatch(hideLoading());
        throw new Error(loginResponse.message);
      }

      tokenHandler.putAccessToken(loginResponse.data.token);

      // Get user data from access token
      const userResponse = await authUserApi.seeOwnProfile();

      if (userResponse.status === 'fail') {
        dispatch(hideLoading());
        throw new Error(userResponse.message);
      }

      dispatch(authUserActions.set(userResponse.data.user));
      dispatch(hideLoading());
    };
  },

  asyncGetAuthUser() {
    return async (dispatch) => {
      dispatch(showLoading());
      const userResponse = await authUserApi.seeOwnProfile();

      if (userResponse.status === 'fail') {
        dispatch(hideLoading());
        throw new Error(userResponse.message);
      }

      dispatch(authUserActions.set(userResponse.data.user));
      dispatch(hideLoading());
    };
  },

  asyncLogout() {
    return (dispatch) => {
      try {
        dispatch(showLoading());
        tokenHandler.deleteAccessToken();
        dispatch(authUserActions.unset());
      } catch (error) {
        throw new Error(error);
      } finally {
        dispatch(hideLoading());
      }
    };
  },
};
