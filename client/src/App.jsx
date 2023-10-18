import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './pages/about'
import Profile from './pages/Profile'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/createListing'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/listing/:id' element={<Listing />} />
        <Route element={<PrivateRoute />} >
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/update-listing/:id' element={<UpdateListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
