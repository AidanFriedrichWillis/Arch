import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import jwtDecode from "jwt-decode";
import { Link } from "../../node_modules/react-router-dom/index";
let userName;
function App() {
  const [rank, setRank] = React.useState("");
  let [userName, setName] = React.useState("");
  const [logged, setLog] = React.useState(false);
  
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      if (user) {
        userName = user.username
        console.log(user);
        setRank(user.rank);
        setName(user.username);
        setLog(true);
      }
    }
  },[]);

  async function logOut() {
    setLog(false);
    localStorage.clear();
  }
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Book</Navbar.Brand>
          <Nav className="me-auto">
            {!logged && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
            {logged && (
              <>
                <Nav.Link as={Link} to="/books">
                  Book Requests
                </Nav.Link>
                <Nav.Link>Welcome: {userName}</Nav.Link>
                <Button onClick={() => logOut()}>LOG OUT</Button>
              </>
            )}
            {rank == "Admin" && logged && (
              <>
                <Nav.Link as={Link} to="/adminPage">
                  Admin Page
                </Nav.Link>
              </>
            )}
            {rank == "Client" && logged && (
              <>
                <Nav.Link as={Link} to="/request">
                  Request A Book
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
export default App;
