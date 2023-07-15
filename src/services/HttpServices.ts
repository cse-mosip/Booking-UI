import axios from 'axios';

export const APIEndpoint = import.meta.env.API_ENDPOINT;
export default axios.create({ baseURL: APIEndpoint});

