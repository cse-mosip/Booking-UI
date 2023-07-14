import axios from "axios";

export const APIEndpoint = import.meta.env.DOMAIN_NAME;
export default axios.create({ baseURL: APIEndpoint });
