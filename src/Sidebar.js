import { Avatar, IconButton } from '@material-ui/core'
import { ExitToApp, SearchOutlined } from '@material-ui/icons'
import AddIcon from '@material-ui/icons/Add';
import React from 'react'
import "./Sidebar.css"
import SidebarChat from "./SidebarChat"
import { useSelector } from 'react-redux';
import { selectUser } from "./features/userSlice";
import db, {auth} from "./firebase";
import { useState, useEffect } from 'react';

function Sidebar() {
    const user = useSelector(selectUser);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        db.collection("chats").onSnapshot((snapshot) => {
            setChats(
                snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            })));
        });
    }, []);



    const addChat = () => {
        const chatName = prompt("Enter new Chat Name");
        if(chatName){
            db.collection("chats").add({
                chatName: chatName,
            });
        }
    };
    return (
        <div className="sidebar">
            
            <div className="sidebar__header">
                <Avatar src={user.photo} className="sidebar__avatar"/>
                <div className="sidebar__input">
                    <SearchOutlined/>
                    <input placeholder="Search" type="text"/>
                </div>
                <div className="sidebar__headerIcons">
                    <IconButton className="sidebar__inputButton">
                        <AddIcon onClick={addChat}/>
                    </IconButton>
                    <IconButton>
                        <ExitToApp onClick = {() => auth.signOut()}/>
                    </IconButton>
                </div>
                
            </div>
            <div className="sidebar__chats">
                {chats.map(({id, data: { chatName } }) => (
                    <SidebarChat key={id} id={id} chatName={chatName}/>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
