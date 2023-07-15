var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'src/services/HttpServices';
import ToasterMessage from "src/helpers/ToasterMessage";
const bookingResource = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield axios.post('/bookingResource', data);
        if (res.status === 200) {
            ToasterMessage.SuccessMessage("Booking resource successfully");
            return (res.data);
        }
        else {
            ToasterMessage.errorMessage({
                main_part: 'Booking resource failed!',
            });
            return (false);
        }
    }
    catch (error) {
        ToasterMessage.errorMessage({
            error: error,
        });
        return (false);
    }
});
const getBookings = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios.post('/getBookings', data);
    return (res.data);
});
const getBookedTimeSlots = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield axios.post('/getBookedTimeSlots', data);
        if (res.status === 200) {
            ToasterMessage.SuccessMessage("Get time slots successfully");
            return (res.data);
        }
        else {
            ToasterMessage.errorMessage({
                main_part: 'Getting time slots failed!',
            });
            return (false);
        }
    }
    catch (error) {
        ToasterMessage.errorMessage({
            error: error,
        });
        return (false);
    }
});
export default {
    bookingResource,
    getBookedTimeSlots,
    getBookings
};
//# sourceMappingURL=BookingServices.js.map