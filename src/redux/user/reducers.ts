import {
    USER_REMOVE, 
    USER_ENQUEUE, 
    UserActionTypes,
    UserState,
  } from './types';
  
  const initialState: UserState = {
    user: {username:'nimanthadils'},
  };
  
  export function userReducer(state = initialState, action: UserActionTypes): UserState {
    switch (action.type) {
      case USER_ENQUEUE:
        return {
          user: action.payload,
        };
      case USER_REMOVE:
        return {
          user: null,
        };
      default:
        return state;
    }
  }
  