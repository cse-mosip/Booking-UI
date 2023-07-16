import ToasterMessage from "src/helpers/ToasterMessage";
import axios from "src/services/HttpServices";

const getResources = async () => {
  try {
    const response = await axios.get("/resources");
    if (response.status === 200) {
      return response.data;
    } else {
      ToasterMessage.errorMessage({
        main_part: "Could not get resources!",
      });
      return false;
    }
  } catch (error) {
    ToasterMessage.errorMessage({
      error: error,
    });
    return false;
  }
};

const createResource = async (resourceName: string, resourceCount: number) => {
  const resourceData = { name: resourceName, count: resourceCount };
  try {
    const response = await axios.post("/resources", resourceData);
    if (response.status === 201) {
      return response.data;
    } else {
      ToasterMessage.errorMessage({
        main_part: "Could not create the resource!",
      });
      return false;
    }
  } catch (error) {
    ToasterMessage.errorMessage({
      error: error,
    });
    return false;
  }
};

const getResourceById = async (id: number) => {
  try {
    const response = await axios.get(`/resources/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      ToasterMessage.errorMessage({
        main_part: "Could not find the resource!",
      });
      return false;
    }
  } catch (error) {
    ToasterMessage.errorMessage({
      error: error,
    });
    return false;
  }
};

const deleteResource = async (id: number) => {
  try {
    const response = await axios.delete(`/resources/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      ToasterMessage.errorMessage({
        main_part: "Could not delete the resource!",
      });
      return false;
    }
  } catch (error) {
    ToasterMessage.errorMessage({
      error: error,
    });
    return false;
  }
};

const getAvailableResourceCount = async (id: number, timeslot: string) => {
  try {
    const response = await axios.get(
      `/resources/${id}/available?timeslot=${timeslot}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      ToasterMessage.errorMessage({
        main_part: "Could not get the available resource count!",
      });
      return false;
    }
  } catch (error) {
    ToasterMessage.errorMessage({
      error: error,
    });
    return false;
  }
};

export default {
  getResources,
  createResource,
  getResourceById,
  deleteResource,
  getAvailableResourceCount,
};
