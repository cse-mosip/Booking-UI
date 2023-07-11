import axios from 'src/services/HttpServices';

const bookingResource = async (data :any) => {
  const res = await axios.post('/bookingResource',data);
  return(res.data);
};

const getBookings = async (data :any) => {
  const res = await axios.post('/getBookings',data);
  return(res.data);
};

const getBookedTimeSlots = async (data :any) => {
  const res = await axios.post('/getBookedTimeSlots',data);
  return(res.data);
};



export default {
  bookingResource,
  getBookedTimeSlots,
  getBookings
};
