import { Resource } from 'src/types';
import { RESOURCE_REMOVE, RESOURCE_ENQUEUE, ResourceActionTypes } from './types';

export function enqueueResources(resources: Resource[]): ResourceActionTypes {
  return {
    type: RESOURCE_ENQUEUE,
    payload: resources,
  };
}

export function removeResources(): ResourceActionTypes {
  return {
    type: RESOURCE_REMOVE,
  };
}
