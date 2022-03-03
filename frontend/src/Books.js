import {Routes, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import jwtDecode from 'jwt-decode';
import * as ReactBootStrap from "react-bootstrap"
import Bookcomp from 'Bookcomp';

function Books() {

  const [userid,setUserid] = React.useState("");
  const [bookslist, setBooks] = React.useState([]);
  const [rank, setRank] = React.useState("");


  React.useEffect(() => {
    userss();
    if(rank == "Client"){
      returnBookss();
    }
    else if(rank == "Employee"){
        returnUnauthBooks()

    }
    else if(rank == "Admin"){
        returnExpensiveBooks()

    }
  },[userid]);

  
 async function userss(){
    const token = localStorage.getItem('token')
    const newuser = jwtDecode(token);
    console.log(newuser);
    setUserid(newuser.id);
    console.log(userid);
    setRank(newuser.rank)

  }
    async function returnUnauthBooks(){
    console.log("HEllo")

      
      const response = await fetch('http://localhost:5000/Books/',{
        method: 'GET',
        
      })
      const data = await response.json()
      if(data){
          
          await setBooks(data);
          console.log(data)
      }
      else{
          console.log("no response")
      }
  
    
  }
    async function returnExpensiveBooks(){
    console.log("HEllo")

      
      const response = await fetch('http://localhost:5000/Books/toExpensive',{
        method: 'GET',
        
      })
      const data = await response.json()
      if(data){
          
          await setBooks(data);
          console.log(data)
      }
      else{
          console.log("no response")
      }
  
    
  }



  
  async function returnBookss(){
    console.log("HEllo")
    const token = localStorage.getItem('token')

      
      const response = await fetch('http://localhost:5000/Books/all',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid,
          token,
        }),
      })
      const data = await response.json()
      if(data){
          
          await setBooks(data);
          console.log(data)
      }
      else{
          console.log("no response")
      }
  
    
  }


  



  return (
    
    <div>

      {rank == "Client" ? (
        <h1>You are a client, THese are your books:</h1>
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
        {bookslist.map((book) => {

          return( 
          <div>
          <Bookcomp book={book} rank={rank} ></Bookcomp>
             
          
            </div>
          )
        })}

    </div>

  )

}

export default Books;
