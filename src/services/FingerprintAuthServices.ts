import axios from "src/services/HttpServices";

const fpAuthenticate = async (
  resourceId: number,
  fingerprintData: any,
  token: string
) => {
  const data = {
    resourceId,
    fingerprint: fingerprintData,
  };

  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.patch("/bookings", data);
    return response;
  } catch (error) {
    return error;
  }
};

export default {
  fpAuthenticate,
};
