import React, { Component } from 'react'
import './Home.scss'

import BathroomListings from '../../components/BathroomListings'

const Hero = () => {
  return (
    <div className='hero'>
      <div className='image-container'>
        <img src='https://i.imgur.com/vR0CIB2.png' alt='Bruin Baños Logo' />
      </div>
      <div className='text-container'>
        <h1 className='hero-text'>Bruin Baños</h1>
        <p className='hero-content'>Welcome to the ultimate resource for finding the best public bathrooms at UCLA! With detailed information on facilities, amenities, and user ratings, you can make informed decisions about where to go. So why wait? Start exploring and find the perfect bathroom for your needs today!</p>
      </div>
    </div>
  )
}

const ListingContainer = () => {
  return (
    <div className='listing-container'>
      <div className='filter-container'>
        Filters
      </div>
      <div className='bathroom-listings'>
        <BathroomListings> </BathroomListings>
      </div>
    </div>
  )
}

export default class Home extends Component {
  render() {
    return (
      <div className='home'>
        <Hero />
        <ListingContainer />
      </div>
    )
  }
}
