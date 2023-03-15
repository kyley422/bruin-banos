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
      <div className="admin-view">
        <div className="form-container">
          <div className="title">
            <h1>Add a </h1>
            <h1 className="h1-emphasis">&nbsp;new bathroom</h1>
          </div>
          <div className="input-container">
            <div className="input-container-building">
              <div className="input-info">
                <label>Building Name and Number (eg. Boelter 2285)</label>
              </div>
              <div className="input-container-building-input">
                <input
                  placeholder="Building Name and Number"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="input-container-image">
              <div className="input-info">
                <label>Image</label>
              </div>
              <div className="input-container-image-input">
                <input
                  placeholder="Valid image URL"
                  onChange={(event) => {
                    setImageURL(event.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <div className="input-container-gender">
                <div className="input-info">
                  <label>Gender</label>
                </div>
                <div className="input-container-gender-input">
                  <input
                    placeholder="Male/Female/Neutral"
                    onChange={(event) => {
                      setGender(event.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="button-container">
            <button onClick={createBathroom}>Create</button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="user-not-authorized">
        <div className="title">
          <h1>Request to add a </h1>
          <h1 className="h1-emphasis">&nbsp;new bathroom</h1>
        </div>
        <div className="google-form-container">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdURYPOYdyq2orsZjDEIgSEmpTOtXKkjpWKG7rQi7yeIpxKpw/viewform?embedded=true"
            width="640"
            height="704"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
          >
            Loading…
          </iframe>
        </div>
      </div>
    );
  }
}

export default AddBathroom;
