import {Routes, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import Login from 'Login'
import Home from 'Home'
import Register from 'Register'
import jwtDecode from 'jwt-decode';
import Books from "Books";
import Request from "Request"

function App() {


	const token = localStorage.getItem('token')
  console.log(token)
  

  const [user, setUser] = React.useState(null);




  return(

    <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/restaurants" className="navbar-brand">
          IDK
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/books"} className="nav-link">
              Books
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/request"} className="nav-link">
            request
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
              Register
            </Link>
          </li>
          
        </div>
      </nav>

      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/request" element={<Request/>}/>
        <Route path="/books" element={<Books/>}/>


        
          {/* <Route 
            element = {<Login login={login}/> } 
          />
           <Route 
            element = {<Register/> } 
          />
            <Route 
            element = {<Request/> } 
          /> */}
          
      </Routes>
      
    
    </div>
    
    
  )
}

export default App;
