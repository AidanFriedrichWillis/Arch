import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import Input from "./Input";
import InfoBar from "InfoBar";
import TextContainer from "TextContainer";
import Messages from "Messages";
import jwtDecode from "jwt-decode";
import Message from "Message";
import {authPage} from "Func"
let socket;

function Chat({ locaiton }) {
        const token = localStorage.getItem("token");
        let user;
        if (token) {
          user = jwtDecode(token);
        }

  const username = user.username
  const rank = user.rank
  const [message, setMessage] = useState("");
  const [meshistory, setmeshistory] = useState([]);

  const ENDPOINT = "localhost:5000";
  useEffect(
    () => {
     authPage("any")
      
      socket = io(ENDPOINT);
       socket.on("message", (message) => {
            let messages = [];
            messages.push(message);
            setmeshistory((meshistory) => [...meshistory, message]);
        });

      //  socket.on("roomData", ({ users }) => {
      //    setUsers(users);
      //  });
      console.log(socket)
     
    }
    ,[ENDPOINT]
  );

  async function sendMessage(e) {
        e.preventDefault();
    
    if (message) {
      
      socket.emit("sendMessage", {message, username, rank});
    }
  }

  return (
    <>
      <input onChange={(e) => setMessage(e.target.value)}></input>
      <button className="sendButton" onClick={(e) => sendMessage(e)}>
        Send
      </button>
      {meshistory.map((message) => {
        return (
          <>
            <h1>{message}</h1>
          </>
        );
      })}
    </>
  );
}

export default Chat;
