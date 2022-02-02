
import React from "react";
import Chat from "./Chat";
import Login from "./Login";
import './App.css';
import Sidebar from "./Sidebar.js"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UseStateValue } from "./StateProvider";

function App() {
  const [{user} ,dispatch] =UseStateValue();
  return (
    <div className="app">
    {!user?(<Login/>):
    (

      <div className="app_body">
        <Router>
        <Sidebar/>
          <Routes>
         
            <Route path="/" element={<Chat/>}/>

            <Route path="/rooms/:roomId"  element={
  
    <Chat/>}/>
  
             
          </Routes>
        </Router>

      </div>
   )} </div>
  );
}

export default App;
