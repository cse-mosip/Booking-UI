export type Resource = {
    id: string;
    name: string;
    count: number;
    bookings: Booking[];
}

export type Booking = {
    ResourceName: string;
    booker: string;
    reason?: string;
    bookingDate: any;
    bookingStartTime: any;
    bookingEndTime: any;
    occupants: number;
}

export type User = {
    username: string;
    role: string;
    token: string;
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

export const ADMIN = 'ADMIN';
export const RESOURCE_MANAGER = 'RESOURCE_MANAGER';
export const RESOURCE_USER = 'RESOURCE_USER';