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
import { useNavigate } from "react-router-dom";
import "./AddBathroom.scss";

function AddBathroom({ isAuth }) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [imageURL, setImageURL] = useState("");

  let navigate = useNavigate();

  let newBathroomID = name.replace(/\s+/g, "");
  newBathroomID = newBathroomID.toLowerCase();
  const createBathroom = async () => {
    await setDoc(doc(db, "bathroom", newBathroomID), {
      gender: gender,
      image: imageURL,
      name: name,
      reviews: [],
      score_amenities: 0,
      score_cleanliness: 0,
      score_comfort: 0,
      score_convenience: 0,
      score_overall: 0,
      total_ratings: 0,
      total_score_amenities: 0,
      total_score_cleanliness: 0,
      total_score_comfort: 0,
      total_score_convenience: 0,
      total_score_overall: 0,
    });
    navigate("/");
  };

  useEffect(() => {
    if (!localStorage.getItem("isAuth")) {
      navigate("/login");
    }
  }, []);

  const email = localStorage.getItem("email");
  if (
    email == "kyle422@g.ucla.edu" ||
    email == "nnguyendinh@g.ucla.edu" ||
    email == "tinatjma@g.ucla.edu" ||
    email == "blakemux@g.ucla.edu" ||
    email == "hli25@g.ucla.edu"
  ) {
    return (
      <div className="form-container">
        <div>
          <h1>Add a bathroom</h1>
        </div>
        <div>
          <label> Bathroom Name:</label>
          <input
            placeholder="[Building Name] [Number]"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div>
          <label> Gender:</label>
          <input
            placeholder="male/female/neutral"
            onChange={(event) => {
              setGender(event.target.value);
            }}
          />
        </div>
        <div>
          <label> Image URL:</label>
          <input
            placeholder=""
            onChange={(event) => {
              setImageURL(event.target.value);
            }}
          />
        </div>
        <button onClick={createBathroom}>Create Bathroom</button>
      </div>
    );
  } else {
    return (
      <div className="user-not-authorized">
        You are not authorized to view this page.
      </div>
    );
  }
}

export default AddBathroom;
