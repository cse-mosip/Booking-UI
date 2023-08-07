import ToasterMessage from "src/helpers/ToasterMessage";
import axios from "src/services/HttpServices";

const getResources = async (token :string) => {
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
    return false;
  }
};

const createResource = async (resourceName: string, resourceCount: number, token :string) => {
  const resourceData = { name: resourceName, count: resourceCount };
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
    return false;
  }
};

const updateResource = async(id:number,name, count, token :string)=>{
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.put(`/resources/${id}`,{name,count});
    if (response.status === 200) {
      return response.data;
    } else {
      ToasterMessage.errorMessage({
        main_part: "Could not update the resource!",
      });
      return false;
    }
  } catch (error) {
    return false;
  }
}

const getResourceById = async (id: number, token :string) => {
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
    return false;
  }
};

const deleteResource = async (id: number, token :string) => {
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
    return false;
  }
};

const getAvailableResourceCount = async (id: number, timeslot: string, token :string) => {
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
    return false;
  }
};

export default {
    getResources,
    createResource,
    updateResource,
    getAvailableResourceCount,
    deleteResource,
    getResourceById
};