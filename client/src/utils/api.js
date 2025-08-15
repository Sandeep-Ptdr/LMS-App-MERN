import axios from 'axios'

const backendUrl = import.meta.env.VITE_BACKEND_URI;


const API = axios.create({

      

    baseURL: `${backendUrl}/api/v1`,
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('authToken');
    if(token){
        req.headers.Authorization = `Bearer ${token}`;

    }
    return req;
})

export default API;