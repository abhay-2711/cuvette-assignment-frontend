import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from '../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const SignIn = () => {

  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id] : e.target.value });
    console.log(formData); 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      // console.log(res);
  
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/todo');
    } catch (error) {
      console.log(error);
      dispatch(signInFailure(error));
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto my-10'>
      <h1 className='text-3xl text-center font-bold my-7'>Sign In</h1>
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
        <button disabled={loading} style={{backgroundColor:"#0E2E50"}} className='text-white p-3 rounded-lg uppercase hover:opacity-80'>{loading ? 'Loading...' : 'Sign In'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don&apos;t have an account?</p>
        <Link to = "/signup">
          <span className='text-red-700'>Sign Up</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error ? error.message || 'Something went wrong!' : ''}</p>
    </div>
  )
}

export default SignIn;
