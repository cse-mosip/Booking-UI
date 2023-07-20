import axios from "src/services/HttpServices";
import ToasterMessage from "src/helpers/ToasterMessage";
import { BookingForm } from 'src/types';
import { formatDate } from "src/helpers/utils";


const getBookings = async (token :string) => {
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.get("/bookings");
    if (response.status === 200) {
      return(response.data.data);
    } else {
      ToasterMessage.errorMessage({
        main_part: 'Could not get bookings!',
      });
      return([]);
    }
  } catch (error) {
    ToasterMessage.errorMessage({
        error: error,
    });
    return([]);
  }
};

const bookResource = async (data :BookingForm, token: string) => {
  const bookingData = {
    user_id: data.username,
    resource_id: data.resourceId,
    reason: data.reason,
    count: data.count,
    booked_date: formatDate(data.bookingDate),
    start_time: data.startDateTime,
    end_time: data.endDateTime,
  };
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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

const findBookingById = async (bookingId: number, token: string) => {
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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

const getBookedTimeSlots = async (resourceId: string, date: string, token :string) => {
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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

const deleteBooking = async (bookingId: number, token: string) => {
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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

const updateBookingStatus = async (bookingId: string, status: string, token :string) => {
  const bookingStatus = { status: status };
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
