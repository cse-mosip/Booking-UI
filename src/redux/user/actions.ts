import { User } from 'src/types';
import { USER_REMOVE, USER_ENQUEUE, UserActionTypes } from './types';

export function enqueueUser(user: User): UserActionTypes {
  return {
    type: USER_ENQUEUE,
    payload: user,
  };
}

export function removeUser(): UserActionTypes {
  return {
    type: USER_REMOVE,
  };
}
