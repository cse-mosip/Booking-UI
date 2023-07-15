import axios from 'axios';

export const baseURL = import.meta.env.BASE_URL;
export default axios.create({ baseURL: baseURL});

