import Axios from "axios";
import Token from "src/services/token/Token";
import {useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux';
import {enqueueUser, removeUser} from 'src/redux/user/actions';
import { useSelector } from 'react-redux';
import { User } from 'src/types';
import { AppState } from 'src/redux/reducer';
import ToasterMessage from "src/helpers/ToasterMessage";

// import axios from "src/services/HttpServices";

const baseURL = import.meta.env.REACT_APP_BACKEND_URL;
Axios.defaults.withCredentials = false;
const axios = Axios.create({
  withCredentials: false,
  baseURL: baseURL,
})

const login = async (username: string, password: string) => {
  const data = {
    username,
    password,
  };

  try {
    const response = await axios.post("/auth/login", data);
    if(response.status === 200 || response.status === 202){
      const token:string = response.data.data.token;
      Token.setAccessToken(token);
      const user:any = Token.getAuth();
      const role: string = user.role
      const res = {data:response.data, role:role, status:response.data.status, token:token}
      return res
    }
  } catch (error) {
    ToasterMessage.errorMessage({
      custom_message: "Login failed!",
    });
    throw error;
  }
};

const logout = async (token: string) => {
  // const user: User | null = useSelector((state: AppState) => state.user.user);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const data = {
    username: '',
    token,
  };

  try {
    const response = await axios.post("/auth/logout", data);
    if(response.status === 200 || response.status === 202){
      Token.removeAccessToken();
      // dispatch(removeUser());
      // navigate('/login');
    }
  } catch (error) {
    throw error;
  }
};

export default {
  login,
  logout,
};
