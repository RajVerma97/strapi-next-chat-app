import { NEXT_PUBLIC_BACKEND } from "@/contants/constants";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_BACKEND,
  headers: {
    "ACCESS-CONTROL-ALLOW-ORIGIN": "*",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
