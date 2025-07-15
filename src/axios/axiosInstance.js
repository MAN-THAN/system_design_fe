import axios from "axios";
import { ApiEndpoints } from "../config";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosInstanceForAuth = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach latest token
axiosInstanceForAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor for handling 401
axiosInstanceForAuth.interceptors.response.use(
  (response) => response, // pass through success
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await axiosInstance.post(ApiEndpoints.REFRESH);
        const newAccessToken = res.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axiosInstanceForAuth(originalRequest);
      } catch (refreshError) {
        // Refresh also failed — logout user or redirect
        console.log("Refresh token failed:", refreshError);
        // localStorage.removeItem("accessToken");
        // window.location.href = "/login"; // or use navigate()
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
