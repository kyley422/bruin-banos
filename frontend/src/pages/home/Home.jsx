import React, { Component } from "react";
import "./Home.scss";

import BathroomListings from "../../components/BathroomListings";

const Hero = () => {
  return (
    <div className="hero">
      <div className="image-container">
        <img src="https://i.imgur.com/vR0CIB2.png" alt="Bruin Baños Logo" />
      </div>
      <div className="text-container">
        <h1 className="hero-text">Bruin Baños</h1>
        <p className="hero-content">
          Welcome to the ultimate resource for finding the best public bathrooms
          at UCLA! With detailed information on facilities, amenities, and user
          ratings, you can make informed decisions about where to go. So why
          wait? Start exploring and find the perfect bathroom for your needs
          today!
        </p>
      </div>
    </div>
  );
};

const ListingContainer = () => {
  return (
    <div className="listing-container">
      <div className="filter-container">
        <div className="filter-component">
          <div className="filter-title">Filter</div>
          <div className="gender-list">
            <div className="checkbox-component">
              <input type="checkbox" />
              <label for="vehicle1">Male</label>
            </div>
            <div className="checkbox-component">
              <input type="checkbox" />
              <label for="vehicle2">Female</label>
            </div>
            <div className="checkbox-component">
              <input type="checkbox" />
              <label for="vehicle3">All Gender</label>
            </div>
          </div>
        </div>
        <div className="filter-component">
          <div className="filter-title">Sort Rating</div>
          <div className="dropdown-container">
            <select className="dropdown">
              <option value="Overall">Overall</option>
              <option value="Cleanliness">Cleanliness</option>
              <option value="Comfort">Comfort</option>
              <option value="Convenience">Convenience</option>
              <option value="Amenities">Amenities</option>
            </select>
          </div>
        </div>
        <div className="filter-component">
          <div className="filter-title">Range</div>
          <div className="slider">
            <label>
              <input type="range" min="0" max="5" defaultValue="3" id="slider"/>
            </label>
          </div>
        </div>
      </div>
      <BathroomListings />
    </div>
  );
};

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <Hero />
        <ListingContainer />
      </div>
    );
  }
}
