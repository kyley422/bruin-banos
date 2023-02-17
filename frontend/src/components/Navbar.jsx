import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'

import SearchBar from './SearchBar'
import Button from './Button'

export default class Navbar extends Component {
  render() {
    return (
        <nav>
            <Link to="/"> Home </Link>
            <Link to="/login"> Login </Link>
            <SearchBar />
            <Link to="/review"> <Button /> </Link>
           
        </nav>
    )
  }
}
