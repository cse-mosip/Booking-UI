import Token from "src/services/token/Token";
import ToasterMessage from "src/helpers/ToasterMessage";
import axios from "src/services/HttpServices";

const login = async (username: string, password: string) => {
  const data = {
    username,
    password,
  };

  try {
    const response = await axios.post("/auth/login", data);
    if(response.status === 200 || response.status === 202){
      const token:string = response.data.data.token;
      const user:any = Token.getAuth(token);
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
  const data = {
    username: '',
    token,
  };

  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.post("/auth/logout", data);
    if(response.status === 200 || response.status === 202){
      window.location.href = '/'
    }
  } catch (error) {
    ToasterMessage.errorMessage({
      custom_message: "Logout failed!",
    });
  }
};

export default {
  login,
  logout,
};
