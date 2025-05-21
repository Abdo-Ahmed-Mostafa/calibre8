import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const inLocalhost = (): boolean | null => {
  if (typeof window !== "undefined") {
    return location.hostname === "localhost";
  }
  return null;
};

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// axiosInstance.defaults.withCredentials = true;
// axiosInstance.defaults.withXSRFToken = true;

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (localStorage.getItem("token")) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    if (error.response?.data?.message === "You are not authenticated") {
      // window.location.replace("/");
      // window.localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
