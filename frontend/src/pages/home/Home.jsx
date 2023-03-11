import React, { Component } from "react";
import { useState } from "react";
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

  const [maleIsChecked, setMaleIsChecked] = useState(true);
  const [femaleIsChecked, setFemaleIsChecked] = useState(true);
  const [neutralIsChecked, setNeutralIsChecked] = useState(true);
  const [sortParam, setSortParam] = useState("Overall");
  
  const maleHandleOnChange = () => {
    setMaleIsChecked(!maleIsChecked)
  };
  const femaleHandleOnChange = () => {
    setFemaleIsChecked(!femaleIsChecked)
  };
  const neutralHandleOnChange = () => {
    setNeutralIsChecked(!neutralIsChecked)
  };

  return (
    <div className="listing-container">
      <div className="filter-container">
        <div className="filter-component">
          <div className="filter-title">Filter</div>
          <div className="gender-list">
            <div className="checkbox-component">
              <input type="checkbox" checked={maleIsChecked} onChange={maleHandleOnChange}/>
              <label for="vehicle1">Male</label>
            </div>
            <div className="checkbox-component">
              <input type="checkbox" checked={femaleIsChecked} onChange={femaleHandleOnChange}/>
              <label for="vehicle2">Female</label>
            </div>
            <div className="checkbox-component">
              <input type="checkbox" checked={neutralIsChecked} onChange={neutralHandleOnChange}/>
              <label for="vehicle3">All Gender</label>
            </div>
          </div>
        </div>
        <div className="filter-component">
          <div className="filter-title">Sort Rating</div>
          <div className="dropdown-container">
            <select className="dropdown" onChange={(e) => setSortParam(e.target.value)}>
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
              <input type="range" min="1" max="5" defaultValue="3" id="slider"/>
            </label>
              <div className="selectValue">
                <div className="selectValueNumber">1</div>
                <div className="selectValueNumber">2</div>
                <div className="selectValueNumber">3</div>
                <div className="selectValueNumber">4</div>
                <div className="selectValueNumber">5</div>
              </div>
          </div>
        </div>
      </div>
      <BathroomListings male={maleIsChecked} female={femaleIsChecked} 
        neutral={neutralIsChecked} sortParam={sortParam}/>
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
