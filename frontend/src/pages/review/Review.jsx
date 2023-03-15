import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

import StarRating from "./StarRating";

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

  // function BasicRating() {
  //   const [value, setValue] = (React.useState < number) | (null > 2);
  // }

  return (
    <div>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap"
          type="text/css"
          rel="stylesheet"
        ></link>
        <link
          href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css"
          rel="stylesheet"
        ></link>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script src="starrr.min.js"></script>
      </head>

      <StarRating></StarRating>

      <h1>Write a Review</h1>

      <box className="background-box-review">
        <div class="review">
          <div class="text cleanliness">
            <h3>Rate the cleanliness</h3>
            How clean was your experience? Consider the sinks, floor, walls,
            stalls, and toilets.
          </div>
          <div class="starRating">
            <StarRating></StarRating>
          </div>
        </div>

        <div class="review">
          <div class="text comfort">
            <h3>Rate the comfort</h3>
            How comfortable did the bathroom seem? Consider lighting, seating,
            or the layout of the bathroom.
          </div>
          <div class="starRating">
            <StarRating></StarRating>
          </div>
        </div>

        <div class="review">
          <div class="text convenience">
            <h3>Rate the convenience</h3>
            How easy was the bathroom to find? Factor in location the bathroom,
            or other convenience factors such as ease of use of the facilities.
          </div>
          <div class="starRating">
            <StarRating></StarRating>
          </div>
        </div>

        <div class="review">
          <div class="text amenities">
            <h3>Rate the amenities</h3>
            What was the supply of toilet paper and other amenities? Consider
            the supplies of soap, seat coverings, feminine products (if
            applicable).
          </div>
          <div class="starRating">
            <StarRating></StarRating>
          </div>
        </div>
      </box>

      {/*<div>
        <label> Bathroom:</label>
        <input
          placeholder="Bathroom..."
          onChange={(event) => {
            setBathroom(event.target.value);
          }}
        />
      </div>
       <div>
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
