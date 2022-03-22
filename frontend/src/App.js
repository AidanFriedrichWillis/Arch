import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Login from "Login";
import Register from "Register";
import Books from "Books";
import Request from "Request";
import AdminCMS from "AdminCMS";
import Navbar from "components/Navbar";
import Chat from "Chat";
import SearchRequest from "SearchRequest";
import UpdateUser from "UpdateUser";

/*
  THIS IS THE MAIN COMPONENT,
  THIS RETURNS THE NAVBAR 
  AND SETS UP ALL THE ROUTE PATHS FOR THE URLS
*/



function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/request" element={<Request />} />
        <Route path="/books" element={<Books />} />
        <Route path="/adminPage" element={<AdminCMS />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/search" element={<SearchRequest />} />
        <Route path="/update" element={<UpdateUser />} />
      </Routes>
    </div>
  );
}

export default App;
