import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/LoginPage/Login";
import Register from "./Components/LoginPage/Register";
import Header from "./Components/Header";
import EventPage from "./Components/EventPage/index"

function App() {
  return (
    <div>
      
      <Router>
      <Header />
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/events" element={<EventPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
