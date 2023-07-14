import axios from "src/services/HttpServices";

const getBookings = async () => {
  try {
    const response = await axios.get("/bookings");
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error occurred while fetching bookings:", error);
    throw error;
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
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error occurred during resource booking:", error);
    throw error;
  }
};

const findBookingById = async (bookingId: number) => {
  try {
    const response = await axios.get(`/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error occurred while finding a booking by ID:", error);
    throw error;
  }
};

const getBookedTimeSlots = async (resourceId: number, date: string) => {
  try {
    const response = await axios.get(
      `/bookings?resource_id=${resourceId}&date=${date}`
    );
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error occurred while fetching booked time slots:", error);
    throw error;
  }
};

const deleteBooking = async (bookingId: number) => {
  try {
    const response = await axios.delete(`/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error occurred while deleting a booking:", error);
    throw error;
  }
};

const updateBookingStatus = async (bookingId: number) => {
  try {
    const response = await axios.put(`/bookings/${bookingId}/status`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error occurred while updating the booking status:", error);
    throw error;
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
