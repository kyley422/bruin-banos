import React from "react";
import "./styles.css";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import AddBathroom from "./pages/add_bathroom/AddBathroom";
import Bathroom from "./pages/bathroom/Bathroom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Review from "./pages/review/Review";
import Navbar from "./components/Navbar";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-bathroom" element={<AddBathroom />} />
          <Route path="/bathroom" element={<Bathroom />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth}/>} />
          <Route path="/review" element={<Review />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;