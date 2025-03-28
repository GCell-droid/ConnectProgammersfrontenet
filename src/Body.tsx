import Navbar from './components/Navbar'
import {  Outlet, useNavigate} from 'react-router'
import Footer from './components/Footer'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Body = () => {
  const navigate = useNavigate()
  const user = useSelector((store:any)=>store.user)
  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login if user is null
    }
  }, [user, navigate]);
  return (
   <>
   <Navbar/>
   <Outlet/>
   <Footer/>
   </>
  )
}

export default Body
