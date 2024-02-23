import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// http://localhost:5000/api/cource

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;