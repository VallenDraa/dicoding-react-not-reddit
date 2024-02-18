import { USERS_ACTION_TYPE } from './action';

export function usersReducer(users = null, action = {}) {
  switch (action.type) {
    case USERS_ACTION_TYPE.SET_USERS:
      return action.payload.users;

    case USERS_ACTION_TYPE.UNSET_USERS:
      return null;

    default:
      return users;
  }
}
