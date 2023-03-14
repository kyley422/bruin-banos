import React from "react";
// import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { auth } from "./firebase-config"
import { signOut } from "firebase/auth"

import AddBathroom from "./pages/add_bathroom/AddBathroom";
import Bathroom from "./pages/bathroom/Bathroom";
import BathroomPage from "./pages/bathroom/BathroomPage";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Review from "./pages/review/Review";
import Invalid from "./pages/invalid/Invalid";
import Navbar from "./components/Navbar";
import User from "./pages/user/User"

function App() {
  
  const [isAuth, setIsAuth] = useState(false);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <React.Fragment>
      <Router>
        <Navbar isAuth={isAuth} logOut={signUserOut}/>
        <Routes>
          <Route path="/" element={<Home isAuth={isAuth}/>} />
          <Route path="/add-bathroom" element={<AddBathroom isAuth={isAuth}/>} />
          <Route path="/bathroom" element={<Bathroom />} />
          <Route path="/bathroom/:bathroomId" element={<BathroomPage />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth}/>} />
          <Route path="/review" element={<Review isAuth={isAuth}/>} />
          <Route path="/user" element={<User isAuth={isAuth}/>} />
          <Route path="/invalid" element={<Invalid />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;