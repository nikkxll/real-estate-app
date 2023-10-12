import { useSelector } from 'react-redux'

export default function Profile() {
  const { currentUser } = useSelector(state => state.user) 
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-2xl text-center font-semibold my-4 text-slate-700'>
        Profile
      </h1>
      <form className='flex flex-col gap-4'>
      <img className='rounded-full h-20 w-20 object-cover cursor-pointer self-center' 
            src={currentUser.photo} 
            alt='profile-photo'/>
            <input type="text" placeholder='username'
            className='border p-4 rounded-xl'
            id='username'/>
            <input type="text" placeholder='email'
            className='border p-4 rounded-xl'
            id='email'/>
            <input type="text" placeholder='password'
            className='border p-4 rounded-xl'
            id='password'/>
            <button className='bg-slate-700 p-3 text-white
                    rounded-xl uppercase hover:opacity-90 mt-5
                    disabled:opacity-70'>
              Update
            </button>
      </form>
      <div className='mt-4 flex justify-between'>
        <span className='text-red-600 cursor-pointer'>Delete Account</span>
        <span className='text-red-600 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}
