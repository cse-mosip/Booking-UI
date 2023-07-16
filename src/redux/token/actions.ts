import { TOKEN_REMOVE, TOKEN_ENQUEUE, TokenActionTypes } from './types';

export function enqueueToken(token: string): TokenActionTypes {
  return {
    type: TOKEN_ENQUEUE,
    payload: token,
  };
}

export function removeToken(): TokenActionTypes {
  return {
    type: TOKEN_REMOVE,
  };
}
