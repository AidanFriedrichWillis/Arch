import {Routes, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import Login from 'Login'
import Home from 'Home'
import Register from 'Register'
import jwtDecode from 'jwt-decode';
import Books from "Books";
import Request from "Request";
import AdminCMS from "AdminCMS";
import Navbar from "components/Navbar"
import Chat from 'Chat';
import Join from 'Join';
import SearchRequest from "SearchRequest"
import UpdateUser from "UpdateUser"
function App() {


  

  return (
    <div>
      <Navbar />
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/request" element={<Request />} />
        <Route path="/books" element={<Books />} />
        <Route path="/adminPage" element={<AdminCMS />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/join" element={<Join />} />
        <Route path="/search" element={<SearchRequest />} />
        <Route path="/update" element={<UpdateUser />} />
      </Routes>
    </div>
  );
}

export default App;
