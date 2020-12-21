import { Avatar, IconButton } from '@material-ui/core'
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import  AttachFile from '@material-ui/icons/AttachFile';
import  MoreVert from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import {React, useState, useEffect} from 'react'
import "./Chat.css";
import {useParams} from 'react-router-dom';
import db from '../../firebase';
import {useStateValue} from '../../StateProvider';
import firebase from 'firebase';

function Chat() {


const [input, setInput] = useState("");
const [roomName, setRoomName] = useState("");
const [messages, setMessages] = useState([]);
    
const [{user}, dispatch]=useStateValue();
console.log(messages);

const sendMessage=(e)=>{
        e.preventDefault();
          
        db.collection('rooms').doc(roomId).collection('messages').add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInput('');
    }

    const {roomId}=useParams();

    useEffect(() => {
      if(roomId){
        db.collection('rooms').doc(roomId).onSnapshot(snapshot=>{
            setRoomName(snapshot.data().Name)


            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot=>( 
                    setMessages(snapshot.docs.map(text=>text.data()))
            ))
        })

      }
    }, [roomId])


return (
        <div className="chat">
            <div className="chat_header">
            <Avatar />

            <div className="chat_headerInfo">
            <h3>{roomName}</h3>
                <p>{new Date(
                    messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
                    </p>
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
            {console.log(messages.name, user.displayName)}
               {messages.map((text)=>(
                <p className={`chat_message  ${text.name === user.displayName && "chat_reciever"}`}>
                <span className="chat_name">{text.name}</span>
                {text.message} 
               <span className="chat_timestamp">
                {new Date(text.timestamp?.toDate()).toUTCString() }</span> 
                </p>
               ))} 
               
                
            </div>

            <div className="chat_footer">
                <InsertEmoticonIcon />  
                <form>
                    <input value={input} onChange={(e)=> setInput(e.target.value)} type="text" placeholder="Type a message" />
                    <button onClick={sendMessage}>Send a message</button>
                </form>            
                <MicIcon />    
            </div>

        </div>
    )
}

export default Chat
