import { useEffect, useState } from "react";
import BookingServices from "src/services/BookingServices";
import { Booking, User } from "src/types";
import { useSelector } from 'react-redux';
import { AppState } from 'src/redux/reducer';

export const useBookings = (): Booking[] => {
  const [bookingsData, setBookingsData] = useState<Booking[]>([]);
  const user: User | null = useSelector((state: AppState) => state.user.user);

  useEffect(() => {
    const fetchBookingsData = async () => {
      try {
        const token = user.token;
        const data = await BookingServices.getBookings(token);
        setBookingsData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookingsData();
  }, []);

  return bookingsData;
};
