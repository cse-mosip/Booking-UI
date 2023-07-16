export type Resource = {
    id: string;
    name: string;
    count: number;
}

export type Booking = {
    bookingTitle: string;
    category: Resource;
    ResourceName: string;
    reason?: string;
    bookingDate: any;
    bookingStartTime: any;
    bookingEndTime: any;
    occupants: number;
}

