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

const createResource = async (resourceName: any, resourceCount: any) => {
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

const getResourceById = async (id: any) => {
  try {
    const response = await axios.get(`/resources/${id}`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error occurred while fetching resource by ID:", error);
    throw error;
  }
};

const deleteResource = async (id: any) => {
  try {
    const response = await axios.delete(`/resources/${id}`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error occurred while deleting resource:", error);
    throw error;
  }
};

export default {
  getResources,
  createResource,
  getResourceById,
  deleteResource,
};
