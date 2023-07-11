export type Resource = {
    id: string;
    name: string;
    category: string;
    description: string;
}

export type Booking = {
    userInfo: string;
    resource: Resource;
    date: string;
    time: string;
    duration: string;
    description: string;
}
