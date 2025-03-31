import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import {BASE_URL} from '../utils/constants'
import {addFeed} from '../utils/feedSlice'
import { useEffect } from "react";
import Loading from "./Loading";
import StackComponent from "./StackComponent";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store:any)=>store.feed);
  const handleFeed = async()=>{
    try{
      if(!feed){
        const res = await axios.get(BASE_URL+"/feed",{withCredentials:true});
        dispatch(addFeed(res.data));
        // console.log(feed)
      }
    }catch(err){
      console.error(err)
    }
  }
  
  useEffect(()=>{
    handleFeed();
  },[])
  return (
    <>
    {feed&&(<div className="flex justify-center">
      {<StackComponent feed={feed}/>}
    </div>)}
    {!feed&&(<Loading/>)}
    </>
  )
}

export default Feed
