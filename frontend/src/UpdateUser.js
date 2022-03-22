import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import jwtDecode from "jwt-decode";

function App(props) {
  const [newusername, setUsernme] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  async function updateAccount(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    const username = user.username;
    const response = await fetch(
      `http://localhost:5000/Users/update/${user.id}`,
      {
        method: "PUT",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          newusername,
          password,
          newPassword,
        }),
      }
    );
    const data = await response.json();
    if (data) {
      console.log(data);
      localStorage.clear();
      window.alert("Please Log In Again");
      window.location.href = "/";
    }
  }

  return (
    <div>
      <h1>Update Account</h1>
      <form onSubmit={updateAccount}>
        <br />
        <input
          value={newusername}
          onChange={(e) => setUsernme(e.target.value)}
          type="text"
          placeholder="New user name"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="type old password"
        />
        <br />
        <input
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          type="text"
          placeholder="Type New Password"
        />

        <input type="submit" value="Change" />
      </form>
    </div>
  );
}

export default App;
