import axios from 'src/services/HttpServices';

const getResources = async () => {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJzdWIiOiJ5YXNpdGgiLCJpYXQiOjE2ODk1MzEyMTAsImV4cCI6MTY4OTYxNzYxMH0.8VBmgrILvOc1ueoeqNNZ4vJudbFhGEPItxbwMA8itnU";
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const res = await axios.get('/resources',config);
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