import "./styles.css";
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import AddBathroom from "./pages/add_bathroom/AddBathroom";
import Bathroom from "./pages/bathroom/Bathroom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Review from "./pages/review/Review";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/review"> Review </Link>
        <Link to="/login"> Login </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-bathroom" element={<AddBathroom />} />
        <Route path="/bathroom" element={<Bathroom />} />
        <Route path="/login" element={<Login />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </Router>
  );
}

export default App;