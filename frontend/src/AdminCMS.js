import React from "react";
import jwtDecode from "jwt-decode";
import TableUsers from "TableUsers"
function AdminCMS() {

  const [userList, setusers] = React.useState([]);


  React.useEffect(() => {
      userss();
    getUsers();
  },[]);

  
  async function userss() {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    if(user.rank != "Admin"){
            window.location.href = "/";

    }
  }

  async function getUsers() {
          const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/users/", {
      method: "GET",
      headers: {
        "x-access-token": token,
      },
    });
    const data = await response.json();
    if (data) {
      setusers(data)
      console.log(data);
    } else {
      console.log("no response");
    }
  }

  return (
      <div>
          <TableUsers userList={userList}/>
      </div>
  )
}
export default AdminCMS;
