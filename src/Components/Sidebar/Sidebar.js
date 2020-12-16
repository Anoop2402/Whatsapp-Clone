import React from 'react'
import {Avatar, IconButton} from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutLined from "@material-ui/icons/SearchOutlined";
import './Sidebar.css';
import SidebarChat from './SidebarChat/SidebarChat';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
            <Avatar />
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
               <SidebarChat addNewChart="sfer" />
               <SidebarChat />
               <SidebarChat />
               <SidebarChat /> 
            </div>
        </div>
    )
}

export default Sidebar
