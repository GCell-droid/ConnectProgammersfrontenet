import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';

const Chat = () => {
    const { toUserId } = useParams();
    const user = useSelector(store=>store.user);
    const [newMessage,setNewMessage] = useState("");
    const [messages,setMessages] = useState([]);
    const fromUserId = user?._id;
    const sendMessage = ()=>{
        const socket = createSocketConnection();
        // emitting sendMessage to server
        if(user)
        socket.emit("sendMessage",{sender:user,toUserId,fromUserId,message:newMessage});
        setNewMessage("")
    }
    useEffect(()=>{
        if(!fromUserId)
            return;
        const socket = createSocketConnection();
        socket.emit("joinChat",{toUserId,fromUserId});
        //when message is recieved
        socket.on("messageRecieved",({sender,toUserId, fromUserId, message})=>{
            console.log(sender?.firstName+" : "+message)
            setMessages(messages=> [...messages,{sender,message}]);
        })
        // handling socket connection when this component unloads
        return ()=>{
            socket.disconnect();
        }
    },[toUserId,fromUserId]);
    return (
        <div className="flex flex-col items-center justify-between h-[90vh] bg-base-100 dark:bg-neutral text-base-content p-5 overflow-hidden">
            <div className="flex flex-col w-2/3 bg-base-200 dark:bg-base-300 mt-5 rounded-xl shadow-md h-6/7">
                <div className="flex-grow max-h-full overflow-y-auto p-5 space-y-4">
                    {messages.map((m,index)=>{
                      if(m.sender._id === user._id){
                        return  <div className="chat chat-end" key={index}>
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS chat bubble component"
                                    src={m?.sender?.photoUrl}
                                />
                            </div>
                        </div>
                        <div className="chat-header">
                            {m.sender.firstName}
                        </div>
                        <div className="chat-bubble bg-primary text-primary-content">{m.message}</div>
                        </div>  
                        
                        
                        
                        
                        {/* <div className="chat-footer opacity-50">Delivered</div> */}
                    }else{
                       return <div className="chat chat-start" key={index}>
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS chat bubble component"
                                    src={m?.sender?.photoUrl}
                                    />
                            </div>
                        </div>
                        <div className="chat-header">
                            {m?.sender?.firstName}
                            {/* <time className="text-xs opacity-50 ml-2">12:45</time> */}
                        </div>
                        <div className="chat-bubble bg-accent text-accent-content">{m.message}</div>
                        </div>
                      }
                      
                    })}  
                    </div>

                {/* Input Section */}
                <div className="flex items-center gap-2 p-3 bg-base-300 dark:bg-base-200 rounded-b-xl">
                    <input
                        type="text"
                        placeholder="Type a message"
                        className="input input-bordered w-full "
                        value={newMessage}
                        onChange={(e)=>{
                            setNewMessage(e.target.value);
                        }}
                    />
                    <button className="btn btn-primary" onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
