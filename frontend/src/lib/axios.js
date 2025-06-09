import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === "development" 
    ? "http://localhost:5003/api" 
    : "https://fullstack-backend-en6u.onrender.com/api",
  withCredentials: true,  // <--- This is important
});
