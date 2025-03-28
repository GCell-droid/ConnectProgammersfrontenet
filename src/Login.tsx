import  { useState } from 'react'
import axios from 'axios';
const Login = () => {
  const [emailId,setemailId] = useState("nitesh@gmail.com");
  const [firstName,setFirstName] = useState("");
  const [gender,setGender] = useState("male");
  const [photoURL,setPhotoURL] = useState("");
  const [password,setpassword] = useState("Nitesh@123");
  const [isSignIn,setSignIn] = useState(true);
  const handleLogin = async ()=>{
    //to get cookie
    const res = await axios.post('http://localhost:7777/login',{emailId,password},{withCredentials:true});
    console.log(res.data);
  }
  const handleSignUp = async()=>{
    const res = await axios.post('http://localhost:7777/signup',{emailId,password,firstName,photoURL,gender})
    console.log(res)
  }

  return (
    isSignIn?
    <div className='flex justify-center my-20'>
    <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-6 rounded-box ">
  <label className="font-bold text-center text-2xl -my-1.5 mb-2">Login</label>
  <label className="fieldset-legend">Email</label>
  <input type="email"  onChange={e=>setemailId(e.target.value)} value={emailId}className="input" placeholder="Email" />
  <label className="fieldset-legend">Password</label>
  <input type="password" className="input" value={password}  onChange={e=>setpassword(e.target.value)}placeholder="Password" />
  <button className="fieldset-legend font-bold" onClick={()=>{
    setSignIn(!isSignIn)
  }}>New? Sign Up here...</button>
  <button className="btn btn-accent mt-2" onClick={handleLogin}>Login</button>
</fieldset></div>:
   <div className='flex justify-center my-4'>
    <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box ">
  <label className="font-bold text-center text-2xl -my-1.5 mb-2">Signup</label>
  <label className="fieldset-legend">Name</label>
  <input  onChange={e=>setFirstName(e.target.value)} value={firstName}className="input" placeholder="Name" />
<label htmlFor="gender-select" className="fieldset-legend">Gender</label>
      <select 
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
  <label className="fieldset-legend">PhotoURL</label>
  <input  onChange={e=>setPhotoURL(e.target.value)} value={photoURL}className="input" placeholder="Photo" />
  <button className="fieldset-legend " onClick={()=>{
    setSignIn(!isSignIn)
  }}>Already User Login Here...</button>
  <button className="btn btn-accent mt-2" onClick={handleSignUp}>Signup</button>
</fieldset></div>
  )
}

export default Login
