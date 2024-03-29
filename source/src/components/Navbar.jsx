import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
// import { signInWithGoogle } from '../pages/login/Login'

import SearchBar from "./SearchBar";
import Button from "./Button";

export default class Navbar extends Component {
  render() {
    // console.log("this is in navbar:");
    // console.log(this.props);
    return (
      <nav>
        <Link to="/" class="logo">
          <img src="https://i.imgur.com/vR0CIB2.png" alt="Bruin Baños Logo" />
        </Link>

        <Link to="/" class="home">
          Bruin Baños
        </Link>

        <SearchBar />

        {/* <Link to={this.props.isAuth ? "/review" : "/login"}> <Button /> </Link> */}

        {!this.props.isAuth ? (
          <Link to="/login">
            <img
              src="https://i.imgur.com/YcXGNzZ.png"
              alt="blankUser"
              class="profile"
            />
          </Link>
        ) : (
          <div className="user_logged_in_container">
            <div className="logout_button_container">
              <button onClick={this.props.logOut} className="logout_button">
                {" "}
                Log Out{" "}
              </button>
            </div>
            <div className="user_icon">
              <Link to="/user">
                <img
                  src={localStorage.getItem("profilePic")}
                  alt="profilePic"
                  class="user"
                />
              </Link>
            </div>
          </div>
        )}
      </nav>
    );
  }
}
