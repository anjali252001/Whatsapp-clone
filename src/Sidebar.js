import React, { useEffect, useState } from 'react';
import db from "./firebase";
import "./Sidebar.css"
import Avatar from '@material-ui/core/Avatar';
import { DonutLarge } from '@material-ui/icons';
import { Chat, MoreVert, SearchOutlined } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import SidebarChat from "./SidebarChat.js"
import { UseStateValue } from './StateProvider';

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{user} ,dispatch] =UseStateValue();
  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot(snapshot => {
      setRooms(snapshot.docs.map(doc => 
        (
          {
            id: doc.id,
            data: doc.data(),
          }
        )
      
      ))
    });
    return ()=>{
      unsubscribe();
    }
  }, [])
  return <div className="sidebar">
    <div className="sidebar_header">
      <Avatar src={user?.photoURL} />
      <div className="sidebar_headerRight">
        <IconButton className="icon-root">
          <DonutLarge />
        </IconButton>
        <IconButton className="icon-root">
          <Chat />
        </IconButton>
        <IconButton className="icon-root">
          <MoreVert />
        </IconButton>


      </div>
    </div>
    <div className="sidebar_search">
      <div className='sidebar_searchContainer'>
        <SearchOutlined />
        <input placeholder="Type something to search" type="text" />
      </div>


    </div>
    <div className='sidebar_chats'>
      <SidebarChat addNewChat />
      {rooms.map( (room) => 
        <SidebarChat key={room.id} id={room.id}
          name={room.data.name} />
      )}
    </div>
  </div>;
}

export default Sidebar;

