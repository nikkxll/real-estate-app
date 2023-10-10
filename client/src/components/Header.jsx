import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className='bg-slate-200 shadow-lg'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
            <h1 className='text-sm sm:text-xl flex flex-wrap'>
                <span className='text-slate-500'>Nikkel</span>
                <span className='text-slate-700 font-bold'>Estate</span>
            </h1>
        </Link>
        <form className='bg-slate-100 p-3 rounded-md flex items-center'>
            <input type="text" placeholder='Search...' 
            className='bg-transparent focus:outline-none w-28 sm:w-64 md:w-48' />
        <FaSearch className='text-slate-400' />
        </form>
        <ul className='flex gap-5'>
            <Link to='/'>
                <li className='hidden sm:inline text-slate-800 hover:underline'>Home</li>
            </Link>
            <Link to='/about'>
                <li className='hidden sm:inline text-slate-800 hover:underline'>About</li>
            </Link>
            <Link to='/sign-in'>
                <li className='text-slate-800 hover:underline'>Sign In</li>
            </Link>
            </ul>
        </div>
    </header>
  )
}