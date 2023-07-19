import Axios from "axios";
import Token from "src/services/token/Token";
import ToasterMessage from "src/helpers/ToasterMessage";

export const baseURL = import.meta.env.REACT_APP_BACKEND_URL;
Axios.defaults.withCredentials = false;
// let bearer_token = Token.getAccessToken();
const axiosInstance = Axios.create({
    withCredentials: false,
    baseURL: baseURL,
    // headers: { Authorization: `Bearer ${bearer_token}` }
})

axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if ([401, 403].includes(error?.response?.status)) {
        ToasterMessage.errorMessage({
            error: error,
            custom_message: "Your session has expired. Please login again."
        })
        // window.location.href = '/'
    }else{
        ToasterMessage.errorMessage({
            error: error,
        });
    }
    return Promise.reject(error);
});

export default axiosInstance;