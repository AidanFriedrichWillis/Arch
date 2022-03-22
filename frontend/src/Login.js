import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function loginUser(event) {
    event.preventDefault();
    if (username == "" || password == "") {
      window.alert("please enter a value");
    } else {
      const response = await fetch("http://localhost:5000/users/find", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();

      if (data.user) {
        localStorage.setItem("token", data.user);
        alert("Login Successful");
        window.location.href = "/";
      } else {
        alert("Invalid Username or password");
      }
    }
  }

  return (
    <div>
      <form onSubmit={loginUser} className="form-horizontal">
        <label>UserName:</label>
        <input
          id="usernameid"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
        />
        <label>Password:</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="password"
          id="pwd"
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
