import axios from "axios";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import io from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development"
  ? "http://localhost:5003"
  : "https://fullstack-backend-en6u.onrender.com";  // <-- changed here

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLogingIn: false,
  isCheckingAuth: true,
  isUpdateingProfile: false,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data, { withCredentials: true });
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },

  login: async (data) => {
    set({ isLogingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data, { withCredentials: true });
      set({ authUser: res.data });
      toast.success("Logged in Successfully");
      get().connectSocket(); // <-- also connect socket on login success
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLogingIn: false });
    }
  },

  updateProfile: async (data) => {
    set({ isUpdateingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data, { withCredentials: true });
      set({ authUser: res.data });
      toast.success("Profilepic is Updated Successfully");
      get().connectSocket();
    } catch (error) {
      console.log("Error in the update profilepic:", error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      set({ isUpdateingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: { userId: authUser._id },
      withCredentials: true,  // add this to allow cookies/auth if needed
    });
    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (onlineUsersIds) => {
      set({ onlineUsers: onlineUsersIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
