import { USERS_ACTION_TYPE } from './action';

export function usersReducer(users = null, action = {}) {
  switch (action.type) {
    case USERS_ACTION_TYPE.SET:
      return action.payload.users;

    case USERS_ACTION_TYPE.UNSET:
      return null;

    default:
      return users;
  }
}
