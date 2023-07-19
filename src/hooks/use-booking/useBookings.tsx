import { useEffect, useState } from "react";
import BookingServices from "src/services/BookingServices";
import { Booking } from "src/types";

export const useBookings = (): Booking[] => {
  const [bookingsData, setBookingsData] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookingsData = async () => {
      try {
        const data = await BookingServices.getBookings();
        setBookingsData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookingsData();
  }, []);

  return bookingsData;
};
