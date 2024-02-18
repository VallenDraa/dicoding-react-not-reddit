import { usersApi } from '@/api';

export const USERS_ACTION_TYPE = {
  SET_USERS: 'SET_USERS',
  UNSET_USERS: 'UNSET_USERS',
};

export function setUsersActionCreator(users) {
  return {
    type: USERS_ACTION_TYPE.SET_USERS,
    payload: {
      users,
    },
  };
}

export function asyncSeeAllUsers() {
  return async (dispatch) => {
    const threadsData = await usersApi.seeAllUsers();

    if (threadsData.status === 'fail') {
      // ? Should we throw error in thunk functions?
      throw new Error(threadsData.message);
    }

    dispatch(setUsersActionCreator(threadsData.data.users));
  };
}
