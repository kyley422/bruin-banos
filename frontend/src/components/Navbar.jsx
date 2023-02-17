import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

import SearchBar from './SearchBar'

export default class Navbar extends Component {
  render() {
    return (
        <nav>
            <Link to="/"> Home </Link>
            <Link to="/review"> Review </Link>
            <Link to="/login"> Login </Link>
            <SearchBar />
        </nav>
    )
  }
}
