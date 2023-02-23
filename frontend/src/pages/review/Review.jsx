import React, { Component } from 'react'


function Review() {
  return (
    <div>
      <div>
        <h1>Create A Post</h1>
      </div>
      <div className='inputGp'>
        <label> Title:</label>   
        <input placeholder='Title...' />
      </div>
      <div className='inputGp'>
        <label> Post:</label>
        <textarea placeholder='Review...' />
      </div>
      <button>
        Submit Review
      </button>

    </div>
  )
}

export default Review;