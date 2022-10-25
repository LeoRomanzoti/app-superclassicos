import axios from "axios";
import { getSingleData } from "../contexts/storage";

const api = axios.create({ baseURL: "http://44.212.47.51:3000" });

api.interceptors.request.use(
    async (config) => {
        try {
            const token = await getSingleData('@token')
            config.headers['Authorization'] = `Bearer ${token}`
        } finally {
            return config
        }
    },
    (error) => {
        return Promise.reject(error);
    },
    {
        synchronous: false
    }
)


export default api;
