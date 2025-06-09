import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare,Loader2,Eye,EyeOff } from 'lucide-react';
import AuthimagePattern from '../components/AuthimagePattern';
import {Link} from 'react-router-dom';
const LoginPage = () => {
  const [ShowPassword,setShowPassword]=useState(false);

  const [FormData,setFormData]=useState({
    email:"",
    password:"",
  });

  const {login,isLogingIn}=useAuthStore();

  const handleSubmit = async(e)=>{
    e.preventDefault();

    login(FormData);
  }
 return (
<div className='main-h-screen grid lg:grid-cols-2'>
     {/* left side of the signup page */}
        <div className='flex flex-col justify-center items-center p-6 sm:p-12  '>
            <div className='w-full max-w-md space-y-8'>
                {/* logo */}
            <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
            <div className='size-12 rounded-xl bg-primary/10 flex items-center  justify-center group-hover:bg-primary/20 transition-colors'>
            <MessageSquare className='size-6 text-primary'/>
            </div>
            <h1 className='text-2xl font-bold mt-2'>Welcome Back</h1>
            <p className='text-base-content/60'>Sign in to your account</p>
            </div>
            </div>
            <form onSubmit={handleSubmit} className='space-y-6'>
 
<label className="input input-bordered flex items-center gap-2 ">
    
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path
      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
  <input type="text" className="grow" placeholder="Email" value={FormData.email} onChange={(e)=>{setFormData({...FormData,email:e.target.value})}} />
</label>

<label className="input input-bordered flex items-center gap-2 ">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
      clipRule="evenodd" />
  </svg>
  <input type={ShowPassword?"text":"password"} className="grow" placeholder='password' value={FormData.password} onChange={(e)=>{setFormData({...FormData,password:e.target.value})}} />

  <button className=' inset-y-0 right-0 pr-3 flex items-center ' type='button' onClick={()=>setShowPassword(!ShowPassword)}>
    {
        ShowPassword?(
            <EyeOff className="size-5 text-base-content/40"/>
        ):(
        <Eye className="size-5 text-base-content/40"/>
        )
    }
  </button>
</label>
<label className='flex items-center gap-2' >
<button type='submit' className='input input-bordered w-full text-black hover:bg-indigo-400/60 hover:text-white hover:shadow-md bg-indigo-400' disabled={isLogingIn}>
{isLogingIn?(
   <div className='flex justify-center items-center'>
   <Loader2 className="size-5  animate-spin"/>
   Loading....
   </div>
):(
    "Login"
)}
</button>

</label>
    </form>
    <div className='text-center'>
            <p className=' flex text-base-content/60 justify-center items-center gap-1'>Don't have an account?{""} <Link to="/signup" className='underline text-indigo-400'>Create account</Link> </p>
            </div>
            </div>
   </div>
        <AuthimagePattern
      title="Join our Community"
      subtitle="Connect with friends,share moment, and stay in touch with you"
      />
  </div>
 );
}

export default LoginPage
