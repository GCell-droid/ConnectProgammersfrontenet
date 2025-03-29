import React from 'react'
import ThemeToggle from './ToggleTheme'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { removeUser } from '../utils/userSlice';
import {BASE_URL} from '../utils/constants'
import { Link, useNavigate } from 'react-router';
const Navbar = () => {
  const user = useSelector((store:any)=>store.user)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogout = async ()=>{
    const res = await axios.post(BASE_URL+"/logout",{},{withCredentials:true}) 
    dispatch(removeUser())
    navigate('/login')
    // console.log("Logout"+res)
  }
  return (
     <>
       <div className="navbar bg-base-100 shadow-sm ">
  <div className="flex-1">

    <Link to='/' className="btn btn-ghost text-xl">DevConnect</Link>
  </div>
  
          
      <ThemeToggle  />
  {user&&(<div className="flex-none mr-8 ">
    <div className="dropdown dropdown-end mr-4 ml-4">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator text-2xl">
          &
          <span className="badge indicator-item border-none bg-blue-500 ">7</span>
        </div>
      </div>
      <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
        <div className="card-body">
          <span className="text-lg font-bold">8 Items</span>
          <span className="text-info"></span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">View Connections</button>
          </div>
        </div>
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
        <li><a>Settings</a></li>
        <li onClick={handleLogout}><a>Logout</a></li>
        
      </ul>
    </div>
  </div>)}
  
</div>
    </>
  )
}

export default Navbar
