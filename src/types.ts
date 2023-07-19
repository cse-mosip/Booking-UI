export type Resource = {
    id: string;
    name: string;
    count: number;
    bookings: Booking[];
}

export type Booking = {
    ResourceName?: string;
    booker?: string;
    reason?: string;
    bookingDate?: any;
    bookingStartTime?: any;
    bookingEndTime?: any;
    occupants?: number;
    id?: string;
    resource?: number;
    userId?: string;
    bookedDate?: string;
    startTime?: string;
    endTime?: string;
    count?: number;
    status?: string;
}

export type User = {
    username: string;
}

export type BookingForm = {
    username?: string,
    resourceId?: number,
    reason?: string,
    count?: number,
    startDateTime?: string,
    endDateTime?: string,
    ResourceName?: string,
    bookingDate?: any,
    bookingEndTime?: any,
    bookingStartTime?: any,
    occupants?: string,
}
