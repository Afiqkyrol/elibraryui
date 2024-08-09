import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://mmdis.marine.gov.my/elibrary_api",
});

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:8080/elibrary_api",
// });

export default axiosInstance;
