import React, { useState } from 'react'
import NewFeedCard from './NewFeedCard';

const StackComponent = ({feed}) => {
  return (
    <div className='flex justify-center mt-10'>
    <div className="stack gap-4  ">
           {feed.map((user:any) => {
      return <NewFeedCard user={user}/>
})}

           
        
  </div>
</div>
  )
}

export default StackComponent
