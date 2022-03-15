import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import jwtDecode from "jwt-decode";
import Bookcomp from "Bookcomp";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function Books() {
  const [userid, setUserid] = React.useState("");
  const [bookslist, setBooks] = React.useState([]);
  const [rank, setRank] = React.useState("");

  React.useEffect(() => {
    userss();
    if (rank == "Client") {
      returnBookss();
    } else if (rank == "Employee") {
      returnUnauthBooks();
    } else if (rank == "Admin") {
      returnExpensiveBooks();
    }
  }, [userid]);

  async function userss() {
    const token = localStorage.getItem("token");
    const newuser = jwtDecode(token);
    console.log(newuser);
    setUserid(newuser.id);
    console.log(userid);
    setRank(newuser.rank);
  }
  async function returnUnauthBooks() {
    console.log("HEllo");

    const response = await fetch("http://localhost:5000/Books/", {
      method: "GET",
    });
    const data = await response.json();
    if (data) {
      await setBooks(data);
      console.log(data);
    } else {
      console.log("no response");
    }
  }
  async function returnExpensiveBooks() {
    console.log("HEllo");

    const response = await fetch("http://localhost:5000/Books/toExpensive", {
      method: "GET",
    });
    const data = await response.json();
    if (data) {
      await setBooks(data);
      console.log(data);
    } else {
      console.log("no response");
    }
  }

  async function returnBookss() {
    console.log("HEllo");
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/Books/all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid,
        token,
      }),
    });
    const data = await response.json();
    if (data) {
      await setBooks(data);
      console.log(data);
    } else {
      console.log("no response");
    }
  }

  async function makeTooExpensivee(_id) {
    await console.log("ahhhhhhhhhh: " + _id);

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/Books/change", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        token,
      }),
    });
    const data = await response.json();
    if (data) {
      console.log(data);
    } else {
      console.log("no response");
    }
  }

  async function authPurchase(_id) {
    await console.log("ahhhhhhhhhh: " + _id);

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/Books/changeAuth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        token,
      }),
    });
    const data = await response.json();
    if (data) {
      console.log(data);
    } else {
      console.log("no response");
    }
  }

  async function deney(_id) {
    await console.log("ahhhhhhhhhh: " + _id);

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/Books/denied", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        token,
      }),
    });
    const data = await response.json();
    if (data) {
      console.log(data);
    } else {
      console.log("no response");
    }
  }

  function renderTableData() {
    return bookslist.map((book) => {
      const { bookName, cost, auth, denied, _id } = book;

      return (
        <tr>
          <td>{bookName}</td>
          <td>{cost}</td>
          {rank == "Client" && (
            <>
              <td>{auth.toString()}</td>
              <td>{denied.toString()}</td>
            </>
          )}
          {rank == "Employee" && (
            <>
              <td>USERNAME</td>
              <td>
                <Button variant="success" onClick={() => authPurchase(_id)}>
                  Click to Autherise for this user
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => makeTooExpensivee(_id)}>
                  REQUEST ADMIN PERMISSION
                </Button>
              </td>
            </>
          )}
          {rank == "Admin" && (
            <>
              <td>USERNAME</td>
              <td>
                <Button
                  variant="success"
                  onClick={() => makeTooExpensivee(_id)}
                >
                  ACCEPT REQUEST
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => deney(_id)}>
                  DENEY REQUEST
                </Button>
              </td>
            </>
          )}
        </tr>
      );
    });
  }

  function deniedPurchasesTable() {
    return bookslist.map((book) => {
      const { bookName, cost, denied } = book;

      return (
        <tr>
          {denied && (
            <>
              <td>{bookName}</td>
              <td>{cost}</td>
              <td>{denied.toString()}</td>
            </>
          )}
        </tr>
      );
    });
  }
function needsMoreInfoTable() {
  return bookslist.map((book) => {
    const { bookName, cost, denied, moreInfo } = book;

    return (
      <tr>
        {moreInfo && (
          <>
            <td>{bookName}</td>
            <td>{cost}</td>
          </>
        )}
      </tr>
    );
  });
}

  function acceptedPurchasesTable() {
    return bookslist.map((book) => {
      const { bookName, cost, auth } = book;

      return (
        <tr>
          {auth && (
            <>
              <td>{bookName}</td>
              <td>{cost}</td>
              <td>{auth.toString()}</td>
            </>
          )}
        </tr>
      );
    });
  }

  
  return (
    <div>
      {rank == "Client" ? (
        <h1>You are a client, these are your requested books:</h1>
      ) : (
        <h1></h1>
      )}

      {rank == "Employee" ? (
        <h1>You are a emp, These are all the reqyests from Clients:</h1>
      ) : (
        <h1></h1>
      )}

      {rank == "Admin" ? (
        <h1>You are a admin, here are all the unautherised Books: </h1>
      ) : (
        <h1></h1>
      )}

      <h1></h1>
      <Table striped bordered hover>
        <thead>
          {rank == "Client" && (
            <tr>
              <th>Book Name</th>
              <th>Cost</th>
              <th>Is Autherised By Employee</th>
              <th>Is Too Expensive by Admin</th>
            </tr>
          )}
          {rank == "Employee" && (
            <tr>
              <th>Book Name</th>
              <th>Cost</th>
              <th>User</th>
              <th>Autherise</th>
              <th>Ask Admin</th>
              <th>Request More Information</th>
            </tr>
          )}
          {rank == "Admin" && (
            <tr>
              <th>Book Name</th>
              <th>Cost</th>
              <th>User</th>
              <th>Autherise Cost</th>
              <th>Deney Purchase</th>
            </tr>
          )}
        </thead>
        <tbody>{renderTableData()}</tbody>
      </Table>
      <h1>Needs more Information</h1>
      <Table striped bordered hover>
        <thead>
          {rank == "Client" && (
            <tr>
              <th>Book Name</th>
              <th>Cost</th>
            </tr>
          )}
        </thead>
        <tbody>{needsMoreInfoTable()}</tbody>
      </Table>
      <h1>Denied Purchases</h1>
      <Table striped bordered hover>
        <thead>
          {rank == "Client" && (
            <tr>
              <th>Book Name</th>
              <th>Cost</th>
              <th>Is Too Expensive by Admin</th>
            </tr>
          )}
        </thead>
        <tbody>{deniedPurchasesTable()}</tbody>
      </Table>
      <h1>Accepted Purchases</h1>
      <Table striped bordered hover>
        <thead>
          {rank == "Client" && (
            <tr>
              <th>Book Name</th>
              <th>Cost</th>
              <th>Accpeted</th>
            </tr>
          )}
        </thead>
        <tbody>{acceptedPurchasesTable()}</tbody>
      </Table>
    </div>
  );
}

export default Books;
