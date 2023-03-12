import React, { Component } from 'react'
import './SearchBar.scss'

function SearchBar(props) {
  function handleChange(text)  {
    props.onInputChange(text)
  }
  return (
    <div className='search-bar'>
      <input
      type="text"
      placeholder="Search"
      onChange={(event) => {
        handleChange(event.target.value)
        }}
      />
    </div>
  )
}

export default SearchBar;
