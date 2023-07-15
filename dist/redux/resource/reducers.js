import { RESOURCE_REMOVE, RESOURCE_ENQUEUE, } from './types';
const initialState = {
    resources: null,
};
export function resourceReducer(state = initialState, action) {
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
//# sourceMappingURL=reducers.js.map