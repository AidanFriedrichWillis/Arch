import React, {useState, useEffect} from "react";
import queryString from 'query-string'
import io from 'socket.io-client'
import Input from "./Input";
import InfoBar from "InfoBar";
import TextContainer from "TextContainer";
import Messages from "Messages";

let socket;

function Chat({locaiton}) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
      const [messages, setMessages] = useState([]);
      const [message, setMessage] = useState("");
  const [users, setUsers] = useState("");

    const ENDPOINT = "localhost:5000";
useEffect(()=>{
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
socket = io(ENDPOINT);
setName(urlParams.get("name"));
setRoom(urlParams.get("room"));
socket.emit('join', {name:name , room:room}, ({})=>{
})


return ()=>{
    socket.emit('disconnect');
    socket.off();
}

},[ENDPOINT],window.location.search)

 useEffect(() => {
   socket.on("message", (message) => {
     setMessages((messages) => [...messages, message]);
   });

   socket.on("roomData", ({ users }) => {
     setUsers(users);
   });
 }, []);

 const sendMessage = (event) => {
   event.preventDefault();

   if (message) {
     socket.emit("sendMessage", message, () => setMessage(""));
   }
 };

 return (
   <div className="outerContainer">
     <div className="container">
       <InfoBar room={room} />
       <Messages messages={messages} name={name} />
       <Input
         message={message}
         setMessage={setMessage}
         sendMessage={sendMessage}
       />
     </div>
     <TextContainer users={users} />
   </div>
 );

}

export default Chat;
