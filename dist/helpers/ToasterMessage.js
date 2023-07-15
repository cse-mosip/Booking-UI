import { toast } from "react-toastify";
const errorMessage = ({ error, main_part = 'REQUEST FAILED', default_message = 'UNKNOWN ERROR OCCURRED', custom_message = '' }) => {
    var _a;
    // console.log("error response message : ", error?.response?.data?.message);
    // console.log("error response :", error?.response);
    let message = '';
    if (error) {
        message = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status;
    }
    message = message ? main_part + " " + message + " ERROR OCCURRED" : main_part + " " + default_message;
    message = custom_message ? custom_message : message;
    toast.error(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};
const SuccessMessage = (message = 'REQUEST SUCCESSFUL') => {
    toast.success(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};
export default {
    errorMessage,
    SuccessMessage
};
//# sourceMappingURL=ToasterMessage.js.map