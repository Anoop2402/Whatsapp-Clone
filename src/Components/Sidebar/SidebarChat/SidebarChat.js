import { Avatar } from '@material-ui/core';
import { React, useEffect, useState} from 'react';
import './SidebarChat.css';
import db from '../../../firebase';
import { Link } from 'react-router-dom';
import {useStateValue} from '../../../StateProvider';

function SidebarChat({addNewChat,name, id}) {

    const [{user}, dispatch]=useStateValue();
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState("")
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
        
    }, [])

    useEffect(() => {
      if(id)
      {
          db.collection('rooms').doc(id).collection('messages')
          .orderBy('timestamp', 'desc')
          .onSnapshot(snapshot=>
           setMessages(snapshot.docs.map((doc)=>doc.data()))     
          );
      }
    }, [id]);

    const createChat=()=>{
        const roomName=prompt("Please enter the chat name");

        if(roomName){
            db.collection('rooms').add({
                Name:roomName,
            });
        }
    } 


    return !addNewChat ? (
       <Link to={`/rooms/${id}`} >
            <div className="sidebar_chat">
            <Avatar src= {`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="sidebar_chat_info">
                <h2>{name}</h2>
                <p>{messages[0]?<div className="messag"></div>e}</p>
            </div>
            
        </div>
       </Link>
       
    ): (
        <div className="sidebar_chat" onClick={createChat}>
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat
