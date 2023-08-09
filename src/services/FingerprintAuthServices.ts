import axios from "src/services/HttpServices";

const fpAuthenticate = async (fingerprintData: any) => {
  const data = {
    status: "IN-USE",
    fingerprint: fingerprintData,
  };

  try {
    const response = await axios.post("/", data);
    return response;
  } catch (error) {
    return error;
  }
};

export default {
  fpAuthenticate,
};
