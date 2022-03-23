import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import jwtDecode from "jwt-decode";
import { authPage } from "Func";

function Request(props) {
  let [bookName, setBookName] = React.useState("");
  let [cost, setCost] = React.useState("");
  const [auth, setAuth] = React.useState(false);
  const [toExpensive, settoExpensive] = React.useState(false);
  const [denied, setDenied] = React.useState(false);
  const [moreInfo, setmoreInfo] = React.useState(false);
  let [currentBookID, setcurrentBookID] = React.useState(null);

  React.useEffect(() => {});

  async function addBook() {
    if(bookName =="" || cost ==""){
      window.alert("please fill all feilds")
    }
    else{
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      if (user) {
        const userid = user.id;
        await setAuth(false);
        await settoExpensive(false);
        await setDenied(false);
        await setmoreInfo(false);
        const response = await fetch("http://localhost:5000/Books/add/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            bookName,
            cost,
            auth,
            userid,
            toExpensive,
            token,
            denied,
            moreInfo,
          }),
        });
        const data = await response.json();
        console.log(data);
         alert("Book request made");
         window.location.href = "/";
      }
    } else {
      console.log("not logged in");
    }

    }
  }
  async function editBook() {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    const bookid = props.currentBookID._id;
    const userid = user.id;

    const response = await fetch(
      `http://localhost:5000/books/update/${bookid}`,
      {
        method: "PUT",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookName,
          cost,
        }),
      }
    );
    const data = await response.json();
    if (data) {
      console.log(data);
      
    } else {
      console.log("no response");
    }
    props.returnBookss();
    props.setMoreInfoRequest();
  }

  async function checker(event) {
    event.preventDefault();
    if (!props.currentBookID) {
      addBook();
    } else {
      editBook();
    }
  }

  return (
    <>
      {authPage("Client") ? (
        <>
          <form onSubmit={checker}>
            <br />
            <input
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              type="text"
              placeholder="bookname"
            />
            <br />

            <input
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              type="text"
              placeholder="cost"
            />

            <br />
            {props.currentBookID ? (
              <input type="submit" value="Update Request" />
            ) : (
              <input type="submit" value="Send Request" />
            )}
          </form>
        </>
      ) : (
        <h1>WRONG PERMISSIONS</h1>
      )}
    </>
  );
}

export default Request;
