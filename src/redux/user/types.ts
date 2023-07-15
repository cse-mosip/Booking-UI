import { User } from '../../types';

export interface UserState {
  user: User | null;
}

export const USER_ENQUEUE = 'USER_ENQUEUE';
export const USER_REMOVE = 'USER_REMOVE';

interface UserEnqueueAction {
  type: typeof USER_ENQUEUE;
  payload: User;
}

interface UserRemoveAction {
  type: typeof USER_REMOVE;
}

export type UserActionTypes = UserEnqueueAction | UserRemoveAction
