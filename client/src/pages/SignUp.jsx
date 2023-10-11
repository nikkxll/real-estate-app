import { Link } from "react-router-dom"

export default function SignUp() {
  return (
    <div className='p-3 max-w-xl mx-auto'>
      <h1 className='text-2xl text-center font-semibold 
      my-5 text-slate-700'>
        Sign Up
      </h1>
      <form className='flex flex-col gap-3'>
        <input type="text" placeholder='Username' 
        className='border p-3 rounded-xl'
        id='username' />
        <input type="text" placeholder='Email' 
        className='border p-3 rounded-xl'
        id='email' />
        <input type="text" placeholder='Password' 
        className='border p-3 rounded-xl'
        id='password' />
        <button className='bg-slate-700 p-3 text-white
        rounded-xl uppercase hover:opacity-90 mt-7
        disabled:opacity-70'>Sign Up</button>
      </form>
      <div className='flex gap-2 mt-3'> 
        <p>Have an account?</p>
        <Link to="{/sign-in}">
          <span className="text-blue-800 font-semibold">Sign in</span>
        </Link>
      </div>
    </div>
  )
}
