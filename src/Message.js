import { Avatar } from '@material-ui/core'
import React, { forwardRef } from 'react'
import "./Message.css"
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'

const Message = forwardRef(
    ({id, contents: {timestamp, displayName, email, message, photo, uid} }, ref) => {
   
    const user = useSelector(selectUser);
   
    return (
        <div ref={ref} className={user.email === email? "message message__sender": "message"}>
            <Avatar className="message__photo" src={photo}/>
            <p>{message}</p>
            <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
        </div>
    )
})

export default Message
