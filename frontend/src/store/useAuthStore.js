import axios from "axios";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import io from "socket.io-client"
const BASE_URL= import.meta.env.MODE === "development" ? "http://localhost:5003" : "/";
export const useAuthStore = create((set,get)=>({
  authUser:null,
  isSigningUp:false,
  isLogingIn:false,
  isCheckingAuth:true,
  isUpdateingProfile:false,
  onlineUsers:[], 
  socket:null,
  
  checkAuth:async()=>{
    try{
       const res=  await axiosInstance.get("/auth/check");

       set({authUser: res.data});
       get().connectSocket();
       

    }
    catch(error)
    {
        console.log("Error in checkAuth:",error);
        set({authUser:null});
    }
    finally{
        set({isCheckingAuth:false});
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true }); // Indicate signing up process
  
    try {
      const res = await axiosInstance.post("/auth/signup", data, { withCredentials: true });
  
      set({ authUser: res.data }); // Update authenticated user state
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      console.error("Signup error:", error); // Log for debugging
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false }); // Reset signing-up state
    }
  },
  

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({authUser:null});
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },
 login:async (data)=>{
  set({isLogingIn:true});
  try{
     const res= await axiosInstance.post("/auth/login",data,{withCredentials:true});
     set({authUser:res.data});
     toast.success("Logged in Successfully");
  }
  catch(error)
  {
    toast.error(error.response.data.message);
  }
  finally{
    set({isLogingIn:false});
  }
 },
 updateProfile:async (data)=>{
  set({isUpdateingProfile:true})
  try{
      const res = await axiosInstance.put("/auth/update-profile",data,{withCredentials:true});
      set({authUser:res.data});
      toast.success("Profilepic is Updated Successfully");
      get().connectSocket();
  }
  catch(error)
  {
    console.log("Error in the update profilepic:",error);
    toast.error(error.response.data.message);
  }
  finally{
    set({isUpdateingProfile:false});
  }
 },
 connectSocket:()=>{

    const {authUser} = get();
    if(!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL,{
      query:{userId:authUser._id},
    });
    socket.connect();
    set({socket:socket});

    socket.on("getOnlineUsers",(onlineUsersIds)=>{
        set({onlineUsers:onlineUsersIds})
    })

 },
 disconnectSocket:()=>{
  if(get().socket?.connected) get().socket.disconnect();
 }
}));