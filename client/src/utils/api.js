import axios from 'axios'


const API = axios.create({
    baseURL: 'https://lms-app-mern.onrender.com/api/v1',
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('authToken');
    if(token){
        req.headers.Authorization = `Bearer ${token}`;

    }
    return req;
})

export default API;