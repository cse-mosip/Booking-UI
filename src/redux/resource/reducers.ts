import {
    RESOURCE_REMOVE, 
    RESOURCE_ENQUEUE, 
    ResourceActionTypes,
    ResourcesState,
  } from './types';
  
  const initialState: ResourcesState = {
    resources: null,
  };
  
  export function resourceReducer(state = initialState, action: ResourceActionTypes): ResourcesState {
    switch (action.type) {
      case RESOURCE_ENQUEUE:
        return {
          resources: action.payload,
        };
      case RESOURCE_REMOVE:
        return {
          resources: null,
        };
      default:
        return state;
    }
  }
  