import {
    BOOKING_REMOVE, 
    BOOKING_ENQUEUE, 
    BookingActionTypes,
    BookingState,
  } from './types';
  
  const initialState: BookingState = {
    booking: null,
  };
  
  export function bookingReducer(state = initialState, action: BookingActionTypes): BookingState {
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
  