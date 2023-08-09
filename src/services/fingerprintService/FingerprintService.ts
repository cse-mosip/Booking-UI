import Axios from "axios";

export const baseURL = import.meta.env.REACT_APP_FINGERPRINT_SERVICE_URL;
Axios.defaults.withCredentials = false;
const axiosInstance = Axios.create({
  withCredentials: false,
  baseURL: baseURL,
});

const getFingerprint = async () => {
  const data = {
    deviceSubId: "3",
  };

  try {
    console.log(baseURL);
    const response = await axiosInstance.post("/", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default {
  getFingerprint,
};
