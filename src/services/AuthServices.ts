import axios from "src/services/HttpServices";

const login = async (username: string, password: string) => {
  const data = {
    username,
    password,
  };

  try {
    const response = await axios.post("/auth/login", data);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error occurred during login:", error);
    throw error;
  }
};

const logout = async (username: string, token: string) => {
  const data = {
    username,
    token,
  };

  try {
    const response = await axios.post("/auth/logout", data);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error occurred during logout:", error);
    throw error;
  }
};

export default {
  login,
  logout,
};
