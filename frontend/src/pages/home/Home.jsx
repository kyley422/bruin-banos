import React, { Component } from "react";
import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import "./Home.scss";
import ReactSlider from "react-slider";

import {
  addDoc,
  getDocs,
  collection,
  getDoc,
  setDoc,
  doc,
  arrayUnion,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../../firebase-config";

import BathroomListings from "../../components/BathroomListings";

const Hero = () => {
  return (
    <div className="hero">
      <div className="image-container">
        <img src="https://i.imgur.com/vR0CIB2.png" alt="Bruin Baños Logo" />
      </div>
      <div className="text-container">
        <h1 className="hero-text">Bruin Baños</h1>
        <div className="hero-content">
          Welcome to the ultimate resource for finding the best public bathrooms
          at UCLA! With detailed information on facilities, amenities, and user
          ratings, you can make informed decisions about where to go. So why
          wait? Start exploring and find the perfect bathroom for your needs
          today!
        </div>
      </div>
    </div>
  );
};

const ListingContainer = ({ isAuth }) => {
  const [maleIsChecked, setMaleIsChecked] = useState(true);
  const [femaleIsChecked, setFemaleIsChecked] = useState(true);
  const [neutralIsChecked, setNeutralIsChecked] = useState(true);
  const [sortParam, setSortParam] = useState("Overall");
  const [upperLimit, setUpperLimit] = useState(5);
  const [lowerLimit, setLowerLimit] = useState(1);
  const [searchParams] = useSearchParams();
  var searchText = searchParams.get("search") ? searchParams.get("search") : "";

  function maleHandleOnChange() {
    setMaleIsChecked(!maleIsChecked);
  }
  function femaleHandleOnChange() {
    setFemaleIsChecked(!femaleIsChecked);
  }
  function neutralHandleOnChange() {
    setNeutralIsChecked(!neutralIsChecked);
  }
  function sliderHandleOnChange(values) {
    setUpperLimit(parseInt(values[1]));
    setLowerLimit(parseInt(values[0]));
  }

  return (
    <div className="listing-container">
      <div className="filter-container">
        <div className="filter-component">
          <div className="filter-title">Filter</div>
          <div className="gender-list">
            <div className="checkbox-component">
              <input
                type="checkbox"
                checked={maleIsChecked}
                onChange={maleHandleOnChange}
              />
              <label for="vehicle1">Male</label>
            </div>
            <div className="checkbox-component">
              <input
                type="checkbox"
                checked={femaleIsChecked}
                onChange={femaleHandleOnChange}
              />
              <label for="vehicle2">Female</label>
            </div>
            <div className="checkbox-component">
              <input
                type="checkbox"
                checked={neutralIsChecked}
                onChange={neutralHandleOnChange}
              />
              <label for="vehicle3">All Gender</label>
            </div>
          </div>
        </div>
        <div className="filter-component">
          <div className="filter-title">Sort Rating</div>
          <div className="dropdown-container">
            <select
              className="dropdown"
              onChange={(e) => setSortParam(e.target.value)}
            >
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
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              defaultValue={[1, 5]}
              max={5}
              min={1}
              ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
              renderThumb={(props, state) => (
                <div {...props}>{state.valueNow}</div>
              )}
              onChange={sliderHandleOnChange}
              pearling
              minDistance={1}
            />
            <div className="selectValue">
              <div className="selectValueNumber">1</div>
              <div className="selectValueNumber">2</div>
              <div className="selectValueNumber">3</div>
              <div className="selectValueNumber">4</div>
              <div className="selectValueNumber">5</div>
            </div>
          </div>
        </div>
        <div className="filter-component">
          <div className="request-bathroom-title">
            Don't see your bathroom here?
          </div>
          <Link className="request-bathroom-link" to="/add-bathroom">
            Request to add a bathroom
          </Link>
        </div>
      </div>
      <BathroomListings
        male={maleIsChecked}
        female={femaleIsChecked}
        neutral={neutralIsChecked}
        upperLimit={upperLimit}
        lowerLimit={lowerLimit}
        sortParam={sortParam}
        searchText={searchText}
      />
    </div>
  );
};

const alreadyFixed = ["boelter2825"];

async function fixDatabase() {
  const bathroomCollectionRef = collection(db, "bathroom");
  const reviewsCollectionRef = collection(db, "reviews");
  const q = query(bathroomCollectionRef);
  const data = await getDocs(q);

  for (const bathroomDoc of data.docs) {
    if (alreadyFixed.includes(bathroomDoc.id)) continue;
    alreadyFixed.push(bathroomDoc.id);

    const q = query(
      reviewsCollectionRef,
      where("bathroom", "==", bathroomDoc.data().name)
    );
    const reviews = await getDocs(q);
    // console.log(
    //   `For bathroom: ${JSON.stringify(doc)} ---> reviews: ${JSON.stringify(
    //     reviews
    //   )}`
    // );
    let total_overall = 0;
    let total_cleanliness = 0;
    let total_comfort = 0;
    let total_convenience = 0;
    let total_amenities = 0;

    for (const reviewDoc of reviews.docs) {
      const r = reviewDoc.data();
      // console.log("cleanliness: " + r.cleanliness);
      // console.log("comfort: " + r.comfort);
      // console.log("convenience: " + r.convenience);
      // console.log("amenities: " + r.amenities);

      total_overall += parseFloat(r.overall);
      total_cleanliness += parseInt(r.cleanliness);
      total_comfort += parseInt(r.comfort);
      total_convenience += parseInt(r.convenience);
      total_amenities += parseInt(r.amenities);

      const expected =
        (parseInt(r.cleanliness) +
          parseInt(r.comfort) +
          parseInt(r.convenience) +
          parseInt(r.amenities)) /
        4;
      const diff = Math.abs(expected - r.overall);
      if (diff > 0.00000001) {
        console.log(
          `Problem with review ${reviewDoc.id}: overall=${r.overall}, expected=${expected}`
        );
      }
      //console.log(`expected: ${expected}, diff: ${diff}, overall${r.overall}`);
    }
    const bathroom = bathroomDoc.data();
    const actual_total_overall = parseFloat(bathroom.total_score_overall);
    const actual_total_cleanliness = parseInt(bathroom.total_score_cleanliness);
    const actual_total_comfort = parseInt(bathroom.total_score_comfort);
    const actual_total_convenience = parseInt(bathroom.total_score_convenience);
    const actual_total_amenities = parseInt(bathroom.total_score_amenities);

    if (Math.abs(actual_total_overall - total_overall) > 0.000001) {
      console.log(
        `Bathroom ${bathroom.name} total_score_overall=${actual_total_overall}, should be ${total_overall}`
      );
    }
    if (actual_total_cleanliness != total_cleanliness) {
      console.log(
        `Bathroom ${bathroom.name} total_score_cleanliness=${actual_total_cleanliness}, should be ${total_cleanliness}`
      );
    }
    if (actual_total_comfort != total_comfort) {
      console.log(
        `Bathroom ${bathroom.name} total_score_comfort=${actual_total_comfort}, should be ${total_comfort}`
      );
    }
    if (actual_total_convenience != total_convenience) {
      console.log(
        `Bathroom ${bathroom.name} total_score_convenience=${actual_total_convenience}, should be ${total_convenience}`
      );
    }
    if (actual_total_amenities != total_amenities) {
      console.log(
        `Bathroom ${bathroom.name} total_score_amenities=${actual_total_amenities}, should be ${total_amenities}`
      );
    }

    console.log(`CHANGING id=${bathroomDoc.id} name=${bathroom.name}`);
    const n = reviews.docs.length;

    setDoc(
      doc(db, "bathroom", bathroomDoc.id),
      {
        score_amenities: total_amenities / n,
        score_cleanliness: total_cleanliness / n,
        score_comfort: total_comfort / n,
        score_convenience: total_convenience / n,
        score_overall: total_overall / n,
        total_ratings: n,
        total_score_amenities: total_amenities,
        total_score_cleanliness: total_cleanliness,
        total_score_comfort: total_comfort,
        total_score_convenience: total_convenience,
        total_score_overall: total_overall,
      },
      { merge: true }
    );
    return;

    console.log("done");
  }
}

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <Hero />
        {/* <button onClick={fixDatabase}>Fix Database</button> */}
        <ListingContainer isAuth={this.props.isAuth} />
      </div>
    );
  }
}
