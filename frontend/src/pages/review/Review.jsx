import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

import "./Review.scss";

function Review({ isAuth }) {
  const [bathroom, setBathroom] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [overall, setOverall] = useState("");
  const [cleanliness, setCleanliness] = useState("");
  const [comfort, setComfort] = useState("");
  const [convenience, setConvenience] = useState("");
  const [amenities, setAmenities] = useState("");

  // "reviews" is name of collection in Firebase
  const reviewsCollectionRef = collection(db, "reviews");
  let navigate = useNavigate();

  // auth.currentUser.displayName and uid are google account information we can use
  const createReview = async () => {
    await addDoc(reviewsCollectionRef, {
      bathroom: bathroom,
      overall: overall,
      cleanliness: cleanliness,
      comfort: comfort,
      convenience: convenience,
      amenities: amenities,
      reviewText: reviewText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap"
          type="text/css"
          rel="stylesheet"
        ></link>
        ;
      </head>

      <h1>Write a Review</h1>

      <box className="background-box-review">
        <h2>Add a review to UCLA</h2>
        <p>Enter the details about the bathroom you are reviewing.</p>

        <div className="bathroom-attributes-1">
          <div className="building">
            {" "}
            Building Name
            <select className="buildingDropdown">
              <option value="Dodd Hall">Dodd Hall</option>
              <option
                value="Anderson Hall"
                onChange={(event) => {
                  setBathroom(event.target.value);
                }}
              >
                {" "}
                Anderson Hall{" "}
              </option>
            </select>
          </div>
          <div className="roomNum">
            Room Number
            <select className="roomNumDropdown">
              <option value="123">123</option>
              <option
                value="124"
                onChange={(event) => {
                  setBathroom(event.target.value);
                }}
              >
                124
              </option>
            </select>
          </div>
          <div className="gender">
            Gender
            <select className="genderDropdown">
              <option value="Women's">Women's</option>
              <option value="Men's">Men's</option>
              <option value="All-Gender">Men's</option>
            </select>
          </div>
        </div>
      </box>

      {/* <div>
        <label> Bathroom:</label>
        <input
          placeholder="Bathroom..."
          onChange={(event) => {
            setBathroom(event.target.value);
          }}
        />
      </div> */}
      {/* <div>
        <label> Overall:</label>
        <input
          placeholder="Overall Rating 1-5"
          onChange={(event) => {
            setOverall(event.target.value);
          }}
        />
      </div>
      <div>
        <label> Cleanliness:</label>
        <input
          placeholder="Cleanliness Rating 1-5"
          onChange={(event) => {
            setCleanliness(event.target.value);
          }}
        />
      </div>
      <div>
        <label> Comfort:</label>
        <input
          placeholder="Comfort Rating 1-5"
          onChange={(event) => {
            setComfort(event.target.value);
          }}
        />
      </div>
      <div>
        <label> Convenience:</label>
        <input
          placeholder="Convenience Rating 1-5"
          onChange={(event) => {
            setConvenience(event.target.value);
          }}
        />
      </div>
      <div>
        <label> Amenities:</label>
        <input
          placeholder="Amenities Rating 1-5"
          onChange={(event) => {
            setAmenities(event.target.value);
          }}
        />
      </div> */}
      <div>
        <textarea
          className="comment"
          placeholder="Review..."
          onChange={(event) => {
            setReviewText(event.target.value);
          }}
        />
      </div>
      <button className="next" onClick={createReview}>
        Next
      </button>
    </div>
  );
}

export default Review;
