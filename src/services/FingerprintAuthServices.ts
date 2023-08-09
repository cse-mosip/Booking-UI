import axios from "src/services/HttpServices";

const fpAuthenticate = async (resourceId: number, fingerprintData: any) => {
  const data = {
    resourceId,
    fingerprint: fingerprintData,
  };

  try {
    const response = await axios.patch("/bookings", data);
    return response;
  } catch (error) {
    return error;
  }
};

export default {
  fpAuthenticate,
};
