import { BOOKING_REMOVE, BOOKING_ENQUEUE, } from './types';
const initialState = {
    booking: null,
};
export function bookingReducer(state = initialState, action) {
    switch (action.type) {
        case BOOKING_ENQUEUE:
            return {
                booking: action.payload,
            };
        case BOOKING_REMOVE:
            return {
                booking: null,
            };
        default:
            return state;
    }
}
//# sourceMappingURL=reducers.js.map