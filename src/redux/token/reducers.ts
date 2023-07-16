import {
    TOKEN_REMOVE, 
    TOKEN_ENQUEUE, 
    TokenActionTypes,
    TokenState,
  } from './types';
  
  const initialState: TokenState = {
    token: null,
  };
  
  export function tokenReducer(state = initialState, action: TokenActionTypes): TokenState {
    switch (action.type) {
      case TOKEN_ENQUEUE:
        return {
          token: action.payload,
        };
      case TOKEN_REMOVE:
        return {
          token: null,
        };
      default:
        return state;
    }
  }
  