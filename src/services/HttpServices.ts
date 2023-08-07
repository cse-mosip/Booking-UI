import Axios from "axios";
import Token from "src/services/token/Token";
import ToasterMessage from "src/helpers/ToasterMessage";

export const baseURL = import.meta.env.REACT_APP_BACKEND_URL;
Axios.defaults.withCredentials = false;
const axiosInstance = Axios.create({
    withCredentials: false,
    baseURL: baseURL,
})

axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if ([403].includes(error?.response?.status)) {
        ToasterMessage.errorMessage({
            error: error,
            custom_message: "Your session has expired. Please login again."
        })
        // window.location.href = '/'
    }else if([400].includes(error?.response?.status)){
        ToasterMessage.errorMessage({
            error: error,
            custom_message: error.response.data.message
        }) 
    }
    else{
        ToasterMessage.errorMessage({
            error: error,
        });
    }
    return Promise.reject(error);
});

export default axiosInstance;