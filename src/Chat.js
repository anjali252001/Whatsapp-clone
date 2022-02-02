import { Avatar } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import "./Chat.css";
import { useParams } from "react-router-dom";
import firebase from '@firebase/app-compat';
import { IconButton } from "@material-ui/core";
import { SearchOutlined, MoreVert, AttachFileOutlined, EmojiEmotions, Mic } from "@material-ui/icons";
import db from './firebase';

import { UseStateValue } from "./StateProvider";
function Chat() {
  const [{ user }, dispatch] = UseStateValue();
  const { roomId } = useParams();
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState('');
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    if (roomId) {
      db.collection("rooms").doc(roomId).onSnapshot((snapshot) => {
        setRoomName(snapshot.data().name)
      });
      db.collection("rooms").doc(roomId).collection("messages").orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => {
          setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }
  }, [roomId])
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("u typed input", input);

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
     
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput("");
  }
  return <div className='chat'>
    <div className='chat_header'>
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className='chat__headerInfo'>
        <h3>{roomName}</h3>
        <p>Last seen { ` `}
        {
           new Date(messages[messages.length -1]?.timestamp?.toDate()).toUTCString()}
          </p>
      </div>
      <div className='chat__headerRight'>
        <IconButton className="icon-root">
          <SearchOutlined />
        </IconButton>
        <IconButton className="icon-root">
          <AttachFileOutlined />
        </IconButton>
        <IconButton className="icon-root">
          <MoreVert />
        </IconButton>
      </div>
    </div>
    <div className='chat__body'>
      {messages.map(message => (<p className={`chat_message ${message.name===user.displayName && "chat_receiver"}`}>
        <span className="chat_name"> {message.name}</span>
        {message.message}
        <span className='chat_timestamp'>
          {new Date(message.timestamp?.toDate()).toUTCString()}
        </span>
      </p>
      ))}


    </div>
    <div className='chat_footer'>

      <EmojiEmotions />
      <form>
        <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder='Send a message' />
        <button type="submit" onClick={sendMessage}>send a message</button>


      </form>

      <Mic />
    </div>
  </div>;
}

export default Chat;
