import React, { Component } from 'react'
import './SearchBar.scss'

export default class SearchBar extends Component {
  render() {
    return (
      <div className='search-bar'>
        <input
        type="text"
        placeholder="Search"
        />
      </div>
    )
  }
}
