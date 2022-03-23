import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

function App(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rank, setRank] = React.useState("");

  async function registerUser(event) {
    event.preventDefault();
    if (username == "" || password == "" || rank == "") {
      window.alert("please fill out all fields");
    } else {
      const response = await fetch("http://localhost:5000/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          rank,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (props.getUsers) {
        props.getUsers();
      } else {
        alert("register Successful");
        window.location.href = "/";
      }
    }
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
