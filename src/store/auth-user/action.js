import { authUserApi } from '@/api';
import { tokenHandler } from '@/utils';

export const AUTH_USER_ACTION_TYPE = {
  SET: 'SET_AUTH_USER',
  UNSET: 'UNSET_AUTH_USER',
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
    return async () => {
      const response = await authUserApi.register({
        name,
        email,
        password,
      });

      if (response.status === 'fail') {
        // TODO: Handle error
        throw new Error(response.message);
      }
    };
  },

  asyncLogin({ email, password }) {
    return async (dispatch) => {
      const loginResponse = await authUserApi.login({
        email,
        password,
      });

      if (loginResponse.status === 'fail') {
        // TODO: Handle error
        throw new Error(loginResponse.message);
      }

      tokenHandler.putAccessToken(loginResponse.data.token);

      // Get user data from access token
      const userResponse = await authUserApi.seeOwnProfile();

      if (userResponse.status === 'fail') {
        // TODO: Handle error
        throw new Error(userResponse.message);
      }

      dispatch(authUserActions.set(userResponse.data.user));
    };
  },

  asyncGetAuthUser() {
    return async (dispatch) => {
      const userResponse = await authUserApi.seeOwnProfile();

      if (userResponse.status === 'fail') {
        // TODO: Handle error
        throw new Error(userResponse.message);
      }

      dispatch(authUserActions.set(userResponse.data.user));
    };
  },

  asyncLogout() {
    return (dispatch) => {
      try {
        tokenHandler.deleteAccessToken();
        dispatch(authUserActions.unset());
      } catch (error) {
        // TODO: Handle error
        throw new Error(error);
      }
    };
  },
};
