import  { useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import {BASE_URL} from '../utils/constants'
import { useNavigate } from 'react-router';
import AlertComp from './AlertComp';
const Login = () => {
  const [emailId,setemailId] = useState("nitesh@gmail.com");
  const [firstName,setFirstName] = useState("");
  const [gender,setGender] = useState("male");
  const [photoURL,setPhotoURL] = useState("https://images.unsplash.com/photo-1497316730643-415fac54a2af?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRha2luZyUyMHBob3RvfGVufDB8fDB8fHww");
  const [password,setpassword] = useState("Nitesh@123");
  const [isSignIn,setSignIn] = useState(true);
  const [error,setError] = useState("");
  const [successSignup,setsuccessSignup] = useState(false)
  const navigate = useNavigate();
  const user = useSelector((store)=>store.user);
  const dispatch = useDispatch();
  
  const handleLogin = async ()=>{
    //to get cookie
    try{
      const res = await axios.post(BASE_URL+'/login',{emailId,password},{withCredentials:true});
      dispatch(addUser(res.data))
      navigate('/')
    }catch(err){
      setError(err?.response?.data||"Something Went Wrong")
    }
  }
  const handleSignUp = async()=>{
    try{
      setError("")
      const res = await axios.post(BASE_URL+'/signup',{emailId,password,firstName,photoURL,gender},{withCredentials:true})
      setsuccessSignup(true)
      dispatch(addUser(res.data))
      setSignIn(!isSignIn)
      navigate('/profile')
    }catch(err){
      setError(err?.response?.data||"Something Went Wrong")
    }
  }
  
  return (
    isSignIn?
    <div className='flex justify-center my-20'>
    <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-6 rounded-box ">
      {successSignup&&<AlertComp message={"SignUp Success"}/>}
  <label className="font-bold text-center text-2xl -my-1.5 mb-2">Login</label>
  <label className="fieldset-legend">Email</label>
  <input type="email"  onChange={e=>setemailId(e.target.value)} value={emailId}className="input" placeholder="Email" />
  <label className="fieldset-legend">Password</label>
  <input type="password" className="input" value={password}  onChange={e=>setpassword(e.target.value)}placeholder="Password" />
  <button className="fieldset-legend font-bold" onClick={()=>{
    setError("")
    setSignIn(!isSignIn)
  }}>New? Sign Up here...</button>
  <p className='text-red-600'>{error}</p>
  <button className="btn btn-accent mt-2" onClick={handleLogin}>Login</button>
</fieldset></div>:
   <div className='flex justify-center my-4'>
      {successSignup&&<AlertComp message={"Login Success"}/>}
   <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box ">
  <label className="font-bold text-center text-2xl -my-1.5 mb-2">Signup</label>
  <label className="fieldset-legend">Name</label>
  <input  onChange={e=>setFirstName(e.target.value)} value={firstName}className="input" placeholder="Name" />
<label htmlFor="gender-select" className="fieldset-legend">Gender</label>
      <select title='gender' 
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="select select-primary"
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
  <label className="fieldset-legend">Email</label>
  <input type="email" className="input" value={emailId}  onChange={e=>setemailId(e.target.value)}placeholder="Email Id" />
  <label className="fieldset-legend">Password</label>
  <input type="password" className="input" value={password}  onChange={e=>setpassword(e.target.value)}placeholder="Password" />
  <button className="fieldset-legend " onClick={()=>{
    setError("")
    setSignIn(!isSignIn)
  }}>Already User Login Here...</button>
  <p className='text-red-600'>{error}</p>
  <button className="btn btn-accent mt-2" onClick={handleSignUp}>Signup</button>
</fieldset>
</div>
  )
}

export default Login
