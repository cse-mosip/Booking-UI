import axios from "src/services/HttpServices";
import ToasterMessage from "src/helpers/ToasterMessage";

const getBookings = async () => {
  try {
    const response = await axios.get("/bookings");
    if (response.status === 200) {
      return(response.data);
    } else {
      ToasterMessage.errorMessage({
        main_part: 'Could not get bookings!',
      });
      return(false);
    }
  } catch (error) {
    ToasterMessage.errorMessage({
        error: error,
    });
    return(false);
  }
};

const bookResource = async (
  username: string,
  resourceId: number,
  reason: string,
  count: number,
  startDateTime: string,
  endDateTime: string
) => {
  const bookingData = {
    username: username,
    resourceId: resourceId,
    reason: reason,
    count: count,
    startDateTime: startDateTime,
    endDateTime: endDateTime,
  };
  try {
    const response = await axios.post("/bookings", bookingData);
    if (response.status === 200) {
      return(response.data);
    } else {
      ToasterMessage.errorMessage({
        main_part: 'Could not create the booking!',
      });
      return(false);
    }
  } catch (error) {
    ToasterMessage.errorMessage({
        error: error,
    });
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
    ToasterMessage.errorMessage({
        error: error,
    });
    return(false);
  }
};

const getBookedTimeSlots = async (resourceId: number, date: string) => {
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
    ToasterMessage.errorMessage({
        error: error,
    });
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
    ToasterMessage.errorMessage({
        error: error,
    });
    return(false);
  }
};

const updateBookingStatus = async (bookingId: number, status: string) => {
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
    ToasterMessage.errorMessage({
        error: error,
    });
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
