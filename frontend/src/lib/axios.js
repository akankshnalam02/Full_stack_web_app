import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://fullstack-backend-en6u.onrender.com/api", // Backend API base URL
  withCredentials: true, // to send cookies for authentication if any
});
