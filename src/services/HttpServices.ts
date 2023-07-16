import Axios from "axios";
import Token from "src/services/token/Token";
import ToasterMessage from "src/helpers/ToasterMessage";
import { useNavigate } from "react-router-dom"
// --When using refresh token 
// import jwtDecode from "jwt-decode";
// import dayJS from "dayjs";

export const baseURL = import.meta.env.REACT_APP_BACKEND_URL;
Axios.defaults.withCredentials = true;
let bearer_token = Token.getAccessToken();
console.log('bearer_token: ',bearer_token)
const axiosInstance = Axios.create({
    withCredentials: true,
    baseURL: baseURL,
    headers: { Authorization: `Bearer ${bearer_token}` }
})

axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if ([401, 403].includes(error?.response?.status) || Token.getAuth() === null) {
        ToasterMessage.errorMessage({
            error: error,
            custom_message: "Your session has expired. Please login again."
        })
        Token.removeAccessToken();
        const navigate = useNavigate()
        navigate(`/logout`)
        return window.location.href = '/logout';
    }else{
        ToasterMessage.errorMessage({
            error: error,
        });
    }
    return Promise.reject(error);
});

// --When using refresh token 
// axiosInstance.interceptors.request.use(async (req) => {
//     if (!bearer_token) {
//         bearer_token = Token.getAccessToken();
//         req.headers.Authorization = `Bearer ${bearer_token}`
//     }
//     if (bearer_token) {
//         bearer_token = Token.getAccessToken();
//         const user = await jwtDecode(bearer_token);
//         // unix time expired 
//         const isExpired = dayJS(user.exp * 1000).isBefore(dayJS());
//         // console.log("expired :", isExpired);
//         if (!isExpired) {
//             req.headers.Authorization = `Bearer ${bearer_token}`
//             return req;
//         }
//         try {
//             // refresh token in cookie get the request
//             const response = await Axios({
//                 method: "get",
//                 url: baseURL + "/auth/new-token",
//                 // credentials true
//                 withCredentials: true,
//             })
//             // console.log("response :", response);
//             Token.removeAccessToken();
//             bearer_token = response.data.access_token;
//             Token.setAccessToken(response.data.access_token);
//             req.headers.Authorization = `Bearer ${bearer_token}`;
//             // console.log("bearer_token", req.headers.Authorization);
//         } catch (err) {
//             // remove access token when session is expired
//             Token.removeAccessToken();
//             return Promise.reject(err);
//         }
//     }
//     return req;
// })

export default axiosInstance;