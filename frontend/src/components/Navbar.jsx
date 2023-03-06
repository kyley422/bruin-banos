import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'
// import { signInWithGoogle } from '../pages/login/Login'

import SearchBar from './SearchBar'
import Button from './Button'

export default class Navbar extends Component {
  render() {
    return (
        <nav>
            <Link to="/" class="logo" >
              <img src='https://i.imgur.com/vR0CIB2.png' alt='Bruin Baños Logo'/>
            </Link>

            <Link to="/" class="home"> 
              Bruin Baños 
            </Link>

            <SearchBar/>

            <Link to={this.props.isAuth ? "/review" : "/login"}> <Button /> </Link>

            {!this.props.isAuth ? <Link to="/login"> 
              <img src='https://i.imgur.com/YcXGNzZ.png' alt='blankUser' class="profile"/>
            </Link> : <Link to="/user"> 
              <img src={localStorage.getItem("profilePic")} alt='profilePic' class="user"/>
            </Link>}
        </nav>
    )
  }
}
