import axios from "axios";
import { getSingleData } from "../contexts/storage";



const api = axios.create({ baseURL: "http://ec2-52-20-67-24.compute-1.amazonaws.com" });


api.interceptors.request.use(
    async (config) => {
        try {
            const token = await getSingleData("@token");
            config.headers["Authorization"] = `Bearer ${token}`;
        } finally {
            return config;
        }
    },
    (error) => {
        return Promise.reject(error);
    },
    {
        synchronous: false,
    }
);

export default api;
