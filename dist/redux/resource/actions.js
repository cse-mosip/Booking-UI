import { RESOURCE_REMOVE, RESOURCE_ENQUEUE } from './types';
export function enqueueResources(resources) {
    return {
        type: RESOURCE_ENQUEUE,
        payload: resources,
    };
}
export function removeResources() {
    return {
        type: RESOURCE_REMOVE,
    };
}
//# sourceMappingURL=actions.js.map