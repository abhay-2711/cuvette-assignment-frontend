import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id] : e.target.value });
    console.log(formData); 
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
  
      const data = await res.json();
      setLoading(false);
      if(data.success === false){
        setError(true);
        return;
      }
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto my-10'>
      <h1 className='text-3xl text-center font-bold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <div className='flex flex-col'>
      <label for="email" className="font-medium">
          Email
        <strong>*</strong>
      </label>
        <input 
          type='email' 
          id='email' 
          className='bg-slate-100 p-3 rounded-lg' 
          onChange = {handleChange}
        />
      </div>
      <div className='flex flex-col'>
      <label for="password" className="font-medium">
          Password
        <strong>*</strong>
      </label>
        <input 
          type='password' 
          id='password' 
          className='bg-slate-100 p-3 rounded-lg' 
          onChange = {handleChange}
        />
      </div>
        <button disabled={loading} style={{backgroundColor:"#0E2E50"}} className='text-white p-3 rounded-lg uppercase hover:opacity-80'>{loading ? 'Loading...' : 'Sign Up'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to = "/">
          <span className='text-red-700'>Sign In</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
    </div>
  )
}

export default SignUp;
