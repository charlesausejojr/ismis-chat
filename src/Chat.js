import React, { useState, useEffect } from 'react'
import "./Chat.css"
import Message from "./Message"
import { useSelector } from 'react-redux'
import { selectChatName, selectChatId } from './features/chatSlice'
import db from "./firebase"
import firebase from "firebase"
import { selectUser } from "./features/userSlice"
import FlipMove from 'react-flip-move'

function Chat() {

    const user = useSelector(selectUser);
    const [input, setInput] = useState("");
    const chatName = useSelector(selectChatName);
    const chatId = useSelector(selectChatId);
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        if(chatId){
            db.collection("chats")
            .doc(chatId)
            .collection("messages")
            .orderBy('timestamp', 'desc')
            .onSnapshot( snapshot => 
            setMessages(snapshot.docs.map( doc => ({
                id: doc.id,
                data: doc.data()
            }))));
        }
    },[chatId])

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .add({
            uid: user.uid,
            photo: user.photo,
            email: user.email,
            displayName: user.displayName,
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setInput("");
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <h4>To: <span className="chat__name">{chatName}</span></h4>
            </div>

            <div className="chat__messages">
            <FlipMove>
                {messages.map(({ id, data}) => (
                    <Message key={id} contents={data} />
                ))}
            </FlipMove>           
               
            </div>

            <div className="chat__input">
                <form>
                    <input
                    value={input}
                    onChange={(e) => {setInput(e.target.value)}}
                    placeholder="Send Message" type="text"/>
                    <button 
                    onClick={sendMessage}></button>
                </form>
            </div>
        </div>
    )
}

export default Chat
