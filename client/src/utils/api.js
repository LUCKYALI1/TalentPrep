import axios from 'axios';

const api = axios.create({
    // Yeh sahi hai, direct port 3000 ke endpoint ko target kar raha hai
    baseURL: import.meta.env.VITE_baseURL || "http://localhost:3000/api/v1",
    withCredentials: true, 
});

export default api;