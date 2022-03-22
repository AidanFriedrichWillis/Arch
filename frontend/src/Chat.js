import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import jwtDecode from "jwt-decode";
import { authPage } from "Func";
let socket;

function Chat({ locaiton }) {
  const token = localStorage.getItem("token");
  let user;
  if (token) {
    user = jwtDecode(token);
  }

  const username = user.username;
  const rank = user.rank;
  const [message, setMessage] = useState("");
  const [meshistory, setmeshistory] = useState([]);

  const ENDPOINT = "localhost:5000";
  useEffect(() => {
    authPage("any");

    socket = io(ENDPOINT);
    socket.on("message", (message) => {
      let messages = [];
      messages.push(message);
      setmeshistory((meshistory) => [...meshistory, message]);
    });
  }, [ENDPOINT]);

  async function sendMessage(e) {
    e.preventDefault();

    if (message) {
      socket.emit("sendMessage", { message, username, rank });
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
