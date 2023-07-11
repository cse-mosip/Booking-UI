import { Resource } from '../../types';

export interface ResourcesState {
  resources: Resource[] | null;
}

export const RESOURCE_ENQUEUE = 'RESOURCE_ENQUEUE';
export const RESOURCE_REMOVE = 'RESOURCE_REMOVE';

interface ResourceEnqueueAction {
  type: typeof RESOURCE_ENQUEUE;
  payload: Resource[];
}

interface ResourceRemoveAction {
  type: typeof RESOURCE_REMOVE;
}

export type ResourceActionTypes = ResourceEnqueueAction | ResourceRemoveAction
