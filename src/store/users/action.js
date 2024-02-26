import { usersApi } from '@/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const USERS_ACTION_TYPE = {
  SET: 'users/set',
  UNSET: 'users/unset',
};

export const usersActions = {
  set(users) {
    return {
      type: USERS_ACTION_TYPE.SET,
      payload: {
        users,
      },
    };
  },
  unset() {
    return {
      type: USERS_ACTION_TYPE.UNSET,
      payload: {},
    };
  },
};

export const usersThunks = {
  asyncSeeAllUsers() {
    return async (dispatch) => {
      dispatch(showLoading());
      const usersData = await usersApi.seeAllUsers();

      if (usersData.status === 'fail') {
        dispatch(hideLoading());
        throw new Error(usersData.message);
      }

      dispatch(usersActions.set(usersData.data.users));
      dispatch(hideLoading());
    };
  },
};
