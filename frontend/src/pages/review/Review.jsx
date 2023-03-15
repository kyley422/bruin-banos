import React, { useEffect, useState } from "react";
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
import { useNavigate, useSearchParams } from "react-router-dom";

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

  const [searchParams] = useSearchParams();
  var bathroomID = searchParams.get("bathroom")
    ? searchParams.get("bathroom")
    : "";
  const [bathroomName, setBathroomName] = useState("");

  // "reviews" is name of collection in Firebase
  const reviewsCollectionRef = collection(db, "reviews");
  const bathroomCollectionRef = collection(db, "bathroom");
  let navigate = useNavigate();

  useEffect(() => {
    const getBathroom = async () => {
      await getDoc(doc(db, "bathroom", bathroomID)).then((snap) => {
        setBathroomName(snap.data().name);
      });
    };
    getBathroom();
  }, []);

  // auth.currentUser.displayName and uid are google account information we can use
  const createReview = async () => {
    let newReview = await addDoc(reviewsCollectionRef, {
      bathroom: bathroomName,
      overall: overall,
      cleanliness: cleanliness,
      comfort: comfort,
      convenience: convenience,
      amenities: amenities,
      reviewText: reviewText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    const q = query(bathroomCollectionRef, where("name", "==", bathroomName));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log("Bathroom NOT Found");
    } else {
      // Add review ID to corresponding bathroom
      const targetBathroomRef = doc(db, "bathroom", snapshot.docs[0].id);
      setDoc(
        targetBathroomRef,
        { reviews: arrayUnion(newReview.id) },
        { merge: true }
      );
      // Calculate new bathroom scores
      const targetBathroomDoc = await getDoc(targetBathroomRef).then((snap) => {
        const current_overall = snap.data().total_score_overall;
        const current_cleanliness = snap.data().total_score_cleanliness;
        const current_comfort = snap.data().total_score_comfort;
        const current_convenience = snap.data().total_score_convenience;
        const current_amenities = snap.data().total_score_amenities;
        const current_total_ratings = snap.data().total_ratings;

        const new_overall = current_overall + parseFloat(overall);
        const new_cleanliness = current_cleanliness + parseFloat(cleanliness);
        const new_comfort = current_comfort + parseFloat(comfort);
        const new_convenience = current_convenience + parseFloat(convenience);
        const new_amenities = current_amenities + parseFloat(amenities);
        const new_total_ratings = current_total_ratings + 1;

        setDoc(
          targetBathroomRef,
          {
            // Update the cumulative data
            total_score_overall: new_overall,
            total_score_cleanliness: new_cleanliness,
            total_score_comfort: new_comfort,
            total_score_convenience: new_convenience,
            total_score_amenities: new_amenities,

            // Update the average score
            score_overall: new_overall / new_total_ratings,
            score_cleanliness: new_cleanliness / new_total_ratings,
            score_comfort: new_comfort / new_total_ratings,
            score_convenience: new_convenience / new_total_ratings,
            score_amenities: new_amenities / new_total_ratings,
            total_ratings: new_total_ratings,
          },
          { merge: true }
        );
      });
    }
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <div>
        <h1>Write a review for {bathroomName}</h1>
        <head>
          <link
            href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css"
            rel="stylesheet"
          ></link>
          <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
          <script src="starrr.min.js"></script>
        </head>

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
              How easy was the bathroom to find? Factor in location the
              bathroom, or other convenience factors such as ease of use of the
              facilities.
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
          Submit
        </button>
      </div>
    </div>
  );
}

export default Review;
