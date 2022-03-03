import {Routes, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import jwtDecode from 'jwt-decode';


function Request() {

    const[bookName,setBookName] =  React.useState('');
    const[cost,setCost] = React.useState('');
    const[auth,setAuth] = React.useState(false);
    const[toExpensive,settoExpensive] = React.useState(false);
     const[denied,setDenied] = React.useState(false);



    async function addBook(event){
        event.preventDefault();

        const token = localStorage.getItem('token')
        console.log(token)
		  if (token) {
			  const user = jwtDecode(token)
            console.log(user)
            if(user){
                const userid =user.id;
                console.log(userid)
                await setAuth(false);
                await settoExpensive(false)
                await setDenied(false)
                const response = await fetch('http://localhost:5000/Books/add/',{
                    method: 'POST',
                    headers:{
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        bookName,
                        cost,
                        auth,
                        userid,
                        toExpensive,
                        token,
                        denied,
                    }),
                  })
                  const data = await response.json()
                  console.log(data)
                //   window.location.href = '/books'


            }
		}
        else{
            console.log("not logged in")

        }



      
      
      
      }
      


  return (
    
    <form onSubmit={addBook}>
    <br/>
    <input value={bookName} 
    onChange={(e) => setBookName(e.target.value)}
    type="text" placeholder='bookname'/>
            <br/>

    <input
    value={cost} 
    onChange={(e) => setCost(e.target.value)}
    type="text" placeholder='cost'/>
    
    <br/>

  <input type="submit" value= "Send Request"/>

  </form>
  );
}

export default Request;
