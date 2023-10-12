import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error, message } = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const targetRoute = '/';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return;
      }

      dispatch(signInSuccess(data))
      navigate(targetRoute)
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  };
  return (
    <div className='p-3 max-w-xl mx-auto'>
      <h1 className='text-2xl text-center font-semibold 
      my-5 text-slate-700'>
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input 
          type="email" 
          placeholder='Email' 
          className='border p-3 rounded-xl'
          id='email' 
          onChange={handleChange} 
        />
        <input 
          type="password" 
          placeholder='Password' 
          className='border p-3 rounded-xl'
          id='password'
          autoComplete="off"
          onChange={handleChange} 
        />
        <button 
          disabled={loading} 
          className='bg-slate-700 p-3 text-white
        rounded-xl uppercase hover:opacity-90 mt-7
        disabled:opacity-70'>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <div className='flex gap-2 mt-3'> 
        <p>Do not have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-800 font-semibold">
            Sign up
          </span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}