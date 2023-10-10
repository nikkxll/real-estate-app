import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './pages/about'
import Profile from './pages/Profile'
import Home from './pages/Home'
import SignIn from './pages/Signin'
import SignUp from './pages/Signup'
import Header from './components/header'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}
