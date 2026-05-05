import axios from "axios";
import { useNavigate } from "react-router-dom";
const instance = axios.create({
  baseURL: "http://localhost:4000/api",
});

instance.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const navigate = useNavigate();
    if (error.response?.status === 401) {
      localStorage.clear();
      navigate("/login");
    }
    return Promise.reject(error);
  }
);

export default instance;