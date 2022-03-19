import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import jwtDecode from "jwt-decode";
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
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            )}
            {logged && (
              <>
                <Nav.Link href="/books">Book Requests</Nav.Link>
                <Nav.Link>Welcome: {userName}</Nav.Link>
                <Button onClick={() => logOut()}>LOG OUT</Button>
              </>
            )}
            {rank == "Admin" && (
              <>
                <Nav.Link href="/adminPage">Admin Page</Nav.Link>
              </>
            )}
            {rank == "Client" && (
              <>
                <Nav.Link href="/request">Request A Book</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
export default App;
