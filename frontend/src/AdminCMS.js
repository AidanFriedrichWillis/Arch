import React from "react";
import jwtDecode from "jwt-decode";
import TableUsers from "TableUsers"
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Register from "Register";

function AdminCMS() {

  let [userList, setusers] = React.useState([]);

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
  async function deleteAcount(_id) {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/users/" + _id, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    const data = await response.json();
    if (data) {
      console.log(data);
    } else {
      console.log("no response");
    }
        var filtered = userList.filter(function (value, index, arr) {
          return value._id != _id;
        });
        console.log(filtered);
        setusers(filtered);

    // window.location.reload(false);
  }

  async function getUsers() {
    

    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/users/", {
      method: "GET",
      headers:{
          Authorization: token,
      }
    
    });
    const data = await response.json();
    if (data) {
      setusers(data)
      console.log(data);
    } else {
      console.log("no response");
    }
  }

   function renderTableData() {
     return userList.map((user) => {
       const { _id, username, rank } = user;

       return (
         <tr>
           <td>{_id}</td>
           <td>{username}</td>
           <td>{rank}</td>
           <td>
             <Button
               onClick={() => {
                 deleteAcount(_id);
               }}
             >
               Delete ACCOUNT
             </Button>
           </td>
         </tr>
       );
     });
   }
   return (
     <>
       <Table striped bordered hover>
         <thead>
           <tr>
             <th>userID</th>
             <th>USerName</th>
             <th>Rank</th>
           </tr>
         </thead>
         <tbody>{renderTableData()}</tbody>
       </Table>
       <Register getUsers = {()=>getUsers()} />
     </>
   );
}
export default AdminCMS;
