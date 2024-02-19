import { usersApi } from '@/api';

export const USERS_ACTION_TYPE = {
  SET: 'SET_USERS',
  UNSET: 'UNSET_USERS',
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
      const usersData = await usersApi.seeAllUsers();

      if (usersData.status === 'fail') {
        // ? Should we throw error in thunk functions?
        throw new Error(usersData.message);
      }

      dispatch(usersActions.set(usersData.data.users));
    };
  },
};
