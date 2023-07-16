import axios from 'src/services/HttpServices';
import ToasterMessage from "src/helpers/ToasterMessage";

const bookingResource = async (data :any) => {
  try {
    const res = await axios.post('/bookingResource',data);
    if (res.status === 200) {
        ToasterMessage.SuccessMessage("Booking resource successfully");
        return(res.data);
    }else{
      ToasterMessage.errorMessage({
        main_part: 'Booking resource failed!',
      });
      return(false)
    }
  } catch (error) {
    ToasterMessage.errorMessage({
        error: error,
    });
    return(false);
  }
};

const getBookings = async (data :any) => {
  const res = await axios.post('/getBookings',data);
  return(res.data);
};

const getBookedTimeSlots = async (data :any) => {
  try {
    const res = await axios.post('/getBookedTimeSlots',data);
    if (res.status === 200) {
        ToasterMessage.SuccessMessage("Get time slots successfully");
        return(res.data);
    }else{
      ToasterMessage.errorMessage({
        main_part: 'Getting time slots failed!',
      });
      return(false)
    }
  } catch (error) {
    ToasterMessage.errorMessage({
        error: error,
    });
    return(false);
  }
};

const getBookingsForResource = async (date:Date, id:number)=>{
  try{
    const res = await axios.get('/');
  }catch (e) {

  }
}


export default {
  bookingResource,
  getBookedTimeSlots,
  getBookings
};
