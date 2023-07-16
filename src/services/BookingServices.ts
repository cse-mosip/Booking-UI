import axios from "src/services/HttpServices";
import ToasterMessage from "src/helpers/ToasterMessage";
import { BookingForm } from 'src/types';
import { bookingsData } from "src/pages/view-bookings/examples";


const getBookings = async () => {
  try {
    const response = await axios.get("/bookings");
    if (response.status === 200) {
      return(response.data);
    } else {
      ToasterMessage.errorMessage({
        main_part: 'Could not get bookings!',
      });
      return(bookingsData);
    }
  } catch (error) {
    ToasterMessage.errorMessage({
        error: error,
    });
    return(bookingsData);
  }
};

const bookResource = async (data :BookingForm) => {
  const bookingData = {
    user_id: data.username,
    resource_id: data.resourceId,
    reason: data.reason,
    count: data.count,
    booked_date: data.bookingDate,
    start_time: data.startDateTime,
    end_time: data.endDateTime,
  };
  try {
    const response = await axios.post("/bookings", bookingData);
    if (response.status === 201) {
      return(response.data);
    } else {
      ToasterMessage.errorMessage({
        main_part: 'Could not create the booking!',
      });
      return(false);
    }
  } catch (error) {
    return(false);
  }
};

const findBookingById = async (bookingId: number) => {
  try {
    const response = await axios.get(`/bookings/${bookingId}`);
    if (response.status === 200) {
      return(response.data);
    } else {
      ToasterMessage.errorMessage({
        main_part: 'Could not find the booking!',
      });
      return(false);
    }
  } catch (error) {
    return(false);
  }
};

const getBookedTimeSlots = async (resourceId: string, date: string) => {
  try {
    const response = await axios.get(
      `/bookings?resource_id=${resourceId}&date=${date}`
    );
    if (response.status === 200) {
      return(response.data);
    } else {
      ToasterMessage.errorMessage({
        main_part: 'Could not get timeslots!',
      });
      return(false);
    }
  } catch (error) {
    return(false);
  }
};

const deleteBooking = async (bookingId: number) => {
  try {
    const response = await axios.delete(`/bookings/${bookingId}`);
    if (response.status === 200) {
      return(response.data);
    } else {
      ToasterMessage.errorMessage({
        main_part: 'Could not delete the booking!',
      });
      return(false);
    }
  } catch (error) {
    return(false);
  }
};

const updateBookingStatus = async (bookingId: string, status: string) => {
  const bookingStatus = { status: status };
  try {
    const response = await axios.patch(
      `/bookings/${bookingId}/status`,
      bookingStatus
    );
    if (response.status === 200) {
      return(response.data);
    } else {
      ToasterMessage.errorMessage({
        main_part: 'Could not update the status!',
      });
      return(false);
    }
  } catch (error) {
    return(false);
  }
};

export default {
  getBookings,
  bookResource,
  findBookingById,
  getBookedTimeSlots,
  deleteBooking,
  updateBookingStatus,
};
