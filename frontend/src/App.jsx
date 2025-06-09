import React from 'react'
import {  Routes, Route, Navigate } from "react-router-dom";
import HomePage from './Pages/HomePage';
import SignUpPage from './Pages/SignUpPage';
import LoginPage from './Pages/LoginPage';
import SettingsPage from './Pages/SettingsPage';
import ProfilePage from './Pages/ProfilePage';
import { axiosInstance } from './lib/axios';
import { useAuthStore } from './store/useAuthStore';
import {Loader} from "lucide-react"
import { useEffect } from "react";
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/useThemeStore';
function App() {
const {authUser,checkAuth,ischeckingAuth,onlineUsers}= useAuthStore();
const {theme} = useThemeStore();

console.log("online users are:",onlineUsers)
useEffect(()=>{
  checkAuth()
},[checkAuth]);

if(ischeckingAuth && !authUser){
  return(<div className='flex items-center justify-center h-screen'>
  <Loader className="size-10 animate-spin"/>
</div>)
}
  return (
    <div data-theme={theme}>
      <Navbar/>

      <Routes>
        <Route path='/' element={authUser? <HomePage/>: <Navigate to="/login"/>}/>
        <Route path='/signup' element={!authUser?<SignUpPage/>:<Navigate to="/"/>}/>
        <Route path='/login' element={!authUser?<LoginPage/>:<Navigate to="/"/>}/>
        <Route path='/setting' element={<SettingsPage/>}/>
        <Route path='/profile' element={authUser?<ProfilePage/>:<navigate to="/login"/>}/>
        </Routes>
        <Toaster/>
    </div>
  )
}

export default App;
