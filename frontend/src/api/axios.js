import axios from "axios";
const instance = axios.create({
baseURL: import.meta.env.VITE_API_URL,
//baseURL: import.meta.env.VITE_API_LOCALHOST,
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
    const token = localStorage.getItem("token");
    const url = error.config?.url;

    if (error.response?.status === 401 && token
      && url !== "/auth/login"
    ) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;