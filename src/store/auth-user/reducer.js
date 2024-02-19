import { AUTH_USER_ACTION_TYPE } from './action';

export function authUserReducer(authUser = null, action = {}) {
  switch (action.type) {
    case AUTH_USER_ACTION_TYPE.SET:
      return action.payload.authUser;

    case AUTH_USER_ACTION_TYPE.UNSET:
      return null;

    default:
      return authUser;
  }
}
