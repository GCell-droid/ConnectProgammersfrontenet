import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import {BASE_URL} from '../utils/constants'
import {addFeed} from '../utils/feedSlice'
import { useEffect } from "react";
import Loading from "./Loading";
import StackComponent from "./StackComponent";
import ShimmerCard from "./ShimmerCard";
import Error from "./Error";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store:any)=>store.feed);
  const handleFeed = async()=>{
    try{
      if(!feed){
        const res = await axios.get(BASE_URL+"/feed",{withCredentials:true});
        dispatch(addFeed(res.data));
      }
    }catch(err){
      <Error message={err?.message}/>
    }
  }
  
  useEffect(()=>{
    handleFeed();
  },[])

  if(!feed){
    return <ShimmerCard/>}
  if(feed.length===0){
    return <h1 className='text-center text-3xl mt-10'>No Users</h1>
  }
  return (
    <>
    {feed&&(<div className="flex justify-center">
      {<StackComponent/>}
    </div>)}
    </>
  )
}

export default Feed
