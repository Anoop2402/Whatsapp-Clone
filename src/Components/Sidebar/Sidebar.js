import {React, useEffect, useState} from 'react'
import {Avatar, IconButton} from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutLined from "@material-ui/icons/SearchOutlined";
import './Sidebar.css';
import SidebarChat from './SidebarChat/SidebarChat';
import db from "../../firebase";
import {useStateValue} from '../../StateProvider';

function Sidebar() {

    const [{user}, dispatch]=useStateValue();
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
      db.collection('rooms').onSnapshot(snapshot=>{
          setRooms(snapshot.docs.map((doc)=>({
               id:doc.id,
               data:doc.data()
                })
            ))
      })
    }, [])

    

    return (
        <div className="sidebar">
            <div className="sidebar-header">
            <Avatar src={user.photoURL} />
                <div className="sidebar-headerRight">
                    <IconButton>
                     <DonutLargeIcon />
                    </IconButton>

                    <IconButton>
                     <ChatIcon />
                    </IconButton>

                    <IconButton>
                     <MoreVertIcon />
                    </IconButton>

                </div>
            </div>
            <div className="sidebar-search">
              <div className="sidebar-searchContainer">
              <SearchOutLined />
                <input placeholder="Search or start a new chat" type="text" />
  
              </div>  
            

                </div>

            <div className="sidebar-chats">
               <SidebarChat addNewChat />
               {rooms.map((room)=>(
                   <SidebarChat key={room.id} id={room.id} name={room.data.Name}  />
               ))}
               

            </div>
        </div>
    )
}

export default Sidebar
