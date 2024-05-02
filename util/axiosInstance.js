import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/elibrary-0.0.1-SNAPSHOT",
});

export default axiosInstance;
