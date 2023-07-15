import { toast } from "react-toastify";

type ErrorMessage = {
    error?: any;
    main_part?: string;
    default_message?: string;
    custom_message?: string ;
};

const errorMessage = ({
    error,
    main_part = 'REQUEST FAILED',
    default_message = 'UNKNOWN ERROR OCCURRED',
    custom_message = ''
}:ErrorMessage) => {

    // console.log("error response message : ", error?.response?.data?.message);
    // console.log("error response :", error?.response);
    let message = '';
    if(error){
        message = error?.response?.status
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
}

const SuccessMessage = (message = 'REQUEST SUCCESSFUL',) => {

    toast.success(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export default {
    errorMessage,
    SuccessMessage
};