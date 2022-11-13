import axios from "axios";
import { getSingleData } from "../contexts/storage";



const api = axios.create({ baseURL: "http://ec2-52-44-39-63.compute-1.amazonaws.com" });


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
