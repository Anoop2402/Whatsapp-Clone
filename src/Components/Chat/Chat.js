import { Avatar, IconButton } from '@material-ui/core'
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import  AttachFile from '@material-ui/icons/AttachFile';
import  MoreVert from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import {React, useState, useEffect} from 'react'
import "./Chat.css";
import {useHistory, useParams} from 'react-router-dom';
import db from '../../firebase';
import {useStateValue} from '../../StateProvider';
import firebase from 'firebase';
import Picker from 'emoji-picker-react';
import MicRecorder from '../../../node_modules/mic-recorder-to-mp3';
import DeleteIcon from '@material-ui/icons/Delete';

import MicOffIcon from '@material-ui/icons/MicOff';
import { Dropdown, DropdownButton } from 'react-bootstrap';

 

function Chat() {


    const [isRecord, setIsRecord] = useState(false);
    const history=useHistory();
    const recorder = new MicRecorder({
        bitRate: 128
      });

      const startRec=()=>{
        recorder.start().then(() => {
            setIsRecord(true);
            
          }).catch((e) => {
            console.error(e);
          });
      }

   const stopRec=()=>{
       setIsRecord(false);
                         recorder.stop()
                         .getMp3().then(([buffer, blob]) => {
        // do what ever you want with buffer and blob
        // Example: Create a mp3 file and play
                          const file = new File(buffer, 'me-at-thevoice.mp3', {
                         type: blob.type,
                        lastModified: Date.now()
            });



                        const player = new Audio(URL.createObjectURL(file));
                        player.play();

                        }).catch((e) => {
                        alert('We could not retrieve your message');
                       
                        });
                    }
    //Emoticon
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [emochart, setemochart] = useState(false);
    const onEmojiClick = (event, emojiObject) => {
      setChosenEmoji(emojiObject);
      setInput(input+emojiObject.emoji);
    };



    const showEmoticons=(e)=>{
        (emochart===false)?(setemochart(true))
        :(setemochart(false))
        
            
    }
const [input, setInput] = useState("");
const [roomName, setRoomName] = useState([]);
const [messages, setMessages] = useState([]);

    
const [{user}, dispatch]=useStateValue();


const sendMessage=(e)=>{
        e.preventDefault();
       
        if(input){

            db.collection('rooms').doc(roomId).collection('messages').add({
                message:input,
                name:user.displayName,
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            });
    

        }
        
        
        setInput('');
    }


    const {roomId}=useParams();


    const deleteChatRoom=()=>{
        if(roomId){
                db.collection('rooms').doc(roomId).delete(
                    err=>{
                        if(err){alert(err)}
                        else{
                            history.push('/');
                        }
                    }
                )
                setMessages('')
                history.push('/');

        }
    }

    useEffect(() => {
      if(roomId){
        db.collection('rooms').doc(roomId).onSnapshot(snapshot=>{
           
            setRoomName(snapshot.data())
          

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot=>( 
                    setMessages(snapshot.docs.map(text=>text.data()))
            ))
        })

      }
    }, [roomId])
    let time=new Date(
        messages[messages.length-1]?.timestamp?.toDate()).toLocaleString();

let created=new Date(roomName?.createdAt?.toDate()).toLocaleString();

return (
        <div className="chat">
            <div className="chat_header">
            <Avatar />

            <div className="chat_headerInfo">
            <h3>{roomName?.Name}</h3>
            {
                (time==="Invalid Date" && created==="Invalid Date")?
                    (            
                    <p></p>
                    )
                :(
                        
                    (time!=="Invalid Date" && created!=="Invalid Date")?(  <p>Last seen at {new Date(
                            messages[messages.length-1]?.timestamp?.toDate()).toLocaleString()}
                            </p>)
                            :( 
                                (time==="Invalid Date")
                                ?(<p>Created at {new Date(roomName?.createdAt?.toDate()).toLocaleString()}</p>)
                                :(<p>Last seen at {new Date(messages[messages.length-1]?.timestamp?.toDate()).toLocaleString()}</p>)
                                               
                            )
                )
           
            }
                  
                    
            
            </div>
            <div className="chatHeaderRight">
            <IconButton>
                     <SearchOutlined />
                    </IconButton>

                    <IconButton>
                     <AttachFile />
                    </IconButton>

                    <IconButton onClick={deleteChatRoom}>
                     <DeleteIcon />
                    </IconButton>


            </div>
            </div>

            <div className="chat_body">
           
               {messages.map((text)=>(
                <p className={`chat_message  ${text.name === user.displayName && "chat_reciever"}`}>
                <span className="chat_name">{text.name}</span>
                {text.message} 
               <span className="chat_timestamp">
                {new Date(text.timestamp?.toDate()).toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }) }</span> 
                </p>
               ))} 
               
                
            </div>

            {(emochart===true)?(<Picker onEmojiClick={onEmojiClick} />  ):(<div></div>)
               }     
            <div className="chat_footer">
               
                
                <form>
                    <input value={input} onChange={(e)=> setInput(e.target.value)} type="text" placeholder="Type a message" />
                    <button onClick={sendMessage}>Send a message</button>
                </form>  
               
                {(isRecord===true)? (<div><IconButton><MicOffIcon onClick={stopRec} /></IconButton> <IconButton><InsertEmoticonIcon onClick={showEmoticons} />  </IconButton></div>)
                :( <div> <IconButton><InsertEmoticonIcon onClick={showEmoticons} />  </IconButton><IconButton><MicIcon onClick={startRec} /></IconButton></div>)
                }
               
                    
                  
            
     
            </div>

        </div>
    )
}

export default Chat
