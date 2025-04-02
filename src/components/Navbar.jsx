import React from 'react'
import ThemeToggle from './ToggleTheme'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { removeUser } from '../utils/userSlice';
import { removeFeed } from '../utils/feedSlice';
import {BASE_URL} from '../utils/constants'
import { Link, useNavigate } from 'react-router';
import Error from './Error';
const Navbar = () => {
  const user = useSelector((store)=>store.user)
  const connectionsLength = useSelector((store)=>store?.connections?.length)
  const requestLength = useSelector((store)=>store?.requests?.length)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogout = async ()=>{
    try{
      await axios.post(BASE_URL+"/logout",{},{withCredentials:true}) 
      dispatch(removeUser())
      dispatch(removeFeed());
      navigate('/login')
    }catch(err){
      <Error message={err?.message}/>
    }
  }
  return (
     <>
       <div className="navbar bg-base-100 shadow-sm ">
  <div className="flex-1">

    <Link to={user ? '/' : '/login'} className="btn btn-ghost text-xl">DevConnect</Link>

  </div>
  
          
      <ThemeToggle  />
  {user&&(<div className="flex-none mr-8 ">
    <div className="dropdown dropdown-end mr-4 ml-4">
        <Link to={"/requests"}>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator text-2xl">
          &
          <span className="badge indicator-item border-none bg-blue-500 ">{requestLength?requestLength:0}</span>
        </div>
      </div>
      </Link>
      <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
      </div>
    </div>
    <div className="dropdown dropdown-end ">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user?.photoUrl} />
        </div>
      </div>
      
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to='/profile' className="justify-between">
            Profile
          </Link>
        </li>
        <li><Link to='/connections'>Connections <span className="badge ">{connectionsLength}</span></Link>
        </li>
        <li onClick={handleLogout}><a>Logout</a></li>
        
      </ul>
    </div>
  </div>)}
  
</div>
    </>
  )
}

export default Navbar
