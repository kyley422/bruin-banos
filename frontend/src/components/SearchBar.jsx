import React, { Component } from 'react'
import './SearchBar.scss'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

function SearchBar(props) {

  let navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  function handleChange(event)  {
    setSearchQuery(event.target.value)
  }
  function handleSearch(event) {
    if (event.keyCode === 13) {
      console.log("Press Enter Here")

      navigate({
        pathname: '/',
        search: ('?search=' + searchQuery) 
      })
    }
  }

  return (
    <div className='search-bar'>
      <input
      type="text"
      placeholder="Search"
      onChange={handleChange}
      onKeyDown={handleSearch}
      />
    </div>
  )
}

export default SearchBar;
