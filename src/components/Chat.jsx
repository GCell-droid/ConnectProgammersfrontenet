import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { toUserId } = useParams();
  const user = useSelector((store) => store.user);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const fromUserId = user?._id;
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const socket = createSocketConnection();
    if (user)
      socket.emit("sendMessage", {
        sender: user,
        toUserId,
        fromUserId,
        message: newMessage,
      });
    setNewMessage("");
  };

  const getChat = async () => {
    const messagesGot = await axios.get(
      `${BASE_URL}/chat/${toUserId}`,
      {
        withCredentials: true,
      }
    );
    const m = messagesGot?.data?.messages?.map((msg) => {
      return {
        sender: {
          _id: msg.senderId._id,
          firstName: msg.senderId.firstName,
          photoUrl: msg.senderId.photoUrl,
        },
        message: msg.text,
      };
    });
    setMessages(m);
  };

  useEffect(() => {
    getChat();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!fromUserId) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", { toUserId, fromUserId });

    socket.on("messageRecieved", ({ sender, message }) => {
      setMessages((messages) => [...messages, { sender, message }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [toUserId, fromUserId]);

  return (
    <div className="flex flex-col items-center justify-between h-[90vh] bg-base-100 dark:bg-neutral text-base-content p-5 overflow-hidden">
      <div className="flex flex-col w-2/3 bg-base-200 dark:bg-base-300 mt-5 rounded-xl shadow-md h-6/7">
        <div className="flex-grow max-h-full overflow-y-auto p-5 space-y-4">
          {messages.map((m, index) => {
            if (m.sender?._id === user?._id) {
              return (
                <div className="chat chat-end" key={index}>
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img alt="User" src={m?.sender?.photoUrl} />
                    </div>
                  </div>
                  <div className="chat-header">
                    {m.sender.firstName}
                  </div>
                  <div className="chat-bubble bg-primary text-primary-content">
                    {m.message}
                  </div>
                </div>
              );
            } else {
              return (
                <div className="chat chat-start" key={index}>
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img alt="Sender" src={m?.sender?.photoUrl} />
                    </div>
                  </div>
                  <div className="chat-header">
                    {m?.sender?.firstName}
                  </div>
                  <div className="chat-bubble bg-accent text-accent-content">
                    {m.message}
                  </div>
                </div>
              );
            }
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-center gap-2 p-3 bg-base-300 dark:bg-base-200 rounded-b-xl">
          <input
            type="text"
            placeholder="Type a message"
            className="input input-bordered w-full"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newMessage.trim()) {
                sendMessage();
              }
            }}
          />
          <button
            className="btn btn-primary"
            onClick={sendMessage}
            disabled={!newMessage.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
