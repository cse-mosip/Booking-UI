import { BOOKING_REMOVE, BOOKING_ENQUEUE } from './types';
export function enqueueBooking(booking) {
    return {
        type: BOOKING_ENQUEUE,
        payload: booking,
    };
}
export function removeBooking() {
    return {
        type: BOOKING_REMOVE,
    };
}
//# sourceMappingURL=actions.js.map