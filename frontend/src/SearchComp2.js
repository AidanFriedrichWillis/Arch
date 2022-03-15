import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import jwtDecode from "jwt-decode";
import ClientTable from "ClientTable";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function App() {
  let [bookName, setBookName] = React.useState("");
  let [bookslist, setBookslist] = React.useState([]);
  const [rank, setRank] = React.useState("");

  React.useEffect(() => {
    returnBooks();
  });

  async function returnBooks(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    console.log(token);
    const user = jwtDecode(token);
    await setRank(user.rank);

    const userid = user.id;
    const response = await fetch("http://localhost:5000/Books/find", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookName,
        userid,
        token,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.user) {
      await setBookslist(data);
      console.log(bookslist);
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

  async function requestInfo(_id) {
    await console.log("ahhhhhhhhhh: " + _id);

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/Books/moreInfo", {
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
    return bookslist
      .filter((book) => {
        if (bookName == "") {
          return book;
        }
      })
      .map((book) => {
        const { bookName, cost, auth, denied, _id, moreInfo } = book;

        return (
          <tr>
            {rank == "Client" && !auth && !denied && (
              <>
                <td>{bookName}</td>
                <td>{cost}</td>
              </>
            )}
            {rank == "Employee" && !moreInfo && (
              <>
                <td>{bookName}</td>
                <td>{cost}</td>
                <td>USERNAME</td>
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

  return (
    <div>
      <div className="col-md-12">
        <div classname="card card-container">
          <form className="form-horizontal" onSubmit={returnBooks}>
            <div className="form-group">
              <label className="sr-only" for="email">
                Book Name:
              </label>
              <input
                className="form-control"
                id="bookNameid"
                input
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                type="text"
                placeholder="username"
              />
            </div>
          </form>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          {rank == "Client" && (
            <tr>
              <th>bookName</th>
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
    </div>
  );
}

export default App;
