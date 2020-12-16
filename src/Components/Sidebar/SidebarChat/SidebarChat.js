import { Avatar } from '@material-ui/core';
import { React, useEffect, useState} from 'react';
import './SidebarChat.css';

function SidebarChat({addNewChart}) {

    const [seed, setSeed] = useState('')
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
        
    }, [])

    const createChat=()=>{
        const roomName=prompt("Please enter the chat name");
    }


    return !addNewChart ? (
        <div className="sidebar_chat">
            <Avatar src= {`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="sidebar_chat_info">
                <h2>Room Name</h2>
                <p>Last message...</p>
            </div>
            
        </div>
    ): (
        <div className="sidebar_chat" onClick={createChat}>
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat
