import { Booking } from 'src/types';

export interface BookingState {
  booking: Booking | null;
}

export const BOOKING_ENQUEUE = 'BOOKING_ENQUEUE';
export const BOOKING_REMOVE = 'BOOKING_REMOVE';

interface BookingEnqueueAction {
  type: typeof BOOKING_ENQUEUE;
  payload: Booking;
}

interface BookingRemoveAction {
  type: typeof BOOKING_REMOVE;
}

export type BookingActionTypes = BookingEnqueueAction | BookingRemoveAction
