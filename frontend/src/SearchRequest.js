import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Table from "react-bootstrap/Table";
import jwtDecode from "jwt-decode";

function App(props) {
  const [cost, setcost] = React.useState("");
  const [bookName, setBookName] = React.useState("");
  const [bookslist, setBookslist] = React.useState([]);
  async function returnBased(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    const response = await fetch(
      `http://localhost:5000/Books/search?bookName=${bookName}&cost=${cost}&userid${user.id}`,
      {
        method: "GET",
        headers: {
          authorization: token,
        },
      }
    );
    const data = await response.json();
    if (data) {
      await setBookslist(data);
    }
    console.log(data);
  }

  return (
    <div>
      <h1>search for book</h1>
      <form onSubmit={returnBased}>
        <br />
        <input
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          type="text"
          placeholder="search by name"
        />
        <br />
        <input
          value={cost}
          onChange={(e) => setcost(e.target.value)}
          type="text"
          placeholder="search by cost less than"
        />
        <br />

        <input type="submit" value="Search" />
      </form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {bookslist.map((book) => {
            const { bookName, cost } = book;
            return (
              <>
                <tr>
                  <td>{bookName}</td>
                  <td>{cost}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
