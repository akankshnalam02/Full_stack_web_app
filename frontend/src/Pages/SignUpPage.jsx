import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare, EyeOff, Eye, Loader2 } from 'lucide-react';
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import AuthimagePattern from '../components/AuthimagePattern';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) 
      return toast.error("Enter a valid email format.");
    if (!formData.password) return toast.error("Password is required!");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success===true) {
      await signup(formData);
    }
  };

  return (
    <div className='main-h-screen grid lg:grid-cols-2'>
      {/* Left side of the signup page */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          {/* Logo */}
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className='size-6 text-primary' />
              </div>
              <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
              <p className='text-base-content/60'>Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <label className="input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="Email" 
                value={formData.email} 
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="Username" 
                value={formData.fullName} 
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <input type={showPassword ? "text" : "password"} className="grow" placeholder="Password" 
                value={formData.password} 
                onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

              <button className='inset-y-0 right-0 pr-3 flex items-center' type='button' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="size-5 text-base-content/40" /> : <Eye className="size-5 text-base-content/40" />}
              </button>
            </label>

            <label className='flex items-center gap-2'>
              <button type='submit' className='input input-bordered w-full text-black hover:bg-indigo-400/60 hover:text-white hover:shadow-md bg-indigo-400' disabled={isSigningUp}>
                {isSigningUp ? (
                  <div className='flex justify-center gap-4'>
                    <Loader2 className="size-5 animate-spin " />
                    Loading...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </label>
          </form>

          <div className='text-center'>
            <p className='flex text-base-content/60 justify-center items-center gap-1'>
              If you already have an account, please{" "}
              <Link to="/login" className='underline text-indigo-400'>Login</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <AuthimagePattern
        title="Join our Community"
        subtitle="Connect with friends, share moments, and stay in touch with you"
      />


    </div>
  );
};

export default SignUpPage;
