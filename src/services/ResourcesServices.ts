import axios from 'src/services/HttpServices';

const getResources = async () => {
    const res = await axios.get('/getResource');
    return(res.data);
};

const createResource = async (data :any) => {
    const res = await axios.post('/createResource',data);
    return(res.data);
};

export default {
    getResources,
    createResource
};