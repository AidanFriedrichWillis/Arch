//IMPORTS:
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

/* 
CLIENTTABLE COMMPONENT
 
*/

function App(props) {
  let [bookslist, setBookList] = React.useState(props.bookslist);
  let [rank, setRank] = React.useState(props.rank);

  React.useEffect(() => {
    setBookList(props.bookslist);
    setRank(props.rank);
  });

  async function makeTooExpensivee(_id) {
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
    } else {
    }
  }

  async function authPurchase(_id) {
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
    } else {
    }
  }

  async function deney(_id) {
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
    } else {
    }
  }

  async function requestInfo(_id) {
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
    } else {
    }
  }

  function renderTableData() {
    return bookslist.map((book) => {
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
                <Button variant="danger" onClick={() => makeTooExpensivee(_id)}>
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
  );
}

export default App;
