import { authUserApi } from '@/api';
import { tokenHandler } from '@/utils';

export const AUTH_USER_ACTION_TYPE = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

export function setAuthUserActionCreator(authUser) {
  return {
    type: AUTH_USER_ACTION_TYPE.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

export function unsetAuthUserActionCreator() {
  return {
    type: AUTH_USER_ACTION_TYPE.UNSET_AUTH_USER,
    payload: {},
  };
}

export function asyncRegister({ name, email, password }) {
  return async () => {
    const response = await authUserApi.register({
      name,
      email,
      password,
    });

    if (response.status === 'fail') {
      // TODO: Handle error
      console.error(response.message);
    }
  };
}

export function asyncLogin({ email, password }) {
  return async (dispatch) => {
    const loginResponse = await authUserApi.login({
      email,
      password,
    });

    if (loginResponse.status === 'fail') {
      // TODO: Handle error
      console.error(loginResponse.message);
      return;
    }

    tokenHandler.putAccessToken(loginResponse.data.token);

    // Get user data from access token
    const userResponse = await authUserApi.seeOwnProfile();

    if (userResponse.status === 'fail') {
      // TODO: Handle error
      console.error(userResponse.message);
      return;
    }

    dispatch(setAuthUserActionCreator(userResponse.data.user));
  };
}

export function asyncGetAuthUser() {
  return async (dispatch) => {
    const userResponse = await authUserApi.seeOwnProfile();

    if (userResponse.status === 'fail') {
      // TODO: Handle error
      console.error(userResponse.message);
      return;
    }

    dispatch(setAuthUserActionCreator(userResponse.data.user));
  };
}

export function asyncLogout() {
  return (dispatch) => {
    try {
      tokenHandler.deleteAccessToken();
      dispatch(unsetAuthUserActionCreator());
    } catch (error) {
      // TODO: Handle error
      console.error(error);
    }
  };
}
