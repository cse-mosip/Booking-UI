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
    return response.data;
  } catch (error:any) {
    if(error.response.status){
      throw new Error('400');
    }
    throw new Error('unknown');
  }
};

export default {
  fpAuthenticate,
};
