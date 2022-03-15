import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function App(props) {



  React.useEffect(() => {
  
  });

 async function deleteAcount(_id){

        // fetch(`http://localhost:5000/users/${_id}`, {
        //   method: "DELETE",
        // });

 }

  function renderTableData() {
    return props.userList.map((user) => {
      const { _id,username,rank } = user;

      return (
        <tr>
          <td>
              {_id}
          </td>
          <td>
              {username}
          </td>
          <td>
              {rank}
          </td>
          <td>
              <Button onClick= {()=>{deleteAcount(_id)}}>Delete ACCOUNT</Button>
          </td>
        </tr>
      );
    });
  }
  return (
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
  );
}

export default App;
