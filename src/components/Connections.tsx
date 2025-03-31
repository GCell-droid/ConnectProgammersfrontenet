import axios from 'axios'
import { useEffect } from 'react'
import {BASE_URL} from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import {addConnections} from '../utils/connectionSlice'
import Loading from './Loading'
const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store:any)=>store.connections)
    
    const getConnection = async ()=>{
        const res = await axios.get(BASE_URL+'/user/connections',{withCredentials:true});
        console.log(res?.data?.filteredData)
        dispatch(addConnections(res?.data?.filteredData));
    }
    useEffect(()=>{
        getConnection();
    },[]);
    if(connections === null)
      return <Loading/>
    if(connections.length===0)
      return <h1 className='text-center text-3xl mt-10'>No Connections Found</h1>
    return (
      <div className=' m-auto mt-10 shadow-lg shadow-black rounded-lg p-4'>
      <ul className="list bg-base-100 rounded-box shadow-md">

  <li className="p-4 pb-2 text-4xl opacity-60 tracking-wide text-center mb-5">Connections</li>
  <div className='  ml-10'>

  {connections.map((connection)=>{
    const {_id, photoUrl, firstName, skills, gender, age, description } = connection;
    return <li id={_id} className="list-row">
    <div><img className="size-10 rounded-box" src={photoUrl}/></div>
    <div>
      <div>{firstName}</div>
      <div className='flex'>
      <div className="text-xs uppercase font-semibold opacity-60 mr-4">{gender}</div>
      <div className="text-xs uppercase font-semibold opacity-60 text-accent mr-4">Age: {age}</div>
      {skills && skills.length > 0&&<div className="text-xs uppercase font-semibold opacity-60 mr-2">Skills: </div>}
      {skills && skills.length > 0 ? (
     skills.map((s: string, index: number) => (
      <div className='flex'>
      <div key={index} className="kbd p-2 -mt-1">{s}</div>
      </div>
  ))
) : (
  <div className="text-xs italic opacity-60"></div>
)}

      
      </div>
    </div>
    <p className="list-col-wrap text-xs">
    {description}
    </p>
  </li>
  })}
  
  </div>
</ul>
    </div>
)
}
export default Connections
