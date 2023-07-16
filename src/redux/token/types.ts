export interface TokenState {
  token: string | null;
}

export const TOKEN_ENQUEUE = 'TOKEN_ENQUEUE';
export const TOKEN_REMOVE = 'TOKEN_REMOVE';

interface TokenEnqueueAction {
  type: typeof TOKEN_ENQUEUE;
  payload: string;
}

interface TokenRemoveAction {
  type: typeof TOKEN_REMOVE;
}

export type TokenActionTypes = TokenEnqueueAction | TokenRemoveAction
