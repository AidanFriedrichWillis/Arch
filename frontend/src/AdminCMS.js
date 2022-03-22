
//IMPORTS
import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Register from "Register";
import { authPage } from "Func";

/**
 THIS IS THE VIEW FOR MY AMDIN CMS PAGE, 
 IT ALLOWS FOR DELETE REQUESTS TO BE SEND
 IT ALSO ALLOWS POST,CREATE REQUESTS TO BE SENT 

 */

function AdminCMS() {
  let [userList, setusers] = React.useState([]);

  React.useEffect(() => {
    userss();

    getUsers();
  }, []);

  async function userss() {
    authPage("Admin");
  }
  //RESTFULL DELETE REQUEST FOR BOOKS FROM AMDIN
  async function deleteBooksFromAccount(_id, token) {
    const response = await fetch("http://localhost:5000/Books/delete/" + _id, {
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
  }
  //RESTFUL DELETE REQUEST FOR SPECIFIC USER
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
    deleteBooksFromAccount(_id, token);

    var filtered = userList.filter(function (value, index, arr) {
      return value._id != _id;
    });
    console.log(filtered);
    setusers(filtered);
  }
  //GET REQUEST FOR ALL USERS 
  async function getUsers() {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/users/", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const data = await response.json();
    if (data) {
      setusers(data);
      console.log(data);
    } else {
      console.log("no response");
    }
  }
  //RENDERS A REACTIVE TABLE DATA, FROM THE REQUESTS MADE
  function renderTableData() {
    return userList.map((user) => {
      const { _id, username, rank } = user;
      return (
        <tr key={_id}>
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
  //BASE RETURN STATMENT CREATING HEADERS FOR TABLE
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

      <Register getUsers={() => getUsers()} />
    </>
  );
}
export default AdminCMS;
