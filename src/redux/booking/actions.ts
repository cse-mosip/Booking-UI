import { Booking } from 'src/types';
import { BOOKING_REMOVE, BOOKING_ENQUEUE, BookingActionTypes } from './types';

export function enqueueBooking(booking: Booking): BookingActionTypes {
  return {
    type: BOOKING_ENQUEUE,
    payload: booking,
  };
}

export function removeBooking(): BookingActionTypes {
  return {
    type: BOOKING_REMOVE,
  };
}
