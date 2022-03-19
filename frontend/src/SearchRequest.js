import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

import { Button } from "bootstrap";

function App(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rank, setRank] = React.useState("");

  async function registerUser(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/Books/search?limit=20&xd=1", {
      method: "GET",
      headers: {
      },
    });
    const data = await response.json();
    console.log(data);
  
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <br />
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="password"
        />
        <br />
        <input
          value="Client"
          onChange={(e) => setRank(e.target.value)}
          type="radio"
        />{" "}
        Client
        <br />
        <input
          value="Employee"
          onChange={(e) => setRank(e.target.value)}
          type="radio"
        />{" "}
        Employee
        <br />
        <input
          value="Admin"
          onChange={(e) => setRank(e.target.value)}
          type="radio"
        />{" "}
        Admin
        <br />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

export default App;
