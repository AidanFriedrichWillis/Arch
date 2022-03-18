import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import jwtDecode from "jwt-decode";
import Bookcomp from "Bookcomp";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Request from "Request";
function Books() {
  const [userid, setUserid] = React.useState("");
  let [bookName, setBookName] = React.useState("");
  let [bookslist, setBooks] = React.useState([]);
  let [searchTerm, setSearchTerm] = React.useState("");
  const [rank, setRank] = React.useState("");
  let [moreInfoRequest, setMoreInfoRequest] = React.useState(false);
  let [currentBookID, setcurrentBookID] = React.useState(null);

  React.useEffect(
    () => {
      userss();
      if (rank == "Client") {
        returnBookss();
      } else if (rank == "Employee") {
        returnUnauthBooks();
      } else if (rank == "Admin") {
        returnExpensiveBooks();
      }
    },
    [userid],
    [bookName],
    [bookslist],
    [searchTerm]
  );

  async function userss() {
    const token = localStorage.getItem("token");
    const newuser = jwtDecode(token);
    console.log(newuser);
    setUserid(newuser.id);
    console.log(userid);
    setRank(newuser.rank);
  }

  async function makeTooExpensivee(_id) {
    await console.log("ahhhhhhhhhh: " + _id);

    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:5000/Books/change/${_id}`, {
      method: "PUT",
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
     var filtered = bookslist.filter(function (value, index, arr) {
       return value._id != _id;
     });
     console.log(filtered);
     setBooks(filtered);
  }

  async function authPurchase(_id) {
    await console.log("ahhhhhhhhhh: " + _id);
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:5000/Books/changeAuth/${_id}`,
      {
        method: "PUT",
        headers: {
          Authorization: token,
        },
      }
    );
    const data = await response.json();
    if (data) {
      console.log(data);
    } else {
      console.log("no response");
    }
     var filtered = bookslist.filter(function (value, index, arr) {
       return value._id != _id;
     });
     console.log(filtered);
     setBooks(filtered);
  }

  async function returnUnauthBooks() {
    console.log("HEllo");
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/Books/", {
      method: "GET",
      headers: {
        Authorization: token,
      },
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
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/Books/toExpensive", {
      method: "GET",
      headers: {
        Authorization: token,
      },
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
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:5000/Books/allforuser/${userid}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );
    const data = await response.json();
    if (data) {
      await setBooks(data);
      console.log(data);
    } else {
      console.log("no response");
    }
  }

  async function deney(_id) {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5000/Books/denied/${_id}`, {
      
        method: "PUT",
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
     var filtered = bookslist.filter(function (value, index, arr) {
       return value._id != _id;
     });
     console.log(filtered);
     setBooks(filtered);
  }

  async function requestInfo(_id) {
    await console.log("ahhhhhhhhhh: " + _id);
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5000/Books/moreInfo/${_id}`,
      {
        method: "PUT",
        headers: {
          Authorization: token,
        },
      }
    );
    const data = await response.json();
    if (data) {
      console.log(data);
    } else {
      console.log("no response");
    }
     var filtered = bookslist.filter(function (value, index, arr) {
       return value._id != _id;
     });
     console.log(filtered);
     setBooks(filtered);
  }

  function renderTableData() {
    return bookslist
      .filter((book) => {
        if (searchTerm == "") {
          return book;
        } else if (
          book.bookName.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return book;
        }
      })
      .map((book) => {
        const { bookName, cost, auth, denied, _id, moreInfo, userid } = book;

        return (
          <tr>
            {rank == "Client" && !auth && !denied && !moreInfo && (
              <>
                <td>{bookName}</td>
                <td>{cost}</td>
              </>
            )}
            {rank == "Employee" && !moreInfo && (
              <>
                <td>{bookName}</td>
                <td>{cost}</td>
                <td>{userid}</td>
                <td>
                  <Button variant="success" onClick={() => authPurchase(_id)}>
                    Click to Autherise for this user
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => makeTooExpensivee(_id)}
                  >
                    REQUEST ADMIN PERMISSION
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => requestInfo(_id)}>
                    REQUEST INFO
                  </Button>
                </td>
              </>
            )}
            {rank == "Admin" && (
              <>
                <td>{bookName}</td>
                <td>{cost}</td>
                <td>{userid}</td>
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

  async function changeMoreInfoState(book) {
    setMoreInfoRequest(!moreInfoRequest);
    setcurrentBookID(book)
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
      const { bookName, cost, denied, moreInfo, _id } = book;

      return (
        <tr>
          {moreInfo && (
            <>
              <td>{bookName}</td>
              <td>{cost}</td>
              <td>
                <Button onClick={() => changeMoreInfoState(book)}>
                  AddMoreInfo
                </Button>
              </td>
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
      <div className="col-md-12">
        <div classname="card card-container">
          <form className="form-horizontal">
            <div className="form-group">
              <label className="sr-only" for="email">
                Book Name:
              </label>
              <input
                className="form-control"
                id="searchTerm"
                input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="searchTerm"
              />
            </div>
          </form>
        </div>
      </div>
      {rank == "Client" && (
        <h1>You are a client, these are your requested books:</h1>
      )}

      {rank == "Employee" && (
        <h1>You are a Employee, These are all the requests from Clients:</h1>
      )}
      {rank == "Admin" && (
        <h1>You are an admin, here are all the unautherised Books: </h1>
      )}

      <h1></h1>
      <Table striped bordered hover>
        <thead>
          {rank == "Client" && (
            <tr>
              <th>Book Name</th>
              <th>Cost</th>
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

      {rank == "Client" && <h1>Needs more Information</h1>}
      <Table striped bordered hover>
        <thead>
          {rank == "Client" && (
            <tr>
              <th>Book Name</th>
              <th>Cost</th>
              <th>More Info</th>
            </tr>
          )}
        </thead>
        <tbody>{needsMoreInfoTable()}</tbody>
      </Table>
      {moreInfoRequest && (
        <Request
          currentBookID={currentBookID}
          returnBookss={() => returnBookss()}
        />
      )}
      {rank == "Client" && (
        <>
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
        </>
      )}
      {rank == "Client" && <h1>Accepted Purchases</h1>}
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
