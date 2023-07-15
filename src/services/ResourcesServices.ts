import axios from "src/services/HttpServices";

const getResources = async () => {
  try {
    const response = await axios.get("/resources");
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error occurred while fetching resources:", error);
    throw error;
  }
};

const createResource = async (resourceName: string, resourceCount: number) => {
  const resourceData = { name: resourceName, count: resourceCount };
  try {
    const response = await axios.post("/resources", resourceData);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error occurred during resource creation:", error);
    throw error;
  }
};

const getResourceById = async (id: number) => {
  try {
    const response = await axios.get(`/resources/${id}`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error occurred while fetching resource by ID:", error);
    throw error;
  }
};

const deleteResource = async (id: number) => {
  try {
    const response = await axios.delete(`/resources/${id}`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error occurred while deleting resource:", error);
    throw error;
  }
};

const getAvailableResourceCount = async (id: number, timeslot: string) => {
  try {
    const response = await axios.get(
      `/resources/${id}/available?timeslot=${timeslot}`
    );
    return response.data;
  } catch (error) {
    // Handle error
    console.error(
      "Error occurred while fetching available resource count:",
      error
    );
    throw error;
  }
};

export default {
  getResources,
  createResource,
  getResourceById,
  deleteResource,
  getAvailableResourceCount,
};
