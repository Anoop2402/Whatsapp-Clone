import { Avatar, IconButton } from '@material-ui/core'
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import  AttachFile from '@material-ui/icons/AttachFile';
import  MoreVert from '@material-ui/icons/MoreVert';
import React from 'react'
import "./Chat.css";

function Chat() {
let d=new Date();
    return (
        <div className="chat">
            <div className="chat_header">
            <Avatar />

            <div className="chat_headerInfo">
            <h3>Room Name</h3>
                <p>Last seen at...</p>
            </div>
            <div className="chatHeaderRight">
            <IconButton>
                     <SearchOutlined />
                    </IconButton>

                    <IconButton>
                     <AttachFile />
                    </IconButton>

                    <IconButton>
                     <MoreVert />
                    </IconButton>                 
            </div>
            </div>

            <div className="chat_body">
                
                <p className={`chat_message  ${true && "chat_reciever"}`}>
                <span className="chat_name">Anoop Panicker</span>
                Hey guys 
               <span className="chat_timestamp">  {d.toLocaleString('en-US',{hour:'numeric', minute:'numeric', hour12:true})}</span> 
                </p>
                
            </div>

            <div className="chat_footer">

            </div>

        </div>
    )
}

export default Chat
