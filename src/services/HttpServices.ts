import axios from 'axios';
import LoginContainer from "../pages/auth/LoginContainer";

export const baseURL = import.meta.env.REACT_APP_BACKEND_URL;

export default axios.create({ baseURL: baseURL});

