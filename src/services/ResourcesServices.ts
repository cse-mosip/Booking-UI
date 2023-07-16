import axios from 'src/services/HttpServices';

const getResources = async () => {
    const res = await axios.get('/resources');
    return(res.data);
};

const createResource = async (data :any) => {
    const res = await axios.post('/resources',data);
    return(res.data);
};

export default {
    getResources,
    createResource
};